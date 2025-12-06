import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function getZohoAccessToken(): Promise<string> {
  const clientId = Deno.env.get("ZOHO_CLIENT_ID");
  const clientSecret = Deno.env.get("ZOHO_CLIENT_SECRET");
  const refreshToken = Deno.env.get("ZOHO_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho credentials not configured");
  }

  const response = await fetch("https://accounts.zoho.eu/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
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
): Promise<boolean> {
  try {
    const accountsResponse = await fetch("https://mail.zoho.eu/api/accounts", {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    });

    if (!accountsResponse.ok) return false;

    const accountsData = await accountsResponse.json();
    const account = accountsData.data?.find((acc: any) => 
      acc.primaryEmailAddress === fromEmail
    );

    if (!account) return false;

    const sendResponse = await fetch(
      `https://mail.zoho.eu/api/accounts/${account.accountId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromAddress: fromEmail,
          toAddress: to,
          subject,
          content: body,
          mailFormat: "html",
        }),
      }
    );

    return sendResponse.ok;
  } catch (e) {
    console.error("Send email error:", e);
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const today = new Date().toISOString().split("T")[0];

    // Get leads that need follow-up emails today
    const { data: leadsForFollowUp1 } = await supabase
      .from("leads")
      .select("*")
      .eq("cold_email_sent", true)
      .eq("email_follow_up_1_sent", false)
      .not("email", "is", null)
      .not("email_from", "is", null)
      .lte("email_follow_up_1_date", today)
      .not("status", "in", '("converted","lost")');

    const { data: leadsForFollowUp2 } = await supabase
      .from("leads")
      .select("*")
      .eq("email_follow_up_1_sent", true)
      .eq("email_follow_up_2_sent", false)
      .not("email", "is", null)
      .not("email_from", "is", null)
      .lte("email_follow_up_2_date", today)
      .not("status", "in", '("converted","lost")');

    let accessToken: string | null = null;
    const results = { sent: 0, failed: 0, processed: [] as string[] };

    // Process Follow-up 1
    for (const lead of leadsForFollowUp1 || []) {
      try {
        if (!accessToken) accessToken = await getZohoAccessToken();
        
        const subject = `Re: Współpraca z ${lead.salon_name}`;
        const body = `
          <p>Cześć ${lead.owner_name || ''},</p>
          <p>Piszę w nawiązaniu do mojej poprzedniej wiadomości dotyczącej współpracy z salonem ${lead.salon_name}.</p>
          <p>Czy udało się zapoznać z moją propozycją? Chętnie porozmawiam o szczegółach.</p>
          <p>Pozdrawiam,<br/>Zespół Aurine</p>
        `;

        const sent = await sendEmailViaZoho(accessToken, lead.email_from, lead.email, subject, body);
        
        if (sent) {
          await supabase.from("leads").update({
            email_follow_up_1_sent: true,
            email_follow_up_1_date: today,
            last_contact_date: today,
            follow_up_count: (lead.follow_up_count || 0) + 1,
            last_follow_up_date: today,
          }).eq("id", lead.id);

          await supabase.from("lead_interactions").insert({
            lead_id: lead.id,
            type: "email_auto",
            title: "Automatyczny Follow-up #1",
            content: `Email wysłany automatycznie z ${lead.email_from}`,
          });

          results.sent++;
          results.processed.push(lead.salon_name);
        } else {
          results.failed++;
        }
      } catch (e) {
        console.error(`Error processing lead ${lead.id}:`, e);
        results.failed++;
      }
    }

    // Process Follow-up 2
    for (const lead of leadsForFollowUp2 || []) {
      try {
        if (!accessToken) accessToken = await getZohoAccessToken();
        
        const subject = `Ostatnia wiadomość - ${lead.salon_name}`;
        const body = `
          <p>Cześć ${lead.owner_name || ''},</p>
          <p>To moja ostatnia wiadomość w tej sprawie. Jeśli nie jesteś zainteresowana współpracą, całkowicie to rozumiem.</p>
          <p>Jeśli jednak chciałabyś porozmawiać o tym, jak mogę pomóc ${lead.salon_name} pozyskać więcej klientów przez Facebook Ads, daj mi znać.</p>
          <p>Pozdrawiam,<br/>Zespół Aurine</p>
        `;

        const sent = await sendEmailViaZoho(accessToken, lead.email_from, lead.email, subject, body);
        
        if (sent) {
          await supabase.from("leads").update({
            email_follow_up_2_sent: true,
            email_follow_up_2_date: today,
            last_contact_date: today,
            follow_up_count: (lead.follow_up_count || 0) + 1,
            last_follow_up_date: today,
          }).eq("id", lead.id);

          await supabase.from("lead_interactions").insert({
            lead_id: lead.id,
            type: "email_auto",
            title: "Automatyczny Follow-up #2",
            content: `Email wysłany automatycznie z ${lead.email_from}`,
          });

          results.sent++;
          results.processed.push(lead.salon_name);
        } else {
          results.failed++;
        }
      } catch (e) {
        console.error(`Error processing lead ${lead.id}:`, e);
        results.failed++;
      }
    }

    console.log("Auto follow-up results:", results);

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in process-auto-followups:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
