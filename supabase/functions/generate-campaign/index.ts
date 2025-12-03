import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, industry, city, budget, objective, targetAudience, services } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `Jesteś ekspertem od Facebook Ads dla branży beauty. Generujesz strategie kampanii reklamowych dla salonów kosmetycznych, fryzjerskich i spa.

Twoje odpowiedzi muszą być:
- Konkretne i gotowe do wdrożenia
- Dostosowane do polskiego rynku
- Skupione na generowaniu leadów i rezerwacji
- Napisane prostym, przystępnym językiem

Format odpowiedzi (JSON):
{
  "strategy": {
    "objective": "cel kampanii",
    "targetAudience": "opis grupy docelowej",
    "budget_allocation": "podział budżetu",
    "timeline": "harmonogram"
  },
  "adSets": [
    {
      "name": "nazwa zestawu reklam",
      "audience": "opis odbiorców",
      "placement": "umiejscowienie"
    }
  ],
  "posts": [
    {
      "type": "typ posta (carousel/single/video)",
      "headline": "nagłówek",
      "primaryText": "tekst główny (max 125 znaków)",
      "description": "opis",
      "cta": "przycisk CTA",
      "imageIdea": "pomysł na grafikę"
    }
  ],
  "copyVariants": [
    {
      "style": "styl (emotional/benefit/urgency/social_proof)",
      "text": "tekst reklamy"
    }
  ],
  "recommendations": ["lista rekomendacji"]
}`;

    const userPrompt = `Wygeneruj kompletną strategię kampanii Facebook Ads dla:

Salon: ${clientName}
Branża: ${industry}
Miasto: ${city}
Budżet miesięczny: ${budget} PLN
Cel: ${objective || 'Generowanie leadów i rezerwacji'}
Grupa docelowa: ${targetAudience || 'Kobiety 25-55 lat zainteresowane beauty'}
Usługi: ${services || 'Usługi beauty'}

Wygeneruj:
1. Strategię kampanii z podziałem budżetu
2. 3 zestawy reklam dla różnych grup
3. 5 postów reklamowych z tekstami
4. 4 warianty copy w różnych stylach
5. 5 rekomendacji optymalizacji`;

    console.log('Generating campaign for:', clientName);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Przekroczono limit zapytań. Spróbuj ponownie za chwilę.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Brak kredytów AI. Doładuj konto.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    // Try to parse JSON from the response
    let campaign;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      campaign = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Return raw content if JSON parsing fails
      campaign = { rawContent: content };
    }

    console.log('Campaign generated successfully');

    return new Response(JSON.stringify({ campaign }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error in generate-campaign:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
