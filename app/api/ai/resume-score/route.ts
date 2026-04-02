import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { resumeText, discipline } = await request.json() as {
    resumeText: string
    discipline?: string
  }

  if (!resumeText?.trim()) {
    return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })
  }

  const disciplineContext = discipline ? ` for a ${discipline} professional` : ''

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are an expert performing arts casting director and resume consultant. Analyze this performing arts resume${disciplineContext} and provide a score and actionable feedback.

Resume:
${resumeText}

Respond with JSON in exactly this format:
{
  "score": <number 0-100>,
  "grade": "<A+|A|A-|B+|B|B-|C+|C|D|F>",
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "categories": {
    "experience": <0-100>,
    "training": <0-100>,
    "skills": <0-100>,
    "presentation": <0-100>,
    "industry_fit": <0-100>
  }
}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    return NextResponse.json({ error: 'Unexpected response format' }, { status: 500 })
  }

  try {
    const result = JSON.parse(content.text) as unknown
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to parse score response' }, { status: 500 })
  }
}
