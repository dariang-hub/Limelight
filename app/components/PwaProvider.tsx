'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PwaProvider() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.error('SW registration failed:', err))
    }

    // Capture install prompt — fires before browser shows its own UI
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      // Show banner after a short delay so it doesn't compete with page load
      setTimeout(() => setShowBanner(true), 3000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Hide banner if already installed
    window.addEventListener('appinstalled', () => {
      setShowBanner(false)
      setInstallPrompt(null)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!installPrompt) return
    await installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') setShowBanner(false)
    setInstallPrompt(null)
  }

  if (!showBanner || !installPrompt) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: '480px',
      background: '#1A2235',
      border: '1px solid rgba(244,105,75,0.3)',
      borderRadius: '16px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      zIndex: 9999,
      animation: 'fadeInUp 0.4s ease both',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: '#F4694B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '20px',
      }}>
        ⚡
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#F8F6F0', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.3 }}>
          Add LimeLight to your home screen
        </div>
        <div style={{ color: 'rgba(248,246,240,0.5)', fontSize: '0.78rem', marginTop: '2px' }}>
          Fast access, offline support, no app store needed
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={() => setShowBanner(false)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(248,246,240,0.15)',
            borderRadius: '8px',
            color: 'rgba(248,246,240,0.5)',
            padding: '6px 12px',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          Not now
        </button>
        <button
          onClick={handleInstall}
          style={{
            background: '#F4694B',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Install
        </button>
      </div>
    </div>
  )
}
