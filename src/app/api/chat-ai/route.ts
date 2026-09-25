import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history, sessionToken } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 }
      );
    }

    const botId = process.env.NEXT_PUBLIC_MAZ_BOT_ID || 'maz_2de5f4b6b25b';
    const apiHost =
      process.env.NEXT_PUBLIC_MAZ_API_HOST || 'https://maz-backend-t1hy.onrender.com';

    const sToken =
      sessionToken ||
      `sess_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;

    // Call Maz AI backend completions API
    const response = await fetch(`${apiHost}/api/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: botId,
        session_token: sToken,
        message: message.trim(),
        history: Array.isArray(history) ? history : [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Maz API returned HTTP status ${response.status}`);
    }

    // Read SSE streaming text and assemble into full response
    const rawText = await response.text();
    let reply = '';
    const lines = rawText.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const dataStr = line.replace('data: ', '').trim();
        if (dataStr === '[DONE]') break;
        try {
          const parsed = JSON.parse(dataStr);
          if (parsed && parsed.content) {
            reply += parsed.content;
          }
        } catch {
          // ignore chunk parse issues
        }
      }
    }

    if (!reply.trim()) {
      reply =
        "Thank you for asking! Billabong Solar is here to help with your solar, battery, and rebate needs. Would you like a fast callback from our specialist with exact details for your property?";
    }

    return NextResponse.json({
      success: true,
      reply: reply.trim(),
      sessionToken: sToken,
    });
  } catch (error) {
    console.error('Maz AI Proxy Error:', error);

    // Fallback response so user is never stranded
    return NextResponse.json({
      success: true,
      reply:
        "Thank you for your question! Billabong Solar installs premium Tier-1 solar systems, Sigenergy SigenStor, and Tesla Powerwall 3 batteries across Victoria with 10-year workmanship warranties. Would you like me to arrange a quick callback for you?",
      sessionToken: `sess_${Date.now()}`,
    });
  }
}
