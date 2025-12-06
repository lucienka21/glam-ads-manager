import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendEmailRequest {
  leadId: string;
  to: string;
  subject: string;
  body: string;
  fromEmail: "kontakt" | "biuro";
  followUpType?: "cold_email" | "email_follow_up_1" | "email_follow_up_2";
}

async function getZohoAccessToken(): Promise<string> {
  const clientId = Deno.env.get("ZOHO_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOHO_CLIENT_SECRET");
  const refreshToken = Deno.env.get("ZOHO_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho credentials not configured");
  }

  const response = await fetch("https://accounts.zoho.eu/oauth/v2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Zoho token error:", errorText);
    throw new Error("Failed to get Zoho access token");
  }

  const data = await response.json();
  return data.access_token;
}

async function sendEmailViaZoho(
  accessToken: string,
  fromEmail: string,
  to: string,
  subject: string,
  body: string
): Promise<void> {
  const accountId = fromEmail === "kontakt@aurine.pl" ? "kontakt" : "biuro";
  
  // Get account ID first
  const accountsResponse = await fetch("https://mail.zoho.eu/api/accounts", {
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  });

  if (!accountsResponse.ok) {
    throw new Error("Failed to get Zoho accounts");
  }

  const accountsData = await accountsResponse.json();
  console.log("Zoho accounts:", JSON.stringify(accountsData));
  
  const account = accountsData.data?.find((acc: any) => 
    acc.primaryEmailAddress === fromEmail || acc.emailAddress?.includes(fromEmail)
  );

  if (!account) {
    console.error("Available accounts:", accountsData.data?.map((a: any) => a.primaryEmailAddress));
    throw new Error(`Account for ${fromEmail} not found`);
  }

  // Send email
  const sendResponse = await fetch(`https://mail.zoho.eu/api/accounts/${account.accountId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromAddress: fromEmail,
      toAddress: to,
      subject: subject,
      content: body,
      mailFormat: "html",
    }),
  });

  if (!sendResponse.ok) {
    const errorText = await sendResponse.text();
    console.error("Zoho send error:", errorText);
    throw new Error("Failed to send email via Zoho");
  }

  console.log(`Email sent successfully from ${fromEmail} to ${to}`);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { leadId, to, subject, body, fromEmail, followUpType }: SendEmailRequest = await req.json();

    if (!leadId || !to || !subject || !body || !fromEmail) {
      throw new Error("Missing required fields");
    }

    const senderEmail = fromEmail === "kontakt" ? "kontakt@aurine.pl" : "biuro@aurine.pl";

    // Get Zoho access token and send email
    const accessToken = await getZohoAccessToken();
    await sendEmailViaZoho(accessToken, senderEmail, to, subject, body);

    // Update lead in database
    const updateData: Record<string, any> = {
      email_from: senderEmail,
      last_contact_date: new Date().toISOString().split('T')[0],
    };

    if (followUpType === "cold_email") {
      updateData.cold_email_sent = true;
      updateData.cold_email_date = new Date().toISOString().split('T')[0];
    } else if (followUpType === "email_follow_up_1") {
      updateData.email_follow_up_1_sent = true;
      updateData.email_follow_up_1_date = new Date().toISOString().split('T')[0];
    } else if (followUpType === "email_follow_up_2") {
      updateData.email_follow_up_2_sent = true;
      updateData.email_follow_up_2_date = new Date().toISOString().split('T')[0];
    }

    const { error: updateError } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", leadId);

    if (updateError) {
      console.error("Failed to update lead:", updateError);
    }

    // Create interaction record
    await supabase.from("lead_interactions").insert({
      lead_id: leadId,
      type: followUpType || "email",
      title: `Email wysłany: ${subject}`,
      content: `Email wysłany z ${senderEmail} do ${to}`,
      created_by: user.id,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-zoho-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
