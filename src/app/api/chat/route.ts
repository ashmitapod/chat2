import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  sender: 'user' | 'bot';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory }: { message: string; conversationHistory?: ChatMessage[] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build conversation context
    const conversationContext = conversationHistory
      ?.slice(-10) // Limit to last 10 messages for context
      ?.map((msg) => `${msg.sender === 'user' ? 'Student' : 'Assistant'}: ${msg.content}`)
      ?.join('\n') || '';

    const systemPrompt = `You are a helpful AI study assistant for students. Your role is to:
- Help students with academic subjects like math, science, English, history, etc.
- Provide clear, educational explanations suitable for students
- Encourage learning and critical thinking
- Be patient and supportive
- Break down complex topics into understandable parts
- Provide examples when helpful
- Ask clarifying questions when needed

Guidelines:
- Keep responses concise but informative (2-3 paragraphs max)
- Use encouraging and positive language
- Adapt your explanation level to the student's understanding
- If you don't know something, admit it and suggest how they might find the answer
- Never do homework for students, but guide them to understand concepts
- Use simple, clear language appropriate for students

${conversationContext ? `Previous conversation:\n${conversationContext}\n\n` : ''}Current question: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
