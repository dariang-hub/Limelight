'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const modalData: Record<string, { name: string; desc: string; features: string[]; bestFor: string }> = {
  broadway: {
    name: 'Broadway Classic',
    desc: 'The gold standard for theater submissions. Trusted by AEA members across Broadway, Off-Broadway, and major regional houses. Clean serif typography, proper credit hierarchy, and union-standard formatting.',
    features: ['AEA/SAG-AFTRA union line placement', 'Proper role/production/director column layout', 'Classic serif typography', 'Training-after-credits ordering', 'Special skills section'],
    bestFor: 'Theater, Musical Theatre, Opera',
  },
  hollywood: {
    name: 'Hollywood Modern',
    desc: 'Sleek, contemporary, and built for film and television. Bold typography with clean lines that read instantly in digital and printed form. Preferred by agents submitting to streaming platforms and major studios.',
    features: ['Film/TV credit optimization', 'Agent info placement at top', 'Modern sans-serif typography', 'Digital-first formatting', 'IMDb / casting platform compatible'],
    bestFor: 'Film, Television, Streaming',
  },
  industry: {
    name: 'Industry Standard',
    desc: 'The universal performing arts resume format, accepted across all disciplines and institutions. Clean, professional, and trusted from community theater to major regional houses.',
    features: ['Multi-discipline credit sections', 'Flexible layout adapts to any career', 'Universal formatting conventions', 'Works for theater, film, and VO'],
    bestFor: 'Multi-hyphenate performers, Generalists',
  },
  contemporary: {
    name: 'Contemporary',
    desc: 'Bold, distinctive, and modern. Perfect for performers who work across disciplines and want a resume that signals creativity and visual sophistication — choreographers, movement directors, devised theater artists.',
    features: ['Accent color customization', 'Optional photo sidebar', 'Multi-discipline credit layout', 'Creative header design', 'Movement arts friendly'],
    bestFor: 'Dancers, Choreographers, Directors, Devisers',
  },
  voice: {
    name: 'Voice Artist Pro',
    desc: 'Designed specifically for voice artists. Organizes credits by medium — commercials, animation, audiobooks, games — with demo reel QR integration on every export.',
    features: ['Commercial / animation / audiobook sections', 'Studio setup specifications', 'Demo reel QR on export', 'Dialect and voice range display', 'Union affiliation badges'],
    bestFor: 'Voice Artists, VO Actors, Audiobook Narrators',
  },
}

type CreditEntry = { role: string; production: string; venue: string; director: string; category: string; year: string }

export default function HomePage() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing')
  const [activeTab, setActiveTab] = useState('builder')
  const [modalType, setModalType] = useState<string | null>(null)
  const [builderStep, setBuilderStep] = useState(2)
  const [credits, setCredits] = useState<CreditEntry[]>([
    { role: 'Roxie Hart', production: 'Chicago (Revival)', venue: 'Ambassador Theatre', director: 'Susan Stroman', category: 'Broadway / Off-Broadway', year: '2024' },
    { role: 'Eliza Doolittle', production: 'My Fair Lady', venue: 'Lincoln Center Theater', director: 'Bartlett Sher', category: 'Broadway / Off-Broadway', year: '2023' },
  ])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [view])

  function addCredit() {
    setCredits((prev) => [...prev, { role: '', production: '', venue: '', director: '', category: 'Broadway / Off-Broadway', year: '' }])
  }

  function updateCredit(index: number, field: keyof CreditEntry, value: string) {
    setCredits((prev) => prev.map((c, i) => i === index ? { ...c, [field]: value } : c))
  }

  const modal = modalType ? modalData[modalType] : null

  if (view === 'dashboard') return <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} setView={setView} credits={credits} addCredit={addCredit} updateCredit={updateCredit} builderStep={builderStep} setBuilderStep={setBuilderStep} />

  return (
    <>
      <div id="landing-page">
        {/* NAV */}
        <nav id="main-nav">
          <a href="#" className="logo">
            <div className="logo-badge">⚡</div>
            <div className="logo-text">
              <span className="logo-lime">Lime</span><span className="logo-light">Light</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="#templates">Templates</a></li>
            <li><a href="#tools">Tools</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#origin">Our Story</a></li>
          </ul>
          <div className="nav-ctas">
            <button className="nav-login" onClick={() => setView('dashboard')}>Log In</button>
            <button className="btn btn-coral btn-sm" onClick={() => setView('dashboard')}>Get Started</button>
          </div>
        </nav>

        {/* HERO */}
        <section id="hero">
          <div className="hero-bg">
            <div className="spotlight"></div>
          </div>
          <div className="hero-content">
            <div className="hero-badge fade-in-up">
              <span className="heart">♥</span> Made by performers, for performers
            </div>
            <h1 className="hero-title fade-in-up delay-1">
              Your Resume Should<br />
              <em>Get You The Audition</em><br />
              — We Make Sure It Does.
            </h1>
            <p className="hero-sub fade-in-up delay-2">
              The only resume builder built for the industry, by the industry.
            </p>
            <div className="hero-ctas fade-in-up delay-3">
              <button className="btn btn-coral" onClick={() => setView('dashboard')}>⚡ Build Your Resume</button>
              <button className="btn btn-teal-outline" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>See Examples First →</button>
            </div>
            <p className="hero-social-proof fade-in-up delay-4">
              Starting at <span>$2.99/month</span> &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; Used by <span>8,000+ performers</span>
            </p>
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="trust-bar">
          <div className="trust-bar-inner">
            <span className="trust-label">Trusted by members of</span>
            <div className="trust-unions">
              <span className="union-badge">SAG-AFTRA</span>
              <span className="union-badge">AEA</span>
              <span className="union-badge">AGMA</span>
              <span className="union-badge">AGVA</span>
              <span className="union-badge">IATSE</span>
              <span className="union-badge">SDC</span>
            </div>
          </div>
        </div>

        {/* TEMPLATE GALLERY */}
        <section id="templates" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow">Resume Templates</div>
              <h2 className="section-title">See Before You Build.</h2>
              <p className="section-sub" style={{ margin: '0 auto 40px' }}>Professional templates crafted with input from casting directors, agents, and union reps. Click any to preview.</p>
            </div>
          </div>
          <div className="templates-scroll" id="templateScroll">
            {/* Broadway Classic */}
            <div className="template-card" onClick={() => setModalType('broadway')}>
              <div className="template-preview template-broadway">
                <div className="resume-header">
                  <div className="resume-name template-broadway">MARGARET HAYES</div>
                  <div className="resume-sub" style={{ color: '#8B0000' }}>AEA Member · Principal Actress</div>
                  <div className="resume-contact">margarethayes.com · (212) 555-0194 · NY/LA</div>
                </div>
                <div className="resume-divider" style={{ background: '#8B0000' }}></div>
                <div className="resume-section-title template-broadway">Broadway / Off-Broadway</div>
                <div className="resume-item"><div className="resume-item-title">Roxie Hart · Chicago (Revival)</div><div className="resume-item-detail">Ambassador Theatre · Dir. Susan Stroman</div></div>
                <div className="resume-item"><div className="resume-item-title">Eliza Doolittle · My Fair Lady</div><div className="resume-item-detail">Lincoln Center Theater · Dir. Bartlett Sher</div></div>
                <div className="resume-item"><div className="resume-item-title">Sally Bowles · Cabaret</div><div className="resume-item-detail">Studio 54 · Dir. Sam Mendes</div></div>
                <div className="resume-section-title template-broadway" style={{ marginTop: '8px' }}>National Tours</div>
                <div className="resume-item"><div className="resume-item-title">Christine · Phantom of the Opera</div><div className="resume-item-detail">North American Tour · Cameron Mackintosh</div></div>
                <div className="resume-section-title template-broadway" style={{ marginTop: '8px' }}>Training</div>
                <div className="resume-item"><div className="resume-item-detail">BFA Musical Theatre, Carnegie Mellon · Voice: Anne Gross · Shakespeare: RADA Exchange</div></div>
                <div className="resume-skills"><span className="resume-skill">Soprano C–Eb6</span><span className="resume-skill">Mezzo</span><span className="resume-skill">Tap/Ballet/Jazz</span><span className="resume-skill">British RP</span><span className="resume-skill">Stage Combat</span></div>
              </div>
              <div className="template-info">
                <div className="template-name">Broadway Classic</div>
                <div className="template-desc">Timeless theater formatting. Union-standard layout trusted on Broadway.</div>
                <div className="template-tags">
                  <span className="tag">Theater</span><span className="tag">Musical</span><span className="tag">AEA</span>
                </div>
              </div>
            </div>

            {/* Hollywood Modern */}
            <div className="template-card" onClick={() => setModalType('hollywood')}>
              <div className="template-preview template-hollywood" style={{ background: '#F8F9FF' }}>
                <div className="resume-header">
                  <div className="resume-name template-hollywood">XAVIER DELACROIX</div>
                  <div className="resume-sub" style={{ color: '#2563EB', fontFamily: "'DM Sans',sans-serif" }}>SAG-AFTRA · Film/Television Actor</div>
                  <div className="resume-contact">xavierac.com · (310) 555-0847 · Los Angeles, CA</div>
                </div>
                <div style={{ height: '1px', background: '#E2E8FF', margin: '8px 0' }}></div>
                <div className="resume-section-title template-hollywood">Film</div>
                <div className="resume-item"><div className="resume-item-title">Detective Reyes (Lead) · Midnight Protocol</div><div className="resume-item-detail">Lionsgate · Dir. Ava DuVernay</div></div>
                <div className="resume-item"><div className="resume-item-title">Marcus (Supporting) · The Inheritance</div><div className="resume-item-detail">A24 · Dir. Jordan Peele</div></div>
                <div className="resume-section-title template-hollywood" style={{ marginTop: '8px' }}>Television</div>
                <div className="resume-item"><div className="resume-item-title">Agent Torres (Recurring) · The Agency</div><div className="resume-item-detail">Showtime · Eps. 14, 15, 18–22</div></div>
                <div className="resume-item"><div className="resume-item-title">Guest Star · Grey&apos;s Anatomy</div><div className="resume-item-detail">ABC · Season 19, Ep. 8</div></div>
                <div className="resume-section-title template-hollywood" style={{ marginTop: '8px' }}>Training</div>
                <div className="resume-item"><div className="resume-item-detail">Meisner Technique: Joanne Baron Studio · Improv: UCB LA · UCLA BFA Film Acting</div></div>
                <div className="resume-skills"><span className="resume-skill">Spanish (fluent)</span><span className="resume-skill">Stage Combat</span><span className="resume-skill">Motorcycles</span><span className="resume-skill">HEMA Sword</span></div>
              </div>
              <div className="template-pro-badge">👑 PRO</div>
              <div className="template-info">
                <div className="template-name">Hollywood Modern</div>
                <div className="template-desc">Sleek contemporary design optimized for film and television submissions.</div>
                <div className="template-tags">
                  <span className="tag">Film</span><span className="tag">TV</span><span className="tag">SAG-AFTRA</span>
                </div>
              </div>
            </div>

            {/* Industry Standard */}
            <div className="template-card" onClick={() => setModalType('industry')}>
              <div className="template-preview template-industry">
                <div className="resume-header">
                  <div className="resume-name">PRIYA KRISHNAMURTHY</div>
                  <div className="resume-sub">AEA · SAG-AFTRA Eligible · Actor / Singer</div>
                  <div className="resume-contact">priyakacts.com · contact@example.com · (718) 555-0321</div>
                </div>
                <div className="resume-divider"></div>
                <div className="resume-section-title template-industry">Stage</div>
                <div className="resume-item"><div className="resume-item-title">Beatrice · Much Ado About Nothing</div><div className="resume-item-detail">Shakespeare Theatre DC · Dir. Michael Kahn</div></div>
                <div className="resume-item"><div className="resume-item-title">Nora · A Doll&apos;s House</div><div className="resume-item-detail">Goodman Theatre Chicago · Dir. Robert Falls</div></div>
                <div className="resume-section-title template-industry" style={{ marginTop: '8px' }}>Film / TV</div>
                <div className="resume-item"><div className="resume-item-title">Dr. Mehta (Co-Star) · New Amsterdam</div><div className="resume-item-detail">NBC / Universal</div></div>
                <div className="resume-section-title template-industry" style={{ marginTop: '8px' }}>Voice</div>
                <div className="resume-item"><div className="resume-item-detail">National NPR promos · Audiobooks: Penguin Random House · Animation: Netflix (pending)</div></div>
                <div className="resume-skills"><span className="resume-skill">Indian Dialects</span><span className="resume-skill">Kathak Dance</span><span className="resume-skill">Piano</span><span className="resume-skill">Mezzo-Soprano</span></div>
              </div>
              <div className="template-info">
                <div className="template-name">Industry Standard</div>
                <div className="template-desc">Universal format accepted across all disciplines and submissions.</div>
                <div className="template-tags">
                  <span className="tag">Universal</span><span className="tag">Multi-hyphenate</span>
                </div>
              </div>
            </div>

            {/* Contemporary */}
            <div className="template-card" onClick={() => setModalType('contemporary')}>
              <div className="template-preview template-contemporary" style={{ background: '#FAFAF8' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div className="resume-name template-contemporary" style={{ textAlign: 'left' }}>JORDAN VÁSQUEZ</div>
                    <div className="resume-sub" style={{ textAlign: 'left', color: '#F4694B' }}>Choreographer / Dancer / Movement Director</div>
                    <div className="resume-contact" style={{ textAlign: 'left' }}>jordan-v.com · (646) 555-0572 · NYC</div>
                  </div>
                  <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg,#F4694B,#F5B731)', borderRadius: '6px', flexShrink: 0 }}></div>
                </div>
                <div style={{ height: '2px', background: 'linear-gradient(90deg,#F4694B,transparent)', margin: '8px 0' }}></div>
                <div className="resume-section-title template-contemporary">Choreography Credits</div>
                <div className="resume-item"><div className="resume-item-title">In the Heights · Paper Mill Playhouse</div><div className="resume-item-detail">Choreographer · Dir. Gabriel Barre</div></div>
                <div className="resume-item"><div className="resume-item-title">On the Town · City Center Encores!</div><div className="resume-item-detail">Associate Choreographer · Jack Viertel</div></div>
                <div className="resume-section-title template-contemporary" style={{ marginTop: '8px' }}>Performance</div>
                <div className="resume-item"><div className="resume-item-detail">West Side Story (Broadway Revival) · Hamilton (National Tour, Principal Swing)</div></div>
                <div className="resume-skills"><span className="resume-skill">Ballet</span><span className="resume-skill">Hip-Hop</span><span className="resume-skill">Latin/Salsa</span><span className="resume-skill">Tap</span><span className="resume-skill">Acro</span><span className="resume-skill">AEA</span></div>
              </div>
              <div className="template-pro-badge">👑 PRO</div>
              <div className="template-info">
                <div className="template-name">Contemporary</div>
                <div className="template-desc">Bold, modern layout for multi-disciplinary performers and creatives.</div>
                <div className="template-tags">
                  <span className="tag">Dance</span><span className="tag">Multi-discipline</span><span className="tag">Creative</span>
                </div>
              </div>
            </div>

            {/* Voice Artist */}
            <div className="template-card" onClick={() => setModalType('voice')}>
              <div className="template-preview" style={{ background: '#F0F7FF' }}>
                <div className="resume-header">
                  <div className="resume-name" style={{ color: '#1E3A5F' }}>CORINNE ASHBY-WELLS</div>
                  <div className="resume-sub" style={{ color: '#1d4ed8' }}>Voice Actor · SAG-AFTRA · AFTRA</div>
                  <div className="resume-contact">corinnevo.com · contact@example.com</div>
                </div>
                <div style={{ height: '1px', background: '#BFDBFE', margin: '8px 0' }}></div>
                <div className="resume-section-title" style={{ color: '#1d4ed8' }}>Commercials / Brand</div>
                <div className="resume-item"><div className="resume-item-title">National TV: Toyota, Delta, Apple</div></div>
                <div className="resume-item"><div className="resume-item-title">Radio: Starbucks, Chase Bank, Microsoft</div></div>
                <div className="resume-section-title" style={{ color: '#1d4ed8', marginTop: '8px' }}>Animation / Games</div>
                <div className="resume-item"><div className="resume-item-title">Aria — Starfall Chronicles (Video Game)</div></div>
                <div className="resume-item"><div className="resume-item-title">Various · DreamWorks pilot (TBA)</div></div>
                <div className="resume-section-title" style={{ color: '#1d4ed8', marginTop: '8px' }}>Audiobooks</div>
                <div className="resume-item"><div className="resume-item-detail">12 titles for Penguin Random House · Audible Approved Producer · ACX Award 2023</div></div>
                <div className="resume-skills"><span className="resume-skill">Soprano</span><span className="resume-skill">Southern US</span><span className="resume-skill">RP British</span><span className="resume-skill">ISDN/Source-Connect</span></div>
              </div>
              <div className="template-info">
                <div className="template-name">Voice Artist Pro</div>
                <div className="template-desc">Purpose-built for VO artists, with demo reel QR integration.</div>
                <div className="template-tags"><span className="tag">Voice</span><span className="tag">VO</span><span className="tag">Animation</span></div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button className="btn btn-teal-outline" onClick={() => setView('dashboard')}>Browse All Templates →</button>
          </div>
        </section>

        {/* PROFESSION CATEGORIES */}
        <section id="professions" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow">Who It&apos;s For</div>
              <h2 className="section-title">For Every Stage of Your Career.</h2>
            </div>
            <div className="profession-grid reveal">
              {[
                { icon: '🎭', name: 'Actors', stat: '2.4k+ resumes', cls: 'tile-coral' },
                { icon: '🎵', name: 'Musicians', stat: '1.8k+ resumes', cls: 'tile-teal' },
                { icon: '🎙️', name: 'Voice Artists', stat: '950+ resumes', cls: 'tile-gold' },
                { icon: '🎬', name: 'Directors', stat: '620+ resumes', cls: 'tile-purple' },
                { icon: '✍️', name: 'Playwrights', stat: '340+ resumes', cls: 'tile-teal' },
                { icon: '🔊', name: 'Sound Design', stat: '480+ resumes', cls: 'tile-gold' },
                { icon: '💃', name: 'Dancers', stat: '1.2k+ resumes', cls: 'tile-coral' },
                { icon: '✨', name: 'All Performers', stat: '8k+ resumes', cls: 'tile-purple', statStyle: { color: 'var(--gold)' }, tileStyle: { background: 'linear-gradient(135deg,var(--surface),rgba(168,85,247,0.08))' } },
              ].map((p) => (
                <div key={p.name} className={`profession-tile ${p.cls}`} style={p.tileStyle} onClick={() => setView('dashboard')}>
                  <div className="profession-icon">{p.icon}</div>
                  <div className="profession-name">{p.name}</div>
                  <div className="profession-stat" style={p.statStyle}>{p.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS SECTION */}
        <section id="tools" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow">Features</div>
              <h2 className="section-title">Tools That Actually Help.</h2>
              <p className="section-sub" style={{ margin: '0 auto 48px' }}>Built around the real workflow of working performers — not generic job seekers.</p>
            </div>
            <div className="tools-grid reveal">
              <div className="tool-card"><div className="tool-icon tool-icon-teal">📤</div><div className="tool-name">Upload &amp; Parse</div><div className="tool-desc">Drop in your existing resume in any format — PDF, Word, or plain text. Our AI extracts your credits, skills, and training automatically so you never start from scratch.</div></div>
              <div className="tool-card"><div className="tool-icon tool-icon-coral">🪜</div><div className="tool-name">Step-by-Step Builder</div><div className="tool-desc">Guided creation with industry-specific prompts. We know what casting directors want to see — and we ask exactly the right questions to get it out of you.</div></div>
              <div className="tool-card"><div className="tool-icon tool-icon-gold">🔄</div><div className="tool-name">Skills Converter</div><div className="tool-desc">Need a corporate resume too? Transform &quot;20 years of performance experience&quot; into the leadership and communication language that non-arts employers recognize.</div></div>
              <div className="tool-card"><div className="tool-icon tool-icon-purple">📊</div><div className="tool-name">Resume Score</div><div className="tool-desc">AI scoring modeled on what casting directors and agents actually look for. Get a real score, specific feedback, and a one-click fix for every flagged issue.</div></div>
              <div className="tool-card"><div className="tool-icon tool-icon-coral">✍️</div><div className="tool-name">Humanized AI</div><div className="tool-desc">Cover letters that sound like you wrote them — because you did, with a little help. Trained on thousands of successful performing arts submissions, not corporate boilerplate.</div></div>
              <div className="tool-card" style={{ background: 'linear-gradient(135deg,var(--surface),rgba(245,183,49,0.05))', borderColor: 'rgba(245,183,49,0.15)' }}><div className="tool-icon" style={{ background: 'rgba(245,183,49,0.12)' }}>🧠</div><div className="tool-name">AI That Learns You</div><div className="tool-desc">The more you use LimeLight, the better it knows your voice, your specializations, and your career trajectory. Every suggestion gets sharper over time.</div></div>
            </div>
          </div>
        </section>

        {/* PRO FEATURES */}
        <section id="pro-features" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow" style={{ color: 'var(--teal)' }}>Professional Tier</div>
              <h2 className="section-title">Stand Out From Every Angle.</h2>
              <p className="section-sub" style={{ margin: '0 auto 48px' }}>Pro isn&apos;t just more features — it&apos;s a complete performer profile that works 24/7 on your behalf.</p>
            </div>
            <div className="pro-grid reveal">
              <div className="pro-card"><div className="pro-card-icon">📱</div><div className="pro-card-title">Demo Reel QR Code</div><div className="pro-card-desc">Every PDF export includes a scannable QR code that links directly to your demo reel. Casting directors scan, they watch, you get the room.</div></div>
              <div className="pro-card"><div className="pro-card-icon">📈</div><div className="pro-card-title">Resume Analytics Dashboard</div><div className="pro-card-desc">Know exactly who&apos;s looking. Track views, downloads, and engagement on your profile and exported resumes so you can follow up at the right moment.</div></div>
              <div className="pro-card"><div className="pro-card-icon">🔗</div><div className="pro-card-title">Public Profile Link</div><div className="pro-card-desc">Your own searchable performer profile page. Share it in emails, put it in your email signature, add it to your Actors Access profile.</div></div>
              <div className="pro-card"><div className="pro-card-icon">🖼️</div><div className="pro-card-title">Portfolio Gallery</div><div className="pro-card-desc">Showcase production photos, headshots, and press clippings in a beautifully formatted gallery on your public profile. First impressions happen before the audition.</div></div>
              <div className="pro-card clip-vault-card">
                <div className="pro-card-badge">⭐ Signature Feature</div>
                <div className="pro-card-icon">🎬</div>
                <div className="pro-card-title">Performance Clip Vault</div>
                <div className="pro-card-desc">Upload 2–4 performance clips directly to your profile. Appears below your resume in a clean inline player. Casting directors can watch without leaving your page. Starter users can embed YouTube or Vimeo links as an alternative.</div>
                <div className="clip-specs">
                  <div className="clip-spec"><div className="clip-spec-label">Clips per profile</div><div className="clip-spec-val">2 – 4 clips</div></div>
                  <div className="clip-spec"><div className="clip-spec-label">Max duration</div><div className="clip-spec-val">2 min 25 sec</div></div>
                  <div className="clip-spec"><div className="clip-spec-label">Max file size</div><div className="clip-spec-val">100 MB / clip</div></div>
                  <div className="clip-spec"><div className="clip-spec-label">Formats</div><div className="clip-spec-val">MP4, MOV, WebM</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section id="before-after" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow">The Difference</div>
              <h2 className="section-title">See the Transformation.</h2>
              <p className="section-sub" style={{ margin: '0 auto 48px' }}>The same performer. The same credits. An entirely different first impression.</p>
            </div>
            <div className="ba-container reveal">
              <div className="ba-card">
                <div className="ba-before">
                  <div className="ba-label ba-before-label">Before</div>
                  <br /><br />
                  <h3>JESSICA PARK</h3>
                  <p style={{ fontSize: '0.65rem' }}>actress/singer/dancer * (917)555-0184 * jessica@example.com * www.jessicapark.weebly.com</p>
                  <p className="messy">** PLEASE NOTE: Available immediately!! References on request **</p>
                  <p><b>SHOWS:</b></p>
                  <p style={{ fontSize: '0.65rem' }}>Hello Dolly - Dolly Levi - community theatre<br />High School Musical - Gabriella (Lead)<br />Godspell - cast<br />Rent - I did this in 2019 I think<br />Spring Awakening (ensemble I think?)</p>
                  <p><b>SKILLS:</b></p>
                  <p style={{ fontSize: '0.65rem' }}>can sing, dance (ballet, some hip hop, tap lessons as a child), acting, good with accents, British (sort of), southern, some comedy, improv (one workshop), I can do a cartwheel</p>
                  <p><b>TRAINING</b></p>
                  <p style={{ fontSize: '0.65rem' }}>Hofstra University BA Theatre (2021) - took some acting classes, voice lessons with teacher (private), attended a 2 day workshop with casting director??</p>
                  <p className="messy">— resume last updated sometime in 2022 —</p>
                </div>
              </div>
              <div className="ba-card">
                <div className="ba-after">
                  <div className="ba-label ba-after-label">After LimeLight ✓</div>
                  <br /><br />
                  <div className="ba-after-resume">
                    <div className="ba-name">JESSICA PARK</div>
                    <div className="ba-union">AEA Eligible · Actress / Singer / Dancer</div>
                    <div className="ba-contact-row">jessicapark.com &nbsp;|&nbsp; jessica@example.com &nbsp;|&nbsp; (917) 555-0184 &nbsp;|&nbsp; New York, NY</div>
                    <div style={{ textAlign: 'center', fontSize: '0.58rem', color: '#888' }}>Ht: 5&apos;5&quot; &nbsp;·&nbsp; Hair: Brown &nbsp;·&nbsp; Eyes: Green &nbsp;·&nbsp; Voice: Mezzo-Soprano (A3–G5)</div>
                    <div className="ba-divider"></div>
                    <div className="ba-section-hd">Stage (Principal)</div>
                    <div className="ba-row"><span className="ba-role">Dolly Levi · <em>Hello Dolly!</em></span><span className="ba-details">Riverside Theatre · Dir. Carol Waaser</span></div>
                    <div className="ba-row"><span className="ba-role">Gabriella Montez · <em>High School Musical</em></span><span className="ba-details">Hofstra Rep · Lead</span></div>
                    <div className="ba-row"><span className="ba-role">Wendla · <em>Spring Awakening</em></span><span className="ba-details">Hofstra University · Dir. Ellen Kim</span></div>
                    <div className="ba-row"><span className="ba-role">Cast (Featured) · <em>Godspell</em></span><span className="ba-details">New Stages Theatre</span></div>
                    <div className="ba-section-hd" style={{ marginTop: '6px' }}>Training</div>
                    <div className="ba-row"><span className="ba-role">BA Theatre (Acting/Musical Theatre)</span><span className="ba-details">Hofstra University, 2021</span></div>
                    <div className="ba-row"><span className="ba-role">Voice · Private Study</span><span className="ba-details">Suzanne Carter, 3 years</span></div>
                    <div className="ba-row"><span className="ba-role">Casting Workshop</span><span className="ba-details">Michael Cassara, CSA · 2022</span></div>
                    <div className="ba-section-hd" style={{ marginTop: '6px' }}>Special Skills</div>
                    <div style={{ fontSize: '0.58rem', color: '#555' }}>Ballet (12 yrs) · Tap · Hip-Hop · British RP · Southern US · Comedic Timing · Improvisation · Cartwheel/Tumbling</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="btn btn-coral" onClick={() => setView('dashboard')}>Transform My Resume →</button>
            </div>
          </div>
        </section>

        {/* AI ENGINE */}
        <section id="ai-engine" className="section-pad">
          <div className="container">
            <div className="reveal" style={{ maxWidth: '560px' }}>
              <div className="section-eyebrow" style={{ color: '#a855f7' }}>AI Intelligence</div>
              <h2 className="section-title">Gets Smarter With Every Use.</h2>
              <p className="section-sub">LimeLight isn&apos;t just a tool — it&apos;s a collaborator. The more you work with it, the better it understands your unique voice and career trajectory.</p>
            </div>
            <div className="ai-features reveal">
              <div className="ai-feature"><div className="ai-feature-icon">💾</div><div><div className="ai-feature-title">Remembers Your Craft</div><div className="ai-feature-desc">Retains your skills, specializations, dialect range, training, and credits across every session — so you never have to re-enter them.</div></div></div>
              <div className="ai-feature"><div className="ai-feature-icon">🎯</div><div><div className="ai-feature-title">Adapts to Your Voice</div><div className="ai-feature-desc">Learns how you describe your work and generates cover letters, bios, and descriptions that genuinely sound like you.</div></div></div>
              <div className="ai-feature"><div className="ai-feature-icon">💡</div><div><div className="ai-feature-title">Industry-Specific Suggestions</div><div className="ai-feature-desc">Nudges you toward credit language, skill formatting, and section ordering that casting directors in your discipline respond to.</div></div></div>
              <div className="ai-feature"><div className="ai-feature-icon">📈</div><div><div className="ai-feature-title">Personalized Career Insights</div><div className="ai-feature-desc">Over time, identifies patterns in your strongest credits, suggests resume versions for different submission types, and flags gaps to fill.</div></div></div>
            </div>
          </div>
        </section>

        {/* ORIGIN STORY */}
        <section id="origin" className="section-pad">
          <div className="container">
            <div className="origin-inner reveal">
              <div className="origin-heart">♥</div>
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Our Story</div>
              <h2 className="section-title">Made By Performers,<br />For Performers.</h2>
              <p className="origin-text">
                We know what it is like to spend hours formatting a resume that still does not look right.
                To wonder if your skills are being presented the way <strong>casting directors want to see them</strong>.
                To lose track of which version you sent to which theater.<br /><br />
                LimeLight was built by working performers who got tired of generic resume builders
                that did not understand our industry. Every feature, every template, every AI suggestion
                is designed with one goal — <strong>getting you into that audition room.</strong>
              </p>
              <div className="flex gap-3 justify-center flex-wrap mt-8">
                <span className="union-badge">Founding team: SAG-AFTRA Members</span>
                <span className="union-badge">AEA Members</span>
                <span className="union-badge">SDC Members</span>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow">Reviews</div>
              <h2 className="section-title">What Performers Are Saying.</h2>
            </div>
            <div className="testimonials-grid reveal">
              {[
                { text: 'I uploaded my old Word doc and within two minutes had a resume that looked like it belonged on Broadway. I got three callbacks the following week — one from a director who specifically commented on how clean and organized my credits were.', name: 'Maya Okonkwo', meta: 'Musical Theatre Actress · Chicago, IL', avatar: 'M', grad: 'linear-gradient(135deg,#F4694B,#F5B731)' },
                { text: 'The Skills Converter is wild. I needed a corporate resume for a temp gig between shows and it translated "20 years of ensemble performance" into actual leadership language that got me interviews. I didn\'t have to write a single word.', name: 'David Reinholt', meta: 'Actor / Director · Brooklyn, NY', avatar: 'D', grad: 'linear-gradient(135deg,#2DD4BF,#3B82F6)' },
                { text: 'As a voice artist, I\'ve always struggled to present my demo reel alongside my written resume. The QR code integration is genius — my VO reel is literally on every PDF now. Bookings went up noticeably in the first month.', name: 'Sofia Marchetti', meta: 'Voice Artist · Los Angeles, CA', avatar: 'S', grad: 'linear-gradient(135deg,#a855f7,#3B82F6)' },
                { text: 'The Resume Score told me exactly what was wrong with mine — I had been listing my training before my credits for years. Fixed it in five minutes and started getting more eyes on my Actors Access profile almost immediately.', name: 'Tomás Ferrara-Gibson', meta: 'Actor (Film / TV) · Atlanta, GA', avatar: 'T', grad: 'linear-gradient(135deg,#F5B731,#F4694B)' },
                { text: 'I\'m a choreographer and movement director — finding a resume format that handles both was a nightmare until LimeLight. The Contemporary template is exactly what I needed. Clean, modern, and gets noticed.', name: 'Amara Osei-Bonsu', meta: 'Choreographer / Dancer · New York, NY', avatar: 'A', grad: 'linear-gradient(135deg,#22c55e,#2DD4BF)' },
                { text: 'The analytics told me a regional theater MD had viewed my profile six times in one week. I reached out directly and landed a season contract. That information was worth ten times the subscription price.', name: 'Rachel Sundaram', meta: 'Singer / Actress · Boston, MA', avatar: 'R', grad: 'linear-gradient(135deg,#F4694B,#a855f7)' },
              ].map((t) => (
                <div key={t.name} className="testimonial-card">
                  <div className="testimonial-stars">★★★★★</div>
                  <div className="testimonial-quote-mark">&quot;</div>
                  <div className="testimonial-text">{t.text}</div>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" style={{ background: t.grad }}>{t.avatar}</div>
                    <div>
                      <div className="testimonial-stars">★★★★★</div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-meta">{t.meta}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMING SOON */}
        <section id="coming-soon" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow">What&apos;s Coming</div>
              <h2 className="section-title">We&apos;re Building More Than a Resume Tool —<br />We&apos;re Building a Community.</h2>
            </div>
            <div className="coming-grid reveal">
              <div className="coming-card"><div className="coming-badge">Coming Soon</div><div className="coming-icon">📋</div><div className="coming-title">Job Board Integration</div><div className="coming-desc">Audition listings from Actors Access, Backstage, Casting Networks, and Playbill — pulled directly to your LimeLight dashboard. Apply with one click using your saved resume.</div></div>
              <div className="coming-card"><div className="coming-badge">Coming Soon</div><div className="coming-icon">🔍</div><div className="coming-title">Performer Directory</div><div className="coming-desc">A searchable profile database where casting directors, directors, and producers can discover talent. Get found. Pro members get priority indexing and enhanced discovery profiles.</div></div>
              <div className="coming-card"><div className="coming-badge">Coming Soon</div><div className="coming-icon">📰</div><div className="coming-title">Audition Tips &amp; Blog</div><div className="coming-desc">Industry insights, audition prep advice, and career guidance from working professionals — casting directors, agents, directors, and performers who&apos;ve been in the room.</div></div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="section-pad">
          <div className="container">
            <div className="text-center reveal">
              <div className="section-eyebrow">Pricing</div>
              <h2 className="section-title">Simple Monthly Plans.</h2>
              <p className="section-sub" style={{ margin: '0 auto 48px' }}>No annual lock-in. No hidden fees. Cancel anytime with one click.</p>
            </div>
            <div className="pricing-grid reveal">
              <div className="pricing-card pricing-starter">
                <div className="pricing-tier">Starter</div>
                <div className="pricing-price"><span>$</span>2<span style={{ fontSize: '1.5rem' }}>.99</span></div>
                <div className="pricing-period">per month</div>
                <Link href="/onboarding?plan=starter" className="btn btn-coral w-full" style={{ justifyContent: 'center' }}>Start Free Trial</Link>
                <div className="pricing-trial"><strong>7-day free trial</strong>, then $2.99/month</div>
                <div className="pricing-divider"></div>
                <ul className="pricing-features">
                  <li><span className="check">✓</span> Up to <strong>3 resumes</strong></li>
                  <li><span className="check">✓</span> AI cover letters</li>
                  <li><span className="check">✓</span> Resume upload &amp; parse</li>
                  <li><span className="check">✓</span> PDF and Word export</li>
                  <li><span className="check">✓</span> 3 free templates</li>
                  <li><span className="check">✓</span> Resume score tool</li>
                  <li><span className="check">✓</span> YouTube/Vimeo clip links</li>
                </ul>
              </div>
              <div className="pricing-card pricing-pro">
                <div className="pricing-popular">⭐ Most Popular</div>
                <div className="pricing-tier" style={{ color: 'var(--teal)' }}>Professional</div>
                <div className="pricing-price" style={{ color: 'var(--teal)' }}><span>$</span>7<span style={{ fontSize: '1.5rem' }}>.99</span></div>
                <div className="pricing-period">per month</div>
                <Link href="/onboarding?plan=pro" className="btn btn-teal w-full" style={{ justifyContent: 'center' }}>Go Professional</Link>
                <div className="pricing-trial"><strong>7-day free trial</strong>, then $7.99/month</div>
                <div className="pricing-divider" style={{ background: 'rgba(45,212,191,0.15)' }}></div>
                <ul className="pricing-features">
                  <li><span className="check">✓</span> <strong>Unlimited resumes</strong></li>
                  <li><span className="check">✓</span> Humanized AI cover letters</li>
                  <li><span className="check">✓</span> All premium templates</li>
                  <li><span className="check">✓</span> Demo Reel QR Code on PDF</li>
                  <li><span className="check">✓</span> Resume analytics dashboard</li>
                  <li><span className="check">✓</span> Portfolio gallery</li>
                  <li><span className="check">✓</span> Public profile link</li>
                  <li><span className="check">✓</span> Skills converter</li>
                  <li><span className="check">✓</span> Performance Clip Vault (2–4 clips, 2:25 max)</li>
                  <li><span className="check">✓</span> Priority support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section-pad-sm">
          <div className="container">
            <div className="text-center reveal">
              <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', marginBottom: '40px' }}>Common Questions</h2>
            </div>
            <div className="faq-grid reveal">
              {[
                { q: 'Can I cancel anytime?', a: 'Yes — cancel with one click from your account settings. No questions asked, no cancellation fees, no guilt trips. You keep access until the end of your billing period.' },
                { q: 'What format does my resume export in?', a: 'Both PDF and Word (.docx) are included in every plan. PDFs include formatting locks and optional QR codes. Word exports are editable for any last-minute tweaks.' },
                { q: 'Do you support headshot uploads?', a: 'Yes — upload your headshot and it formats automatically to industry-standard placement and sizing. We support standard theatrical headshot dimensions and film/TV composite formats.' },
                { q: 'Can casting directors search for me?', a: 'With a Pro profile, yes. You get a public, shareable profile link and will be indexed in our upcoming Performer Directory — searchable by discipline, location, union, and specializations.' },
                { q: 'Is this really built by performers?', a: 'Yes. Our founding team are working SAG-AFTRA and AEA members. Every template was reviewed by working casting directors. Every feature started as a personal frustration.' },
                { q: 'What disciplines does LimeLight support?', a: 'All of them. Actors, musicians, voice artists, directors, choreographers, playwrights, sound designers, dancers, production designers, stage managers, and more. If you perform or create, we have a template for you.' },
              ].map((item) => (
                <div key={item.q} className="faq-item">
                  <div className="faq-q">{item.q} <span className="faq-arrow">♦</span></div>
                  <div className="faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="final-cta">
          <div className="final-cta-content">
            <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>The Stage Is Yours</div>
            <h2 className="final-cta-title display">Ready to Take the Stage?</h2>
            <p className="final-cta-sub">Join 8,000+ performers who have already stepped into the limelight.</p>
            <Link href="/onboarding" className="btn btn-coral" style={{ fontSize: '1.0625rem', padding: '18px 40px' }}>⚡ Build Your Resume Now</Link>
            <div style={{ marginTop: '20px', fontSize: '0.8rem', color: 'rgba(248,246,240,0.3)' }}>7-day free trial · No credit card required · Cancel anytime</div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <div>
              <a href="#" className="logo">
                <div className="logo-badge">⚡</div>
                <div className="logo-text"><span className="logo-lime">Lime</span><span className="logo-light">Light</span></div>
              </a>
              <p className="footer-brand-desc">The performing arts resume builder made by working performers. Get the audition. Step into the limelight.</p>
            </div>
            <div>
              <div className="footer-col-title">Product</div>
              <ul className="footer-links">
                <li><a href="#">Templates</a></li>
                <li><a href="#">Resume Builder</a></li>
                <li><a href="#">Resume Score</a></li>
                <li><a href="#">Clip Vault</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">For Performers</div>
              <ul className="footer-links">
                <li><a href="#">Actors</a></li>
                <li><a href="#">Musicians</a></li>
                <li><a href="#">Voice Artists</a></li>
                <li><a href="#">Dancers</a></li>
                <li><a href="#">Directors</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-legal">© 2026 LimeLight. Made with ♥ by working performers.</span>
            <span className="footer-legal">SAG-AFTRA · AEA · AGMA · AGVA · IATSE · SDC</span>
          </div>
        </footer>
      </div>

      {/* TEMPLATE MODAL */}
      {modal && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setModalType(null) }}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModalType(null)}>✕</button>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', marginBottom: '8px' }}>{modal.name}</h2>
            <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '20px' }}>{modal.desc}</p>
            <div style={{ background: 'var(--navy-light)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Included Features</div>
              {modal.features.map((f) => (
                <div key={f} style={{ fontSize: '0.875rem', color: 'var(--white-dim)', marginBottom: '6px' }}>✓ {f}</div>
              ))}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--white-dim)', marginBottom: '24px' }}><strong style={{ color: 'var(--white)' }}>Best for:</strong> {modal.bestFor}</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-coral" style={{ flex: 1 }} onClick={() => { setModalType(null); setView('dashboard') }}>Use This Template</button>
              <button className="btn btn-teal-outline btn-sm" onClick={() => setModalType(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ─── DASHBOARD COMPONENT ────────────────────────────────────────────────────
interface DashboardProps {
  activeTab: string
  setActiveTab: (t: string) => void
  setView: (v: 'landing' | 'dashboard') => void
  credits: CreditEntry[]
  addCredit: () => void
  updateCredit: (i: number, f: keyof CreditEntry, v: string) => void
  builderStep: number
  setBuilderStep: (n: number) => void
}

function Dashboard({ activeTab, setActiveTab, setView, credits, addCredit, updateCredit, builderStep, setBuilderStep }: DashboardProps) {
  return (
    <div id="dashboard" className="active">
      <nav className="dashboard-nav">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setView('landing') }} style={{ textDecoration: 'none' }}>
          <div className="logo-badge">⚡</div>
          <div className="logo-text"><span className="logo-lime">Lime</span><span className="logo-light">Light</span></div>
        </a>
        <div className="dashboard-tabs">
          {[
            { key: 'builder', label: '📝 Resume Builder' },
            { key: 'templates', label: '🎨 Templates' },
            { key: 'score', label: '📊 Resume Score' },
            { key: 'analytics', label: '📈 Analytics' },
            { key: 'clips', label: '🎬 Clip Vault' },
            { key: 'profile', label: '🔗 Public Profile' },
          ].map((tab) => (
            <button key={tab.key} className={`dash-tab${activeTab === tab.key ? ' active' : ''}`} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
          ))}
        </div>
        <div className="dash-user">
          <div className="dash-avatar">MH</div>
        </div>
      </nav>

      <div className="dashboard-body">

        {/* BUILDER PANEL */}
        <div className={`dash-panel${activeTab === 'builder' ? ' active' : ''}`}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', marginBottom: '8px' }}>Resume Builder</h2>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', marginBottom: '28px' }}>Follow each step to build your industry-standard performing arts resume.</p>
          <div className="builder-steps">
            {[{ n: 1, label: 'Basic Info' }, { n: 2, label: 'Credits' }, { n: 3, label: 'Training' }, { n: 4, label: 'Skills' }, { n: 5, label: 'Headshot' }, { n: 6, label: 'Export' }].map((s) => (
              <div key={s.n} className={`builder-step${builderStep === s.n ? ' active' : ''}${builderStep > s.n ? ' done' : ''}`} onClick={() => setBuilderStep(s.n)}>
                <div className="step-num">{builderStep > s.n ? '✓' : s.n}</div>
                <div className="step-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div id="builder-step-content">
            {builderStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.0625rem', marginBottom: '24px' }}>Basic Information</h3>
                <div className="builder-form">
                  {[
                    { label: 'Full Name (as it appears on your resume)', val: 'Margaret Hayes', placeholder: 'e.g. Margaret Hayes' },
                    { label: 'Email', val: 'margaret@margarethayes.com', placeholder: '', type: 'email' },
                    { label: 'Phone', val: '(212) 555-0194', placeholder: '' },
                    { label: 'Website / Portfolio', val: 'margarethayes.com', placeholder: '' },
                    { label: 'Location', val: 'New York, NY', placeholder: '' },
                    { label: 'Height', val: "5'6\"", placeholder: "e.g. 5'6\"" },
                    { label: 'Voice Type / Range', val: 'Soprano C4–Eb6', placeholder: 'e.g. Soprano C4–Eb6' },
                  ].map((f) => (
                    <div key={f.label} className="form-group">
                      <label className="form-label">{f.label}</label>
                      <input className="form-input" type={f.type || 'text'} defaultValue={f.val} placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label className="form-label">Primary Discipline</label>
                    <select className="form-select" defaultValue="Actor / Musical Theatre">
                      {['Actor / Musical Theatre','Actor / Straight','Film / TV Actor','Voice Artist','Dancer / Choreographer','Director','Playwright','Musician','Sound Designer'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group full">
                    <label className="form-label">Representation (Agent / Manager)</label>
                    <input className="form-input" defaultValue="Paradigm Talent Agency, NYC" placeholder="e.g. Agency name, city" />
                  </div>
                </div>
              </div>
            )}
            {builderStep === 2 && (
              <div>
                <div style={{ background: 'rgba(244,105,75,0.08)', border: '1px solid rgba(244,105,75,0.2)', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', fontSize: '0.8125rem', color: 'var(--white-dim)' }}>
                  💡 <strong style={{ color: 'var(--white)' }}>Industry Tip:</strong> List credits in reverse chronological order within each category. Broadway/major credits first, then regional, then community/student. Casting directors scan top-to-bottom.
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.0625rem' }}>Stage Credits</h3>
                  <button className="btn btn-coral btn-sm" onClick={addCredit}>+ Add Credit</button>
                </div>
                <div id="credits-list">
                  {credits.map((credit, i) => (
                    <div key={i} className="credit-entry" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginBottom: '12px' }}>
                      <div className="builder-form">
                        {(['role','production','venue','director'] as const).map((field) => (
                          <div key={field} className="form-group">
                            <label className="form-label">{field === 'role' ? 'Role / Title' : field === 'venue' ? 'Venue / Company' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input className="form-input" value={credit[field]} onChange={(e) => updateCredit(i, field, e.target.value)} placeholder={field === 'role' ? 'e.g. Christine' : ''} />
                          </div>
                        ))}
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select className="form-select" value={credit.category} onChange={(e) => updateCredit(i, 'category', e.target.value)}>
                            {['Broadway / Off-Broadway','National Tour','Regional Theatre','Film','Television','Voiceover','New Works','Opera','Dance'].map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Year</label>
                          <input className="form-input" value={credit.year} onChange={(e) => updateCredit(i, 'year', e.target.value)} placeholder="2024" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(45,212,191,0.06)', border: '1px solid rgba(45,212,191,0.15)', borderRadius: '10px', padding: '20px', marginTop: '24px' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--teal)' }}>✨ Union Affiliations</div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {['AEA Member','SAG-AFTRA Member','SAG-AFTRA Eligible','AGMA','Non-Union'].map((u, i) => (
                      <label key={u} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked={i === 0} style={{ accentColor: 'var(--teal)' }} /> {u}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {builderStep === 5 && (
              <div>
                <h3 style={{ fontSize: '1.0625rem', marginBottom: '8px' }}>Headshot Upload</h3>
                <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', marginBottom: '24px' }}>Automatically positioned to industry standard. Supports theatrical (8×10) and commercial formats.</p>
                <div className="headshot-upload">
                  <div className="headshot-icon">📸</div>
                  <div className="headshot-text">Click to upload your headshot</div>
                  <div className="headshot-hint">JPG or PNG · Recommended: 8×10 at 300 DPI · Max 10MB</div>
                  <div style={{ marginTop: '16px' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(244,105,75,0.12)', border: '1px solid rgba(244,105,75,0.2)', color: 'var(--coral-light)', padding: '4px 12px', borderRadius: '100px' }}>Industry Standard Placement: Auto ✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="builder-nav">
            <button className="btn btn-teal-outline" onClick={() => setView('landing')}>← Back to Home</button>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-teal-outline btn-sm">Save Draft</button>
              <button className="btn btn-coral" onClick={() => setBuilderStep(Math.min(builderStep + 1, 6))}>Next Step →</button>
            </div>
          </div>
        </div>

        {/* TEMPLATES PANEL */}
        <div className={`dash-panel${activeTab === 'templates' ? ' active' : ''}`}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', marginBottom: '8px' }}>Choose Your Template</h2>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', marginBottom: '28px' }}>Click any template to apply it to your resume instantly.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px' }}>
            {[
              { icon: '🎭', name: 'Broadway Classic', sub: 'Currently Applied ✓', subStyle: { color: 'var(--teal)' }, border: 'var(--coral)' },
              { icon: '🎬', name: 'Hollywood Modern', badge: '👑 PRO', border: 'var(--border)' },
              { icon: '📄', name: 'Industry Standard', sub: 'Universal Format', subStyle: { color: 'var(--white-dim)' }, border: 'var(--border)' },
              { icon: '✨', name: 'Contemporary', badge: '👑 PRO', border: 'var(--border)' },
              { icon: '🎙️', name: 'Voice Artist Pro', badge: '👑 PRO', border: 'var(--border)' },
              { icon: '💃', name: 'Dancer / Choreographer', badge: '👑 PRO', border: 'var(--border)' },
            ].map((t) => (
              <div key={t.name} style={{ background: 'var(--surface)', border: `2px solid ${t.border}`, borderRadius: '10px', padding: '16px', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{t.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</div>
                {t.badge && <div style={{ fontSize: '0.7rem', background: 'rgba(245,183,49,0.15)', color: 'var(--gold)', borderRadius: '100px', padding: '2px 8px', marginTop: '6px', display: 'inline-block' }}>{t.badge}</div>}
                {t.sub && <div style={{ fontSize: '0.75rem', marginTop: '4px', ...t.subStyle }}>{t.sub}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* SCORE PANEL */}
        <div className={`dash-panel${activeTab === 'score' ? ' active' : ''}`}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', marginBottom: '8px' }}>Resume Score</h2>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', marginBottom: '28px' }}>AI-powered scoring modeled on casting director expectations. Scores update live as you edit.</p>
          <div className="score-ring-wrap">
            <div className="score-ring"><span className="score-num">78</span></div>
            <div className="score-label">Your resume is <strong style={{ color: 'var(--teal)' }}>Strong</strong> — a few tweaks and you&apos;re audition-ready.</div>
          </div>
          <div className="score-breakdown">
            {[
              { label: 'Credit Presentation', val: 88, color: 'var(--teal)' },
              { label: 'Special Skills', val: 72, color: 'var(--gold)' },
              { label: 'Training Section', val: 65, color: 'var(--coral)' },
              { label: 'Contact Info', val: 95, color: 'var(--teal)' },
              { label: 'Formatting Consistency', val: 80, color: 'var(--teal)' },
              { label: 'AEA / Union Status', val: 100, color: 'var(--teal)' },
            ].map((s) => (
              <div key={s.label} className="score-item">
                <div className="score-item-label">{s.label}</div>
                <div className="score-bar-track"><div className="score-bar-fill" style={{ width: `${s.val}%`, background: s.color }}></div></div>
                <div className="score-item-val" style={{ color: s.color }}>{s.val} / 100</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(244,105,75,0.08)', border: '1px solid rgba(244,105,75,0.2)', borderRadius: '10px', padding: '20px', marginTop: '24px' }}>
            <div style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.9375rem' }}>💡 Top Suggestions to Improve Your Score:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--white-dim)' }}>
              <div>⚠️ <strong style={{ color: 'var(--white)' }}>Training section</strong> — Add your voice teacher&apos;s name and years of study. Casting directors want specifics, not just institutions.</div>
              <div>⚠️ <strong style={{ color: 'var(--white)' }}>Special Skills</strong> — Your dialect range is unlisted. Add specific accents (British RP, Southern US, etc.) to increase searchability.</div>
              <div>✅ <strong style={{ color: 'var(--teal)' }}>Credit order</strong> — Your Broadway credits are correctly leading each section.</div>
            </div>
          </div>
        </div>

        {/* ANALYTICS PANEL */}
        <div className={`dash-panel${activeTab === 'analytics' ? ' active' : ''}`}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', marginBottom: '8px' }}>Analytics Dashboard</h2>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', marginBottom: '28px' }}>Your resume activity over the last 30 days.</p>
          <div className="analytics-grid">
            {[
              { num: '247', label: 'Profile Views', delta: '↑ 34% this month', numStyle: { color: 'var(--teal)' }, deltaStyle: 'delta-up' },
              { num: '38', label: 'Resume Downloads', delta: '↑ 12% this month', numStyle: { color: 'var(--coral)' }, deltaStyle: 'delta-up' },
              { num: '14', label: 'Unique Viewers', delta: '↑ 8 new viewers', numStyle: { color: 'var(--gold)' }, deltaStyle: 'delta-up' },
              { num: '6', label: 'QR Scans', delta: '↑ Demo reel views', numStyle: { color: '#a855f7' }, deltaStyle: 'delta-up' },
            ].map((s) => (
              <div key={s.label} className="analytics-stat">
                <div className="analytics-stat-num" style={s.numStyle}>{s.num}</div>
                <div className="analytics-stat-label">{s.label}</div>
                <div className={`analytics-stat-delta ${s.deltaStyle}`}>{s.delta}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px' }}>Views This Month</div>
          <div className="fake-chart">
            {[
              { h: '40%', bg: 'var(--surface-light)' }, { h: '55%', bg: 'var(--surface-light)' }, { h: '35%', bg: 'var(--surface-light)' },
              { h: '70%', bg: 'var(--teal)', op: 0.6 }, { h: '45%', bg: 'var(--surface-light)' }, { h: '60%', bg: 'var(--surface-light)' },
              { h: '80%', bg: 'var(--teal)', op: 0.8 }, { h: '50%', bg: 'var(--surface-light)' }, { h: '90%', bg: 'var(--coral)', op: 0.9 },
              { h: '65%', bg: 'var(--surface-light)' }, { h: '75%', bg: 'var(--surface-light)' }, { h: '100%', bg: 'var(--coral)' },
            ].map((b, i) => (
              <div key={i} className="chart-bar" style={{ height: b.h, background: b.bg, opacity: b.op ?? 0.8 }}></div>
            ))}
          </div>
          <div style={{ background: 'rgba(245,183,49,0.08)', border: '1px solid rgba(245,183,49,0.2)', borderRadius: '10px', padding: '20px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>🔍 Recent Viewer Activity</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}><span style={{ color: 'var(--white-dim)' }}>Casting Director · New York, NY</span><span style={{ color: 'var(--gold)' }}>6 views · 2 days ago</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}><span style={{ color: 'var(--white-dim)' }}>Theatrical Agent · Los Angeles, CA</span><span style={{ color: 'var(--teal)' }}>3 views · 5 days ago</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: 'var(--white-dim)' }}>Theater Director · Chicago, IL</span><span style={{ color: 'var(--white-dim)' }}>1 view · 12 days ago</span></div>
            </div>
          </div>
        </div>

        {/* CLIPS PANEL */}
        <div className={`dash-panel${activeTab === 'clips' ? ' active' : ''}`}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', marginBottom: '8px' }}>Performance Clip Vault</h2>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', marginBottom: '8px' }}>Upload 2–4 performance clips (max 2:25 each, 100MB per clip) or embed YouTube/Vimeo links.</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--white-dim)' }}>Clips used:</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal)' }}>2 / 4</span>
            <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px', maxWidth: '120px' }}>
              <div style={{ width: '50%', height: '100%', background: 'var(--teal)', borderRadius: '2px' }}></div>
            </div>
          </div>
          <div className="clip-grid">
            <div className="clip-existing">
              <div className="clip-thumbnail">🎭<div className="clip-play-btn">▶</div></div>
              <div className="clip-info"><div className="clip-title">Chicago Revival — Audition Scene</div><div className="clip-meta"><span>Musical Theatre</span><span style={{ color: 'var(--teal)' }}>1:52 · MP4</span></div></div>
            </div>
            <div className="clip-existing">
              <div className="clip-thumbnail" style={{ background: 'linear-gradient(135deg,#0d2535,#162537)' }}>🎵<div className="clip-play-btn">▶</div></div>
              <div className="clip-info"><div className="clip-title">16-Bar Cut — Soprano Showcase</div><div className="clip-meta"><span>Musical Theatre</span><span style={{ color: 'var(--teal)' }}>2:10 · MP4</span></div></div>
            </div>
            <div className="clip-upload-card">
              <div className="clip-upload-icon">📤</div>
              <div className="clip-upload-text">Upload Performance Clip</div>
              <div className="clip-upload-hint">MP4 · MOV · WebM · Max 100MB</div>
              <div className="clip-max-badge">Max 2:25 per clip</div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '8px', textAlign: 'center' }}>🔗</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px', textAlign: 'center' }}>Embed YouTube / Vimeo</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--white-dim)', marginBottom: '12px', textAlign: 'center' }}>Paste your reel or clip link</div>
              <input className="form-input" placeholder="https://youtube.com/watch?v=..." />
              <button className="btn btn-teal-outline btn-sm w-full" style={{ marginTop: '12px' }}>Add Link</button>
            </div>
          </div>
        </div>

        {/* PROFILE PANEL */}
        <div className={`dash-panel${activeTab === 'profile' ? ' active' : ''}`}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', marginBottom: '8px' }}>Public Profile</h2>
          <p style={{ color: 'var(--white-dim)', fontSize: '0.875rem', marginBottom: '28px' }}>This is how casting directors and collaborators see you online.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Profile URL</label>
                <div className="profile-link">
                  <span className="profile-link-text">inthelimelights.com/margaret-hayes</span>
                  <CopyButton text="Copy" />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Profile Visibility</label>
                <select className="form-select" defaultValue="public">
                  <option value="public">Public — Searchable by casting directors</option>
                  <option value="private">Private — Link only</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Bio (shown on profile)</label>
                <textarea className="form-textarea" style={{ minHeight: '80px' }} defaultValue="AEA member based in New York City. Broadway, National Tours, and Regional Theatre. Soprano with a range of C4–Eb6. Available for leading roles and principal casting." />
              </div>
              <button className="btn btn-coral w-full">Save Profile Settings</button>
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--white-dim)', marginBottom: '12px' }}>Live Preview</div>
              <div className="profile-preview">
                <div className="profile-header">
                  <div className="profile-avatar">MH</div>
                  <div className="profile-name-display">Margaret Hayes</div>
                  <div className="profile-discipline">Actor / Musical Theatre · AEA</div>
                  <div className="profile-location">📍 New York, NY</div>
                </div>
                <div className="profile-body">
                  <div style={{ fontSize: '0.8125rem', color: 'var(--white-dim)', marginBottom: '16px' }}>AEA member based in New York City. Broadway, National Tours, and Regional Theatre. Soprano range C4–Eb6.</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span className="tag">Broadway</span><span className="tag">Musical Theatre</span><span className="tag">Soprano</span><span className="tag">AEA</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--white-dim)', marginBottom: '8px' }}>Performance Clips</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ flex: 1, background: 'var(--surface-light)', borderRadius: '6px', padding: '10px', fontSize: '0.7rem', textAlign: 'center', cursor: 'pointer' }}>▶ Chicago Scene</div>
                      <div style={{ flex: 1, background: 'var(--surface-light)', borderRadius: '6px', padding: '10px', fontSize: '0.7rem', textAlign: 'center', cursor: 'pointer' }}>▶ 16-Bar Cut</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState(text)
  return (
    <button className="profile-copy-btn" onClick={() => { setLabel('Copied!'); setTimeout(() => setLabel(text), 1500) }}>{label}</button>
  )
}
