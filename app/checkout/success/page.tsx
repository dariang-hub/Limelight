import Link from 'next/link'
import { stripe } from '@/lib/stripe'

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams
  let planName = 'Professional'

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id)
      const plan = session.metadata?.plan
      planName = plan === 'starter' ? 'Starter' : 'Professional'
    } catch {
      // If session lookup fails, fall back to default — not a fatal error
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid rgba(45,212,191,0.25)',
        borderRadius: '20px',
        padding: '48px 40px',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(45,212,191,0.1)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg,#FF6B35,#F5B731)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>⚡</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>
            <span style={{ background: 'linear-gradient(90deg,#F5B731,#FFD166)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lime</span>
            <span style={{ color: '#F8F6F0' }}>Light</span>
          </div>
        </div>

        {/* Success icon */}
        <div style={{ fontSize: '4rem', marginBottom: '20px', animation: 'pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275)' }}>🎉</div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: '#F8F6F0', marginBottom: '12px', lineHeight: 1.15 }}>
          You&apos;re in the limelight.
        </h1>

        <p style={{ fontSize: '1rem', color: 'rgba(248,246,240,0.65)', marginBottom: '8px', lineHeight: 1.6 }}>
          Your 7-day free trial has started on the <strong style={{ color: '#2DD4BF' }}>{planName}</strong> plan. No charge until your trial ends.
        </p>

        <div style={{
          background: 'rgba(45,212,191,0.08)',
          border: '1px solid rgba(45,212,191,0.2)',
          borderRadius: '12px',
          padding: '20px',
          margin: '28px 0',
          textAlign: 'left',
        }}>
          {[
            { n: '1', title: 'Upload your existing resume', desc: "We'll parse it automatically — never start from scratch." },
            { n: '2', title: 'Choose your template', desc: 'Pick from formats trusted by casting directors in your discipline.' },
            { n: '3', title: 'Get your Resume Score', desc: 'See exactly what casting directors see and fix it in minutes.' },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', gap: '12px', marginBottom: s.n === '3' ? 0 : '16px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F4694B', color: 'white', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>{s.n}</div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F8F6F0', marginBottom: '2px' }}>{s.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(248,246,240,0.5)' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '14px 28px',
            borderRadius: '8px',
            background: '#F4694B',
            color: 'white',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9375rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(244,105,75,0.4)',
            marginBottom: '12px',
          }}
        >
          Go to My Dashboard →
        </Link>

        <p style={{ fontSize: '0.75rem', color: 'rgba(248,246,240,0.3)', marginTop: '16px' }}>
          You&apos;ll receive an email reminder before your trial ends. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
