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
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { campaignData } = await req.json();
    console.log('Generating recommendations for:', campaignData);

    const prompt = `Jesteś ekspertem od kampanii Facebook Ads dla salonów beauty. Na podstawie poniższych danych kampanii wygeneruj dokładnie 5 krótkich, konkretnych rekomendacji.

DANE KAMPANII:
- Salon: ${campaignData.clientName || 'Salon beauty'}
- Miasto: ${campaignData.city || 'Nieznane'}
- Okres: ${campaignData.period || 'Nieznany'}
- Budżet: ${campaignData.budget || '0'} PLN
- Wyświetlenia: ${campaignData.impressions || '0'}
- Zasięg: ${campaignData.reach || '0'}
- Kliknięcia: ${campaignData.clicks || '0'}
- CTR: ${campaignData.ctr || '0'}%
- Konwersje: ${campaignData.conversions || '0'}
- Koszt/konwersja: ${campaignData.costPerConversion || '0'} PLN
- Rezerwacje: ${campaignData.bookings || '0'}

ZASADY:
1. Każda rekomendacja MUSI zaczynać się od czasownika w trybie rozkazującym: "Zwiększ", "Dodaj", "Przetestuj", "Uruchom", "Zmień", "Ogranicz", "Stwórz", "Włącz"
2. Każda rekomendacja musi być maksymalnie 80 znaków
3. Pisz prostym językiem, konkretnie i bez ogólników
4. Rekomendacje muszą odnosić się do danych - jeśli CTR jest niski, sugeruj poprawę kreacji, jeśli koszt/konwersja wysoki - sugeruj optymalizację

Odpowiedz TYLKO listą 5 rekomendacji, każda w nowej linii, bez numeracji i punktorów.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Limit zapytań przekroczony. Spróbuj ponownie za chwilę.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Brak środków na koncie AI. Doładuj kredyty.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const recommendations = data.choices?.[0]?.message?.content || '';
    
    console.log('Generated recommendations:', recommendations);

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
