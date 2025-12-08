import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Allowed templates
const allowedTemplates = [
  'before-after-horizontal',
  'before-after-vertical', 
  'before-after-diagonal',
  'carousel-item',
  'story',
  'promo-square',
  'reels-cover',
  'multi-image-carousel'
] as const;

// Input validation schema
const inputSchema = z.object({
  beforeImage: z.string().max(5000000).optional(), // Allow base64 images
  afterImage: z.string().max(5000000).optional(),
  template: z.enum(allowedTemplates).default('before-after-horizontal'),
  headline: z.string().max(200).optional(),
  subheadline: z.string().max(300).optional(),
  accentColor: z.string().max(50).optional().default('pink'),
  seasonalTheme: z.string().max(500).optional(),
  customInstructions: z.string().max(1000).optional(),
}).refine((data) => data.beforeImage || data.afterImage, {
  message: "At least one image is required",
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const body = await req.json();
    
    // Validate input
    const validationResult = inputSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.errors);
      return new Response(JSON.stringify({ 
        error: 'Nieprawidłowe dane wejściowe',
        details: validationResult.error.errors.map(e => e.message)
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { beforeImage, afterImage, template, headline, subheadline, accentColor, seasonalTheme, customInstructions } = validationResult.data;

    // Build comprehensive prompt based on template
    const basePrompt = `You are an expert graphic designer specializing in beauty salon marketing for Facebook Ads and Instagram.
    
Create a STUNNING, PROFESSIONAL, HIGH-QUALITY graphic for a beauty salon social media campaign.

CRITICAL REQUIREMENTS:
- The design must be BEAUTIFUL, MODERN, and PREMIUM looking
- Use sophisticated color palette with ${accentColor || 'pink'} as the main accent color
- Apply elegant gradients, subtle shadows, and professional typography
- Make it look like it was designed by a top-tier agency
- Ensure the image is suitable for Facebook Ads targeting women aged 25-55
- The aesthetic should be luxurious, clean, and aspirational

`;

    const templatePrompts: Record<string, string> = {
      'before-after-horizontal': `${basePrompt}
TEMPLATE: Horizontal Before/After Comparison (Square 1:1 format)
- Create a side-by-side comparison with the "before" image on the left and "after" on the right
- Add a sleek, elegant vertical divider line in ${accentColor} color in the center
- Add beautiful "PRZED" label on the left side and "PO" label on the right side
- Use modern, elegant typography (think high-end fashion magazine)
- Add subtle gradient overlays to enhance the images
- Include soft glow effects and premium finishing touches
${headline ? `- Add headline text "${headline}" at the top with stunning typography` : ''}
${subheadline ? `- Add subheadline "${subheadline}" below the headline` : ''}`,
      
      'before-after-vertical': `${basePrompt}
TEMPLATE: Vertical Before/After Comparison (9:16 Story/Reels format)
- Stack the images vertically with "before" on top and "after" on bottom
- Add an elegant horizontal ${accentColor} colored divider between them
- Add stylish "PRZED" and "PO" labels with premium typography
- Design for maximum mobile impact with bold, eye-catching elements
${headline ? `- Include headline "${headline}" with stunning styling` : ''}
- Apply beauty industry aesthetic with soft gradients and luxurious finish`,
      
      'before-after-diagonal': `${basePrompt}
TEMPLATE: Artistic Diagonal Before/After Split (Square 1:1 format)
- Create an artistic diagonal split from top-right to bottom-left
- Add a sleek ${accentColor} diagonal line as the divider with subtle glow
- Place elegant "PRZED" in top-left corner and "PO" in bottom-right
- Use sophisticated typography and modern design elements
${headline ? `- Add headline "${headline}" with artistic positioning` : ''}
- Make it visually striking and Instagram-worthy`,
      
      'carousel-item': `${basePrompt}
TEMPLATE: Instagram Carousel Item (Square 1:1 format)
- Design as a premium beauty treatment showcase
- Add elegant ${accentColor} accent elements throughout
- Use modern, clean typography with generous spacing
${headline ? `- Feature headline "${headline}" prominently with impact` : ''}
${subheadline ? `- Include subheadline "${subheadline}" with refined styling` : ''}
- Make it scroll-stopping with professional beauty brand aesthetics`,
      
      'story': `${basePrompt}
TEMPLATE: Story/Reels Format (Vertical 9:16)
- Design for maximum mobile impact with bold, dynamic visuals
- Add energetic ${accentColor} accent elements and engaging typography
- Create visual hierarchy that works on small screens
${headline ? `- Feature headline "${headline}" with attention-grabbing styling` : ''}
${subheadline ? `- Include subheadline "${subheadline}"` : ''}
- Optimize for beauty industry with trendy, modern aesthetics`,
      
      'promo-square': `${basePrompt}
TEMPLATE: Promotional Post (Square 1:1 format)
- Design a compelling promotional graphic
- Use ${accentColor} as the main accent color
- Create visual urgency and desirability
${headline ? `- Feature promotional headline "${headline}" prominently` : ''}
${subheadline ? `- Add supporting text "${subheadline}"` : ''}
- Make it look like a high-end beauty brand advertisement`,
      
      'reels-cover': `${basePrompt}
TEMPLATE: Reels Cover Image
- Design for maximum visibility in the Instagram feed
- Use bold composition that stands out
- Apply ${accentColor} accents strategically for visual impact
${headline ? `- Feature title "${headline}" with dynamic typography` : ''}
- Optimize for beauty industry content`,
      
      'multi-image-carousel': `${basePrompt}
TEMPLATE: Multi-Image Showcase
- Design as a premium collage-style layout
- Use ${accentColor} as the accent color throughout
${headline ? `- Add headline "${headline}" with elegant styling` : ''}
- Make it cohesive and professional for beauty salon marketing`
    };

    let prompt = templatePrompts[template] || templatePrompts['before-after-horizontal'];
    
    // Add seasonal theme if provided
    if (seasonalTheme) {
      prompt += `\n\nSEASONAL THEME:\n${seasonalTheme}`;
    }
    
    // Add custom instructions if provided
    if (customInstructions) {
      prompt += `\n\nADDITIONAL INSTRUCTIONS FROM USER:\n${customInstructions}`;
    }
    
    prompt += `\n\nIMPORTANT: Generate a SINGLE, complete, ready-to-use image. The image must be polished and professional, ready for immediate use in Facebook Ads.`;

    // Prepare messages with images
    const content: { type: string; text?: string; image_url?: { url: string } }[] = [
      { type: "text", text: prompt }
    ];
    
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
