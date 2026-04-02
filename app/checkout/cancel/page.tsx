import Link from 'next/link'

export default function CheckoutCancelPage() {
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
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '48px 40px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎭</div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 900, color: '#F8F6F0', marginBottom: '12px' }}>
          No worries — the stage is still here.
        </h1>

        <p style={{ fontSize: '0.9rem', color: 'rgba(248,246,240,0.6)', marginBottom: '32px', lineHeight: 1.65 }}>
          You didn&apos;t complete checkout. Your account is safe — come back whenever you&apos;re ready to step into the limelight.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            href="/onboarding"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 28px', borderRadius: '8px',
              background: '#F4694B', color: 'white',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 4px 24px rgba(244,105,75,0.4)',
            }}
          >
            Try Again →
          </Link>

          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 28px', borderRadius: '8px',
              background: 'transparent', color: 'rgba(248,246,240,0.6)',
              border: '1px solid rgba(248,246,240,0.12)',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9375rem', fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
