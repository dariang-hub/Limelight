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

  const { resumeText, jobDescription, applicantName, discipline } = await request.json() as {
    resumeText: string
    jobDescription: string
    applicantName?: string
    discipline?: string
  }

  if (!resumeText?.trim() || !jobDescription?.trim()) {
    return NextResponse.json(
      { error: 'Resume text and job description are required' },
      { status: 400 }
    )
  }

  const nameClause = applicantName ? ` The applicant's name is ${applicantName}.` : ''
  const disciplineClause = discipline ? ` They are a ${discipline} professional.` : ''

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: `You are an expert performing arts career coach who writes compelling cover letters that land auditions and job offers.${nameClause}${disciplineClause}

Write a professional, personalized cover letter based on the resume and job description below. The letter should:
- Open with a memorable hook (not "I am writing to apply...")
- Highlight 2-3 specific, relevant achievements from the resume
- Show genuine enthusiasm for this specific opportunity
- Be concise (3-4 paragraphs, ~250-350 words)
- Close with a confident, specific call to action
- Sound human and warm, not corporate

Resume:
${resumeText}

Job / Audition Description:
${jobDescription}

Write only the cover letter body (no "Subject:" line, no metadata). Start directly with the salutation or opening line.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    return NextResponse.json({ error: 'Unexpected response format' }, { status: 500 })
  }

  return NextResponse.json({ letter: content.text })
}
