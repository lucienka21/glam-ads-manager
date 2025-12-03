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

    const { beforeImage, afterImage, template, headline, subheadline, accentColor } = await req.json();

    if (!beforeImage && !afterImage) {
      throw new Error('At least one image is required');
    }

    // Build prompt based on template
    let prompt = "";
    const templatePrompts: Record<string, string> = {
      'before-after-horizontal': `Create a professional horizontal before/after comparison graphic for a beauty salon social media post. 
        Split the image into two equal halves side by side. 
        Add a sleek vertical divider line in ${accentColor} color between the halves.
        Add elegant "PRZED" label on the left side and "PO" label on the right side with modern typography.
        Add subtle gradient overlay and professional polish.
        ${headline ? `Add headline text "${headline}" at the top with elegant styling.` : ''}
        ${subheadline ? `Add subheadline "${subheadline}" below the headline.` : ''}
        Make it look like a premium beauty brand advertisement with smooth transitions and modern aesthetics.`,
      
      'before-after-vertical': `Create a professional vertical before/after comparison graphic for Instagram Stories or Reels.
        Stack the images vertically with "before" on top and "after" on bottom.
        Add a horizontal ${accentColor} colored divider between them.
        Add stylish "PRZED" and "PO" labels with modern font.
        ${headline ? `Include headline "${headline}" with elegant styling.` : ''}
        Apply beauty industry aesthetic with soft gradients and professional finish.`,
      
      'before-after-diagonal': `Create an artistic diagonal split before/after comparison.
        Divide the image diagonally from top-right to bottom-left.
        Add a sleek ${accentColor} diagonal line as divider.
        Place "PRZED" in top-left corner and "PO" in bottom-right with stylish typography.
        ${headline ? `Add headline "${headline}" with elegant positioning.` : ''}
        Make it visually striking with beauty salon aesthetics.`,
      
      'carousel-item': `Create a square carousel post graphic for Instagram.
        Design it as a premium beauty treatment showcase.
        Add elegant ${accentColor} accent elements and modern typography.
        ${headline ? `Feature headline "${headline}" prominently.` : ''}
        ${subheadline ? `Include subheadline "${subheadline}".` : ''}
        Make it scroll-stopping with professional beauty brand aesthetics.`,
      
      'story': `Create a vertical Story/Reels format graphic (9:16 aspect ratio).
        Design for maximum impact on mobile with bold visuals.
        Add dynamic ${accentColor} accent elements and engaging typography.
        ${headline ? `Feature headline "${headline}" with attention-grabbing style.` : ''}
        ${subheadline ? `Include subheadline "${subheadline}".` : ''}
        Optimize for beauty industry social media with trendy aesthetics.`,
      
      'promo-square': `Create a promotional square graphic for beauty salon.
        Design with premium aesthetics and ${accentColor} accent colors.
        ${headline ? `Feature promotional headline "${headline}" prominently.` : ''}
        ${subheadline ? `Add supporting text "${subheadline}".` : ''}
        Make it look like a high-end beauty brand advertisement.`,
      
      'reels-cover': `Create an eye-catching Reels cover image.
        Design for maximum visibility in the feed with bold composition.
        Use ${accentColor} accents strategically for visual impact.
        ${headline ? `Feature title "${headline}" with dynamic typography.` : ''}
        Optimize for beauty industry content with modern, trendy aesthetics.`,
      
      'multi-image-carousel': `Create a multi-image carousel showcase graphic.
        Design as a collage-style layout showing multiple beauty treatments or results.
        Use ${accentColor} as the accent color throughout.
        ${headline ? `Add headline "${headline}" with elegant styling.` : ''}
        Make it cohesive and professional for beauty salon marketing.`
    };

    prompt = templatePrompts[template] || templatePrompts['before-after-horizontal'];

    // Prepare messages with images
    const content: any[] = [{ type: "text", text: prompt }];
    
    if (beforeImage) {
      content.push({
        type: "image_url",
        image_url: { url: beforeImage }
      });
    }
    
    if (afterImage) {
      content.push({
        type: "image_url", 
        image_url: { url: afterImage }
      });
    }

    console.log('Processing graphics with template:', template);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [{ role: 'user', content }],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Zbyt wiele żądań. Spróbuj ponownie za chwilę.' }), {
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
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI Response received');

    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textResponse = data.choices?.[0]?.message?.content || '';

    if (!generatedImage) {
      throw new Error('No image generated');
    }

    return new Response(JSON.stringify({ 
      generatedImage,
      message: textResponse
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-graphics:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Błąd przetwarzania grafiki' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
