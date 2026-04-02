'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoTitle, setVideoTitle] = useState('')
  const [videoMeta, setVideoMeta] = useState('')
  const [copyLabel, setCopyLabel] = useState('Copy')

  function openVideo(title: string, meta: string) {
    setVideoTitle(title)
    setVideoMeta(meta)
    setVideoOpen(true)
  }

  function copyUrl() {
    setCopyLabel('Copied!')
    setTimeout(() => setCopyLabel('Copy'), 1800)
  }

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <Link href="/" className="logo">
          <div className="logo-badge">⚡</div>
          <div className="logo-text"><span className="logo-lime">Lime</span><span className="logo-light">Light</span></div>
        </Link>
        <div className="topbar-actions">
          <Link href="/onboarding" className="btn btn-ghost">Log In</Link>
          <Link href="/onboarding" className="btn btn-coral">⚡ Build Your Resume</Link>
        </div>
      </div>

      {/* PROFILE BANNER */}
      <div className="profile-banner">
        <div className="banner-bg"></div>
        <div className="banner-content">
          <div className="profile-photo fade-in">
            <div className="photo-inner">MH</div>
            <div className="verified-badge">✓</div>
          </div>
          <div className="banner-info fade-in delay-1">
            <div className="profile-name">Margaret Hayes</div>
            <div className="profile-discipline">Actor · Singer · Musical Theatre</div>
            <div className="profile-meta">
              <span className="profile-meta-item">📍 New York, NY</span>
              <span className="profile-meta-item">🎵 Soprano C4–E♭6</span>
              <span className="profile-meta-item">📏 5&apos;6&quot;</span>
              <span className="profile-meta-item">👁 Brown / Green</span>
            </div>
            <div className="union-chips">
              <span className="union-chip">AEA</span>
              <span className="union-chip">SAG-AFTRA Eligible</span>
              <span className="union-chip">AGMA</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="page-body">

        {/* MAIN COLUMN */}
        <div className="main-col">

          {/* PERFORMANCE CLIPS */}
          <div className="section-card fade-in delay-1">
            <div className="card-title">🎬 Performance Clips <div className="card-title-line"></div></div>
            <div className="clips-grid">
              <div className="clip-card" onClick={() => openVideo('Chicago Revival — Audition Scene', 'Musical Theatre · 1:52')}>
                <div className="clip-thumb clip-thumb-1">
                  🎭
                  <div className="clip-play">
                    <div className="clip-play-btn">▶</div>
                    <div className="clip-duration">1:52</div>
                  </div>
                </div>
                <div className="clip-info">
                  <div className="clip-title">Chicago Revival — Audition Scene</div>
                  <div className="clip-tag">Musical Theatre</div>
                </div>
              </div>
              <div className="clip-card" onClick={() => openVideo('16-Bar Cut — Soprano Showcase', 'Vocal · 2:10')}>
                <div className="clip-thumb clip-thumb-2">
                  🎵
                  <div className="clip-play">
                    <div className="clip-play-btn">▶</div>
                    <div className="clip-duration">2:10</div>
                  </div>
                </div>
                <div className="clip-info">
                  <div className="clip-title">16-Bar Cut — Soprano Showcase</div>
                  <div className="clip-tag">Vocal</div>
                </div>
              </div>
            </div>
          </div>

          {/* STAGE CREDITS */}
          <div className="section-card fade-in delay-2">
            <div className="card-title">🎭 Stage Credits <div className="card-title-line"></div></div>

            <div className="credit-category">
              <div className="credit-cat-label">Broadway / Off-Broadway</div>
              {[
                { role: 'Roxie Hart', show: 'Chicago (Revival)', venue: 'Ambassador Theatre · Dir. Susan Stroman' },
                { role: 'Eliza Doolittle', show: 'My Fair Lady', venue: 'Lincoln Center Theater · Dir. Bartlett Sher' },
                { role: 'Sally Bowles', show: 'Cabaret', venue: 'Studio 54 · Dir. Sam Mendes' },
                { role: 'Éponine', show: 'Les Misérables', venue: 'Imperial Theatre · Cameron Mackintosh' },
              ].map((c) => (
                <div key={c.role} className="credit-row">
                  <div className="credit-role">{c.role}</div>
                  <div className="credit-show">{c.show}</div>
                  <div className="credit-venue">{c.venue}</div>
                </div>
              ))}
            </div>

            <div className="credit-category">
              <div className="credit-cat-label">National Tours</div>
              {[
                { role: 'Christine Daaé', show: 'Phantom of the Opera', venue: 'North American Tour · Principal' },
                { role: 'Galinda', show: 'Wicked', venue: 'National Tour · Dir. Joe Mantello' },
              ].map((c) => (
                <div key={c.role} className="credit-row">
                  <div className="credit-role">{c.role}</div>
                  <div className="credit-show">{c.show}</div>
                  <div className="credit-venue">{c.venue}</div>
                </div>
              ))}
            </div>

            <div className="credit-category">
              <div className="credit-cat-label">Regional Theatre (Selected)</div>
              {[
                { role: 'Fantine', show: 'Les Misérables', venue: 'Goodman Theatre Chicago' },
                { role: 'Nellie Forbush', show: 'South Pacific', venue: 'The Muny, St. Louis' },
                { role: 'Maria', show: 'The Sound of Music', venue: 'Paper Mill Playhouse' },
              ].map((c) => (
                <div key={c.role} className="credit-row">
                  <div className="credit-role">{c.role}</div>
                  <div className="credit-show">{c.show}</div>
                  <div className="credit-venue">{c.venue}</div>
                </div>
              ))}
            </div>
          </div>

          {/* TRAINING */}
          <div className="section-card fade-in delay-2">
            <div className="card-title">🎓 Training <div className="card-title-line"></div></div>
            {[
              { name: 'BFA Musical Theatre', detail: 'Carnegie Mellon University · Class of 2018' },
              { name: 'Voice — Private Study', detail: 'Anne Gross, 8 years ongoing' },
              { name: 'Shakespeare / Classical Text', detail: 'RADA Exchange Program, London · 2017' },
              { name: 'Meisner Technique', detail: 'William Esper Studio, NYC · 2019' },
              { name: 'Ballet / Jazz / Tap', detail: 'Pittsburgh Ballet Theatre School · 12 years' },
            ].map((t) => (
              <div key={t.name} className="training-item">
                <div className="training-name">{t.name}</div>
                <div className="training-detail">{t.detail}</div>
              </div>
            ))}
          </div>

          {/* SPECIAL SKILLS */}
          <div className="section-card fade-in delay-3">
            <div className="card-title">⭐ Special Skills <div className="card-title-line"></div></div>
            {[
              { label: 'Voice', tags: [{ t: 'Soprano C4–E♭6', h: true }, { t: 'Mezzo', h: true }, { t: 'Classical' }, { t: 'Belt' }, { t: 'Pop/Rock' }] },
              { label: 'Dance', tags: [{ t: 'Ballet' }, { t: 'Jazz' }, { t: 'Tap (advanced)' }, { t: 'Contemporary' }, { t: 'Ballroom' }] },
              { label: 'Dialects', tags: [{ t: 'British RP' }, { t: 'Cockney' }, { t: 'Irish' }, { t: 'Southern US' }, { t: 'French' }] },
              { label: 'Other', tags: [{ t: 'Stage Combat (SAFD Certified)' }, { t: 'Piano (intermediate)' }, { t: 'Horseback Riding' }, { t: 'Valid Passport' }] },
            ].map((g) => (
              <div key={g.label} className="skills-group">
                <div className="skills-group-label">{g.label}</div>
                <div className="skills-tags">
                  {g.tags.map((tag) => (
                    <span key={tag.t} className={`skill-tag${tag.h ? ' skill-tag-highlight' : ''}`}>{tag.t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* PORTFOLIO GALLERY */}
          <div className="section-card fade-in delay-3">
            <div className="card-title">📸 Production Gallery <div className="card-title-line"></div></div>
            <div className="gallery-grid">
              {[
                { cls: 'g1', emoji: '🎭' },
                { cls: 'g2', emoji: '🎵' },
                { cls: 'g3', emoji: '🎤' },
                { cls: 'g4', emoji: '💃' },
              ].map((g) => (
                <div key={g.cls} className="gallery-item">
                  <div className={`gallery-bg ${g.cls}`}>{g.emoji}</div>
                  <div className="gallery-overlay"><div className="gallery-zoom">🔍</div></div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="sidebar-col">

          {/* CONTACT */}
          <div className="sidebar-card fade-in delay-2">
            <div className="sidebar-title">Contact &amp; Connect</div>
            <div className="contact-actions">
              <button className="contact-btn contact-btn-primary">📧 Send Inquiry</button>
              <button className="contact-btn contact-btn-secondary">📄 Download Resume PDF</button>
              <button className="contact-btn contact-btn-ghost">🔗 Save to Casting List</button>
            </div>
          </div>

          {/* PROFILE STATS */}
          <div className="sidebar-card fade-in delay-2">
            <div className="sidebar-title">Profile Activity</div>
            <div className="stat-row"><span className="stat-label">Profile Views (30d)</span><span className="stat-val" style={{ color: 'var(--teal)' }}>247</span></div>
            <div className="stat-row"><span className="stat-label">Resume Downloads</span><span className="stat-val">38</span></div>
            <div className="stat-row"><span className="stat-label">Clip Plays</span><span className="stat-val" style={{ color: 'var(--gold)' }}>91</span></div>
            <div className="stat-row"><span className="stat-label">Last Active</span><span className="stat-val">Today</span></div>
          </div>

          {/* QR CODE */}
          <div className="sidebar-card fade-in delay-3">
            <div className="sidebar-title">Share This Profile</div>
            <div className="qr-block">
              <div className="qr-code">
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                  <rect width="84" height="84" fill="white"/>
                  <rect x="4" y="4" width="22" height="22" rx="2" fill="#111"/>
                  <rect x="7" y="7" width="16" height="16" rx="1" fill="white"/>
                  <rect x="10" y="10" width="10" height="10" rx="1" fill="#111"/>
                  <rect x="58" y="4" width="22" height="22" rx="2" fill="#111"/>
                  <rect x="61" y="7" width="16" height="16" rx="1" fill="white"/>
                  <rect x="64" y="10" width="10" height="10" rx="1" fill="#111"/>
                  <rect x="4" y="58" width="22" height="22" rx="2" fill="#111"/>
                  <rect x="7" y="61" width="16" height="16" rx="1" fill="white"/>
                  <rect x="10" y="64" width="10" height="10" rx="1" fill="#111"/>
                  <rect x="30" y="4" width="5" height="5" fill="#111"/>
                  <rect x="38" y="4" width="5" height="5" fill="#111"/>
                  <rect x="46" y="4" width="5" height="5" fill="#111"/>
                  <rect x="30" y="12" width="5" height="5" fill="#111"/>
                  <rect x="46" y="12" width="5" height="5" fill="#111"/>
                  <rect x="34" y="20" width="5" height="5" fill="#111"/>
                  <rect x="4" y="30" width="5" height="5" fill="#111"/>
                  <rect x="12" y="30" width="5" height="5" fill="#111"/>
                  <rect x="20" y="30" width="5" height="5" fill="#111"/>
                  <rect x="30" y="30" width="5" height="5" fill="#F4694B"/>
                  <rect x="38" y="30" width="5" height="5" fill="#111"/>
                  <rect x="46" y="30" width="5" height="5" fill="#111"/>
                  <rect x="54" y="30" width="5" height="5" fill="#111"/>
                  <rect x="62" y="30" width="5" height="5" fill="#111"/>
                  <rect x="70" y="30" width="5" height="5" fill="#111"/>
                  <rect x="78" y="30" width="5" height="5" fill="#111"/>
                  <rect x="4" y="38" width="5" height="5" fill="#111"/>
                  <rect x="20" y="38" width="5" height="5" fill="#111"/>
                  <rect x="34" y="38" width="5" height="5" fill="#111"/>
                  <rect x="46" y="38" width="5" height="5" fill="#111"/>
                  <rect x="62" y="38" width="5" height="5" fill="#111"/>
                  <rect x="78" y="38" width="5" height="5" fill="#111"/>
                  <rect x="4" y="46" width="5" height="5" fill="#111"/>
                  <rect x="12" y="46" width="5" height="5" fill="#111"/>
                  <rect x="30" y="46" width="5" height="5" fill="#111"/>
                  <rect x="38" y="46" width="5" height="5" fill="#111"/>
                  <rect x="54" y="46" width="5" height="5" fill="#111"/>
                  <rect x="70" y="46" width="5" height="5" fill="#111"/>
                  <rect x="30" y="54" width="5" height="5" fill="#111"/>
                  <rect x="46" y="54" width="5" height="5" fill="#111"/>
                  <rect x="62" y="54" width="5" height="5" fill="#111"/>
                  <rect x="78" y="54" width="5" height="5" fill="#111"/>
                  <rect x="34" y="62" width="5" height="5" fill="#111"/>
                  <rect x="42" y="62" width="5" height="5" fill="#111"/>
                  <rect x="54" y="62" width="5" height="5" fill="#111"/>
                  <rect x="70" y="62" width="5" height="5" fill="#111"/>
                  <rect x="30" y="70" width="5" height="5" fill="#111"/>
                  <rect x="46" y="70" width="5" height="5" fill="#111"/>
                  <rect x="62" y="70" width="5" height="5" fill="#111"/>
                  <rect x="78" y="70" width="5" height="5" fill="#111"/>
                </svg>
              </div>
              <div className="qr-label">Scan to view · inthelimelights.com/margaret-hayes</div>
              <div className="profile-share">
                <span className="profile-share-url">inthelimelights.com/margaret-hayes</span>
                <button className="copy-btn" onClick={copyUrl}>{copyLabel}</button>
              </div>
            </div>
          </div>

          {/* REPRESENTATION */}
          <div className="sidebar-card fade-in delay-3">
            <div className="sidebar-title">Representation</div>
            <div className="rep-item">
              <div className="rep-icon">🏢</div>
              <div>
                <div className="rep-name">Paradigm Talent Agency</div>
                <div className="rep-role">Theatrical Agent · New York</div>
              </div>
            </div>
            <div className="rep-item">
              <div className="rep-icon">👤</div>
              <div>
                <div className="rep-name">Authentic Talent + Literary</div>
                <div className="rep-role">Personal Manager</div>
              </div>
            </div>
          </div>

          {/* CREATE YOUR OWN */}
          <div style={{ background: 'linear-gradient(135deg,rgba(244,105,75,0.12),rgba(245,183,49,0.08))', border: '1px solid rgba(244,105,75,0.25)', borderRadius: '12px', padding: '22px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>Build Your Profile</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--white-dim)', marginBottom: '16px', lineHeight: 1.5 }}>Join 8,000+ performers with a professional LimeLight profile.</div>
            <Link href="/onboarding" className="btn btn-coral" style={{ width: '100%', justifyContent: 'center' }}>Start Free Trial</Link>
            <div style={{ fontSize: '0.72rem', color: 'rgba(248,246,240,0.35)', marginTop: '8px' }}>7 days free · No card required</div>
          </div>

        </div>

      </div>

      {/* POWERED BY */}
      <div className="powered-by">
        Profile powered by <Link href="/">LimeLight</Link> — The performing arts resume platform · <Link href="/onboarding">Create your free profile →</Link>
      </div>

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div className="video-modal open" onClick={(e) => { if (e.target === e.currentTarget) setVideoOpen(false) }}>
          <div className="video-box">
            <button className="video-close" onClick={() => setVideoOpen(false)}>✕</button>
            <div className="video-player">🎬</div>
            <div className="video-title">{videoTitle}</div>
            <div className="video-meta">{videoMeta}</div>
          </div>
        </div>
      )}
    </>
  )
}
