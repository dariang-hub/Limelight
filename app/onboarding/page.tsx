'use client'

import { useState, useTransition, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signUpWithEmail, signInWithGoogle } from '@/app/actions/auth'
import type { PlanKey } from '@/lib/stripe'

async function startCheckout(plan: PlanKey) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan }),
  })
  const data = await res.json() as { url?: string; error?: string }
  if (data.url) {
    window.location.href = data.url
  } else {
    throw new Error(data.error ?? 'Checkout failed')
  }
}

const disciplines = [
  { icon: '🎭', name: 'Actor' },
  { icon: '🎵', name: 'Musician' },
  { icon: '🎙️', name: 'Voice Artist' },
  { icon: '🎬', name: 'Director' },
  { icon: '💃', name: 'Dancer' },
  { icon: '✍️', name: 'Playwright' },
  { icon: '🔊', name: 'Sound Design' },
  { icon: '🕺', name: 'Choreographer' },
  { icon: '✨', name: 'Multi / Other' },
]

function OnboardingContent() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [discipline, setDiscipline] = useState('Director')
  const [plan, setPlan] = useState<PlanKey>('pro')

  // Pre-select plan from ?plan= query param
  useEffect(() => {
    const p = searchParams.get('plan')
    if (p === 'starter' || p === 'pro') setPlan(p)
  }, [searchParams])
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [, startTransition] = useTransition()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  function passwordStrength(val: string) {
    let score = 0
    if (val.length >= 8) score++
    if (/[A-Z]/.test(val)) score++
    if (/[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++
    return score
  }

  const strength = passwordStrength(password)
  const strengthColors = ['', '#EF4444', '#F59E0B', '#F5B731', '#22C55E']
  const strengthLabels = ['Enter a password', 'Weak', 'Fair', 'Good', 'Strong ✓']

  return (
    <div className="onboard-wrap">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <div>
          <div className="logo-row">
            <div className="logo-badge">⚡</div>
            <div className="logo-text"><span className="logo-lime">Lime</span><span className="logo-light">Light</span></div>
          </div>
          <div className="left-glow"></div>
          <h1 className="left-headline">Your resume should<br /><em>get you the audition.</em></h1>
          <p className="left-sub">The only resume builder made for performers, by performers. Every template, every feature, every AI suggestion — built for the industry.</p>
          <div className="social-proof">
            <div className="proof-items">
              <div className="proof-item">
                <div className="proof-icon proof-icon-coral">⚡</div>
                <span>Built by <span className="proof-strong">working SAG-AFTRA and AEA members</span></span>
              </div>
              <div className="proof-item">
                <div className="proof-icon proof-icon-teal">🎭</div>
                <span><span className="proof-strong">8,000+ performers</span> already using LimeLight</span>
              </div>
              <div className="proof-item">
                <div className="proof-icon proof-icon-gold">⭐</div>
                <span>Templates trusted by <span className="proof-strong">casting directors</span></span>
              </div>
              <div className="proof-item">
                <div className="proof-icon proof-icon-coral">💰</div>
                <span>Starting at <span className="proof-strong">$2.99/month</span> — cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-mini">
          <div className="testimonial-mini-stars">★★★★★</div>
          <div className="testimonial-mini-text">&quot;I uploaded my old Word doc and within two minutes had a resume that looked like it belonged on Broadway. I got three callbacks the following week.&quot;</div>
          <div className="testimonial-mini-author">— Maya Okonkwo, Musical Theatre Actress · Chicago, IL</div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">

        {/* Mobile logo */}
        <div className="mobile-logo">
          <div className="logo-badge" style={{ width: '40px', height: '40px', margin: '0 auto 8px', fontSize: '20px', background: 'linear-gradient(135deg,#FF6B35,#F5B731)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</div>
          <div className="logo-text"><span className="logo-lime">Lime</span><span className="logo-light">Light</span></div>
        </div>

        <div className="form-container">

          {/* Step dots */}
          <div className="step-dots">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={`step-dot${step === n ? ' active' : ''}${step > n ? ' done' : ''}`}></div>
            ))}
          </div>

          {/* STEP 1: Create Account */}
          {step === 1 && (
            <div className="form-panel active">
              <div className="form-title">Create your account</div>
              <div className="form-sub">7 days free, then starting at $2.99/month. No card required to start.</div>

              <div className="social-login">
                <button className="social-btn" onClick={() => { void signInWithGoogle() }}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <div className="or-divider"><div className="or-line"></div><span className="or-text">or sign up with email</span><div className="or-line"></div></div>

              <div className="field">
                <label className="field-label">Full Name</label>
                <div className="field-input-icon">
                  <span className="field-icon">👤</span>
                  <input className="field-input" type="text" placeholder="Your name as it appears on your resume" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="field-label">Email Address</label>
                <div className="field-input-icon">
                  <span className="field-icon">✉️</span>
                  <input className="field-input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="field-label">Password</label>
                <div className="field-input-icon">
                  <span className="field-icon">🔒</span>
                  <input className="field-input" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="password-strength">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="strength-bar" style={{ background: i < strength ? strengthColors[strength] : 'var(--border)' }}></div>
                  ))}
                </div>
                <div className="strength-label" style={{ color: password.length === 0 ? 'rgba(248,246,240,0.3)' : strengthColors[strength] }}>
                  {password.length === 0 ? 'Enter a password' : strengthLabels[strength]}
                </div>
              </div>

              {authError && (
                <div style={{ background: 'rgba(244,105,75,0.1)', border: '1px solid rgba(244,105,75,0.3)', borderRadius: '8px', padding: '12px 16px', fontSize: '0.875rem', color: 'var(--coral-light)', marginBottom: '16px' }}>
                  ⚠️ {authError}
                </div>
              )}
              {needsConfirmation && (
                <div style={{ background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.3)', borderRadius: '8px', padding: '12px 16px', fontSize: '0.875rem', color: '#2DD4BF', marginBottom: '16px' }}>
                  📧 Check your email to confirm your account, then continue below.
                </div>
              )}
              <button
                className="btn-full btn-coral"
                disabled={isSigningUp}
                onClick={() => {
                  setAuthError(null)
                  // Client-side validation before hitting the server
                  if (!name.trim()) { setAuthError('Please enter your full name.'); return }
                  if (!email.trim()) { setAuthError('Please enter your email address.'); return }
                  if (!password) { setAuthError('Please create a password.'); return }
                  if (password.length < 8) { setAuthError('Password must be at least 8 characters.'); return }

                  setIsSigningUp(true)
                  console.log('[Onboarding] Calling signUpWithEmail for:', email)
                  ;(async () => {
                    try {
                      const fd = new FormData()
                      fd.append('name', name)
                      fd.append('email', email)
                      fd.append('password', password)
                      const result = await signUpWithEmail(fd)
                      console.log('[Onboarding] signUpWithEmail result:', result)
                      if (result?.error) {
                        setAuthError(result.error)
                      } else if (result?.needsConfirmation) {
                        setNeedsConfirmation(true)
                        setStep(2)
                      } else {
                        setStep(2)
                      }
                    } catch (err) {
                      console.error('[Onboarding] Unexpected error from signUpWithEmail:', err)
                      setAuthError('Something went wrong. Please try again.')
                    } finally {
                      setIsSigningUp(false)
                    }
                  })()
                }}
              >
                {isSigningUp ? 'Creating Account…' : 'Create Account — Start Free Trial →'}
              </button>
              <div className="form-terms">By continuing you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. Your 7-day free trial begins immediately.</div>
              <div className="switch-link">Already have an account? <a href="#">Log in</a></div>
            </div>
          )}

          {/* STEP 2: Discipline */}
          {step === 2 && (
            <div className="form-panel active">
              <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
              <div className="form-title">What do you do?</div>
              <div className="form-sub">Select your primary discipline. You can always add more later — most LimeLight members are multi-hyphenate.</div>

              <div className="discipline-grid">
                {disciplines.map((d) => (
                  <div key={d.name} className={`discipline-btn${discipline === d.name ? ' selected' : ''}`} onClick={() => setDiscipline(d.name)}>
                    <div className="discipline-icon">{d.icon}</div>
                    <div className="discipline-name">{d.name}</div>
                  </div>
                ))}
              </div>

              <div className="field">
                <label className="field-label">Union Affiliation (select all that apply)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { label: 'AEA', checked: false },
                    { label: 'SAG-AFTRA', checked: false },
                    { label: 'AGMA', checked: false },
                    { label: 'Non-Union', checked: false },
                    { label: 'Eligible', checked: true },
                  ].map((u) => (
                    <label key={u.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px 12px', transition: 'all 0.2s' }}>
                      <input type="checkbox" defaultChecked={u.checked} style={{ accentColor: 'var(--teal)' }} /> {u.label}
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn-full btn-coral" onClick={() => setStep(3)} style={{ marginTop: '8px' }}>Continue →</button>
              <div className="switch-link">You can select multiple disciplines in your profile settings later.</div>
            </div>
          )}

          {/* STEP 3: Choose Plan */}
          {step === 3 && (
            <div className="form-panel active">
              <button className="back-btn" onClick={() => setStep(2)}>← Back</button>
              <div className="form-title">Choose your plan</div>
              <div className="form-sub">Both plans start with a <strong style={{ color: 'var(--white)' }}>7-day free trial</strong>. No card charged until your trial ends.</div>

              <div className="plan-cards">
                <div className={`plan-card${plan === 'starter' ? ' selected-starter' : ''}`} onClick={() => setPlan('starter')}>
                  <div className="plan-header">
                    <div>
                      <div className="plan-name">Starter</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--white-dim)' }}>Perfect for getting started</div>
                    </div>
                    <div className="plan-price">
                      <div className="plan-price-num">$2.99</div>
                      <div className="plan-price-per">/month</div>
                    </div>
                  </div>
                  <div className="plan-features">
                    <div className="plan-feature"><span className="check">✓</span> Up to 3 resumes</div>
                    <div className="plan-feature"><span className="check">✓</span> AI cover letters</div>
                    <div className="plan-feature"><span className="check">✓</span> Resume upload &amp; parse</div>
                    <div className="plan-feature"><span className="check">✓</span> PDF &amp; Word export</div>
                    <div className="plan-feature"><span className="check">✓</span> 3 free templates · Resume score</div>
                  </div>
                  <div className="plan-radio" style={plan === 'starter' ? { borderColor: 'var(--coral)', background: 'var(--coral)' } : {}}></div>
                </div>

                <div className={`plan-card${plan === 'pro' ? ' selected-pro' : ''}`} onClick={() => setPlan('pro')}>
                  <div className="plan-popular">⭐ Most Popular</div>
                  <div className="plan-header">
                    <div>
                      <div className="plan-name" style={{ color: 'var(--teal)' }}>Professional</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--white-dim)' }}>The full performer toolkit</div>
                    </div>
                    <div className="plan-price">
                      <div className="plan-price-num" style={{ color: 'var(--teal)' }}>$7.99</div>
                      <div className="plan-price-per">/month</div>
                    </div>
                  </div>
                  <div className="plan-features">
                    <div className="plan-feature"><span className="check">✓</span> <strong style={{ color: 'var(--white)' }}>Unlimited</strong> resumes</div>
                    <div className="plan-feature"><span className="check">✓</span> All premium templates</div>
                    <div className="plan-feature"><span className="check">✓</span> Performance Clip Vault (2–4 clips)</div>
                    <div className="plan-feature"><span className="check">✓</span> Analytics dashboard · QR code</div>
                    <div className="plan-feature"><span className="check">✓</span> Public profile · Skills converter</div>
                  </div>
                  <div className="plan-radio" style={plan === 'pro' ? { borderColor: 'var(--teal)', background: 'var(--teal)' } : {}}></div>
                </div>
              </div>

              <div className="trial-note"><strong>7-day free trial</strong> — no charge until your trial ends. Cancel anytime.</div>
              {checkoutError && (
                <div style={{ background: 'rgba(244,105,75,0.1)', border: '1px solid rgba(244,105,75,0.3)', borderRadius: '8px', padding: '12px 16px', fontSize: '0.875rem', color: 'var(--coral-light)', marginBottom: '16px' }}>
                  ⚠️ {checkoutError}
                </div>
              )}
              <button
                className={`btn-full ${plan === 'pro' ? 'btn-teal' : 'btn-coral'}`}
                disabled={isCheckingOut}
                onClick={async () => {
                  setCheckoutError(null)
                  setIsCheckingOut(true)
                  try {
                    await startCheckout(plan)
                  } catch (err) {
                    setCheckoutError(err instanceof Error ? err.message : 'Something went wrong')
                    setIsCheckingOut(false)
                  }
                }}
              >
                {isCheckingOut
                  ? 'Redirecting to checkout…'
                  : `Start 7-Day Free Trial — ${plan === 'pro' ? 'Professional' : 'Starter'} →`}
              </button>
              <div className="form-terms">Credit card required after trial. You&apos;ll receive an email reminder before you&apos;re charged.</div>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="form-panel active">
              <div className="success-panel">
                <div className="success-icon">🎉</div>
                <div className="success-title">You&apos;re in the limelight.</div>
                <div className="success-sub">Your 7-day free trial has started. Your LimeLight account is ready — let&apos;s build something that gets you the room.</div>
                <div className="success-steps">
                  <div className="success-step">
                    <div className="success-step-num">1</div>
                    <div className="success-step-text"><strong>Upload your existing resume</strong> — we&apos;ll parse it automatically so you never start from scratch.</div>
                  </div>
                  <div className="success-step">
                    <div className="success-step-num">2</div>
                    <div className="success-step-text"><strong>Choose your template</strong> — pick from formats trusted by casting directors in your discipline.</div>
                  </div>
                  <div className="success-step">
                    <div className="success-step-num">3</div>
                    <div className="success-step-text"><strong>Get your Resume Score</strong> — see exactly what casting directors see and fix it in minutes.</div>
                  </div>
                </div>
                <Link href="/dashboard" className="btn-full btn-coral" style={{ marginBottom: '12px', justifyContent: 'center' }}>Go to My Dashboard →</Link>
                <Link href="/dashboard" className="btn-full btn-ghost" style={{ justifyContent: 'center' }}>Upload My Existing Resume</Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0B0F1A', minHeight: '100vh' }} />}>
      <OnboardingContent />
    </Suspense>
  )
}
