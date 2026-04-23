'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signUpWithEmail(formData: FormData) {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const name = (formData.get('name') as string)?.trim()

  console.log('[signUpWithEmail] called with email:', email, 'name:', name)

  if (!name) return { error: 'Please enter your full name.' }
  if (!email) return { error: 'Please enter your email address.' }
  if (!password) return { error: 'Please create a password.' }
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' }

  let supabase
  try {
    supabase = await createClient()
  } catch (err) {
    console.error('[signUpWithEmail] Failed to create Supabase client:', err)
    return { error: 'Server configuration error. Please try again.' }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      console.error('[signUpWithEmail] Supabase signUp error:', error.message, error.status)
      return { error: error.message }
    }

    console.log('[signUpWithEmail] Success — user id:', data.user?.id, '| has session:', !!data.session)

    // session is null when Supabase email confirmation is enabled
    return { success: true, needsConfirmation: !data.session }
  } catch (err) {
    console.error('[signUpWithEmail] Unexpected error:', err)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
