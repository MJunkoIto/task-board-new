import { useEffect, useState } from 'react'
import './App.css'

const LANGUAGES = [
  { code: 'en', flag: '🇺🇸', label: '英語' },
  { code: 'es', flag: '🇪🇸', label: 'スペイン語' },
  { code: 'pt', flag: '🇧🇷', label: 'ポルトガル語' },
  { code: 'th', flag: '🇹🇭', label: 'タイ語' },
  { code: 'zh', flag: '🇨🇳', label: '中国語' },
]

const RECENT_LOGS = [
  {
    id: 1,
    title: '仕事が忙しかった日',
    flag: '🇪🇸',
    label: 'スペイン語',
    date: '2024/05/07',
  },
  {
    id: 2,
    title: '友達とカフェに行った話',
    flag: '🇺🇸',
    label: '英語',
    date: '2024/05/06',
  },
]

const DUMMY_JA =
  '今日は仕事がとても忙しくて疲れました。でも終わって安心しました。'

const DUMMY_TRANSLATION =
  'Hoy tuve mucho trabajo y estaba muy cansada. Pero me sentí aliviada porque terminé todo bien.'

const DUMMY_SCORES = {
  total: 85,
  details: [
    { label: '発音', value: 82 },
    { label: '流暢さ', value: 85 },
    { label: 'リズム', value: 83 },
    { label: '再現度', value: 90 },
  ],
  comment:
    'とてもよくできています！\n後半の区切りを少し意識すると、さらに自然になりますよ。',
}

/* =========================
 * Icons & illustrations
 * ========================= */

function PersonAvatar({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="32" fill="#FCE7EB" />
      <path d="M16 30c0-10 7-18 16-18s16 8 16 18v6H16v-6z" fill="#3A3A3A" />
      <ellipse cx="32" cy="34" rx="11" ry="12" fill="#F7D7C4" />
      <circle cx="32" cy="14" r="5" fill="#3A3A3A" />
      <circle cx="25" cy="38" r="1.6" fill="#F2A6A0" opacity="0.7" />
      <circle cx="39" cy="38" r="1.6" fill="#F2A6A0" opacity="0.7" />
      <circle cx="27" cy="34" r="1" fill="#2C2C2C" />
      <circle cx="37" cy="34" r="1" fill="#2C2C2C" />
      <path
        d="M28 40 Q32 43 36 40"
        stroke="#2C2C2C"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M14 60c2-8 9-12 18-12s16 4 18 12H14z" fill="#A8D5A2" />
    </svg>
  )
}

function PersonIllustration() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 110c8-2 14-8 18-16-10 0-18 6-18 16z" fill="#A8D5A2" opacity="0.7" />
      <path d="M22 124c10 0 18-6 22-14-12-2-22 4-22 14z" fill="#A8D5A2" opacity="0.5" />
      <circle cx="120" cy="40" r="18" fill="#FFFFFF" stroke="#E8F5E9" strokeWidth="2" />
      <circle cx="113" cy="40" r="2" fill="#7FBF72" />
      <circle cx="120" cy="40" r="2" fill="#7FBF72" />
      <circle cx="127" cy="40" r="2" fill="#7FBF72" />
      <path d="M108 50 L104 58 L114 52 Z" fill="#FFFFFF" />
      <path d="M40 150 Q60 100 80 102 Q108 104 120 150 Z" fill="#A8D5A2" />
      <path d="M65 150 L70 130 L80 132 L78 150 Z" fill="#3A3A3A" opacity="0.85" />
      <path d="M88 150 L92 132 L102 132 L100 150 Z" fill="#3A3A3A" opacity="0.85" />
      <ellipse cx="86" cy="74" rx="18" ry="20" fill="#F7D7C4" />
      <path
        d="M68 70c0-14 8-22 18-22s18 8 18 22c0 4-2 6-4 6-2-10-10-14-14-14s-12 4-14 14c-2 0-4-2-4-6z"
        fill="#3A3A3A"
      />
      <circle cx="86" cy="50" r="6" fill="#3A3A3A" />
      <circle cx="80" cy="74" r="1.2" fill="#2C2C2C" />
      <circle cx="92" cy="74" r="1.2" fill="#2C2C2C" />
      <circle cx="76" cy="80" r="1.6" fill="#F2A6A0" opacity="0.7" />
      <circle cx="96" cy="80" r="1.6" fill="#F2A6A0" opacity="0.7" />
      <path
        d="M82 82 Q86 85 90 82"
        stroke="#2C2C2C"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="100" y="92" width="14" height="22" rx="3" fill="#3A3A3A" />
      <rect x="102" y="94" width="10" height="16" rx="1.5" fill="#E8F5E9" />
      <path d="M96 96 Q104 90 112 96 L112 104 Q104 100 98 104 Z" fill="#A8D5A2" />
    </svg>
  )
}

function CelebrationIllustration() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* sparkles */}
      <g fill="#F7C84B">
        <path d="M32 30 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z" />
        <path d="M138 22 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z" />
        <path d="M140 70 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2z" />
      </g>
      {/* body */}
      <path d="M40 150 Q60 100 80 102 Q108 104 120 150 Z" fill="#A8D5A2" />
      <ellipse cx="80" cy="74" rx="20" ry="22" fill="#F7D7C4" />
      <path
        d="M60 68c0-14 8-24 20-24s20 10 20 24c0 4-2 6-4 6-2-10-10-14-16-14s-14 4-16 14c-2 0-4-2-4-6z"
        fill="#3A3A3A"
      />
      <circle cx="80" cy="46" r="6" fill="#3A3A3A" />
      <path d="M72 76 Q74 74 76 76" stroke="#2C2C2C" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M84 76 Q86 74 88 76" stroke="#2C2C2C" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="82" r="2" fill="#F2A6A0" opacity="0.7" />
      <circle cx="90" cy="82" r="2" fill="#F2A6A0" opacity="0.7" />
      <path
        d="M75 86 Q80 90 85 86"
        stroke="#2C2C2C"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* hands clasped */}
      <ellipse cx="80" cy="118" rx="14" ry="8" fill="#F7D7C4" />
    </svg>
  )
}

function MicIcon({ size = 36, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="12" rx="3" fill={color} />
      <path d="M5 11a7 7 0 0 0 14 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="#7FBF72" strokeWidth="1.6" />
      <path
        d="M19.4 12c0-.5 0-1-.1-1.5l2-1.6-2-3.4-2.4.9c-.8-.6-1.6-1.1-2.5-1.4L14 2h-4l-.4 2.5c-.9.3-1.7.8-2.5 1.4l-2.4-.9-2 3.4 2 1.6c-.1.5-.1 1-.1 1.5s0 1 .1 1.5l-2 1.6 2 3.4 2.4-.9c.8.6 1.6 1.1 2.5 1.4L10 22h4l.4-2.5c.9-.3 1.7-.8 2.5-1.4l2.4.9 2-3.4-2-1.6c.1-.5.1-1 .1-1.5z"
        stroke="#7FBF72"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="#233333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#7FBF72" />
      <path d="M7.5 12.5l3 3 6-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="#777777" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PlayIcon({ color = '#FFFFFF' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 5l12 7-12 7V5z" fill={color} />
    </svg>
  )
}

/* =========================
 * Reusable bits
 * ========================= */

function PageHeader({ title, onBack }) {
  return (
    <header className="page-header">
      <button className="icon-btn back-btn" onClick={onBack} aria-label="戻る">
        <BackIcon />
      </button>
      <h2 className="page-title">{title}</h2>
      <span className="page-header-spacer" />
    </header>
  )
}

function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button className="primary-btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

function SecondaryButton({ children, onClick }) {
  return (
    <button className="secondary-btn" onClick={onClick}>
      {children}
    </button>
  )
}

function ListenChip({ label = 'お手本を聞く', onClick }) {
  return (
    <button className="listen-chip" onClick={onClick}>
      <span className="listen-chip-play">
        <PlayIcon />
      </span>
      {label}
    </button>
  )
}

function Waveform() {
  // 30 animated bars for a soft waveform feel
  const bars = Array.from({ length: 30 })
  return (
    <div className="waveform" aria-hidden="true">
      {bars.map((_, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{ animationDelay: `${(i % 10) * 0.08}s` }}
        />
      ))}
    </div>
  )
}

function formatTime(s) {
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

/* =========================
 * Screens
 * ========================= */

function HomeScreen({ selectedLang, onOpenPicker, onStartRecording }) {
  return (
    <>
      <header className="header">
        <h1 className="brand">TalkLog</h1>
        <button className="icon-btn" aria-label="設定">
          <GearIcon />
        </button>
      </header>

      <button className="lang-pill" onClick={onOpenPicker} aria-haspopup="dialog">
        <span className="flag">🇯🇵</span>
        <span className="arrow">→</span>
        <span className="flag">{selectedLang.flag}</span>
        <span className="caret">▼</span>
      </button>

      <section className="streak-card">
        <div className="streak-text">
          <p className="streak-title">
            <span className="fire">🔥</span> 5日連続！
          </p>
          <p className="streak-sub">よく続けていますね！</p>
        </div>
        <div className="streak-avatar">
          <PersonAvatar size={56} />
        </div>
      </section>

      <section className="today-card">
        <div className="today-top">
          <div>
            <h2 className="today-title">今日の一言</h2>
            <p className="today-sub">
              1分で今日の出来事を
              <br />
              話してみましょう
            </p>
          </div>
          <div className="today-illust">
            <PersonIllustration />
          </div>
        </div>

        <div className="mic-wrap">
          <button className="mic-btn" onClick={onStartRecording} aria-label="録音を開始">
            <MicIcon size={36} />
          </button>
          <p className="mic-hint">タップして話す（最大1分）</p>
        </div>
      </section>

      <section className="recent">
        <div className="recent-head">
          <h3 className="recent-title">最近の記録</h3>
          <button className="see-all">
            すべて見る <ChevronRight />
          </button>
        </div>

        <ul className="log-list">
          {RECENT_LOGS.map((log) => (
            <li key={log.id} className="log-item">
              <div className="log-avatar">
                <PersonAvatar size={44} />
              </div>
              <div className="log-body">
                <p className="log-title">{log.title}</p>
                <p className="log-meta">
                  <span className="log-flag">{log.flag}</span>
                  <span className="log-lang">{log.label}</span>
                </p>
              </div>
              <span className="log-date">{log.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function RecordingScreen({ onBack, onNext }) {
  const [isRecording, setIsRecording] = useState(true)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isRecording) return
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s >= 60) {
          setIsRecording(false)
          return 60
        }
        return s + 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isRecording])

  const handleStop = () => setIsRecording(false)

  return (
    <div className="page">
      <PageHeader title="録音中" onBack={onBack} />

      <div className="recording-body">
        <p className="recording-hint">日本語で自由に話してください</p>
        <p className="recording-timer">{formatTime(seconds)}</p>

        <Waveform />

        <button
          className={`mic-btn large ${isRecording ? 'recording' : ''}`}
          onClick={handleStop}
          disabled={!isRecording}
          aria-label={isRecording ? '録音停止' : '録音停止済み'}
        >
          {isRecording ? <span className="stop-square" /> : <MicIcon size={36} />}
        </button>

        <p className="mic-hint">{isRecording ? '最大1分' : '録音が終了しました'}</p>
      </div>

      {!isRecording && (
        <div className="page-footer">
          <PrimaryButton onClick={onNext}>次へ</PrimaryButton>
        </div>
      )}
    </div>
  )
}

function ConvertResultScreen({ selectedLang, onBack, onNext }) {
  return (
    <div className="page">
      <PageHeader title="変換結果" onBack={onBack} />

      <div className="page-body">
        <div className="result-block">
          <p className="result-label">あなたの日本語</p>
          <div className="result-card pink">
            <p className="result-text">{DUMMY_JA}</p>
          </div>
        </div>

        <div className="result-block">
          <p className="result-label">スペイン語</p>
          <div className="result-card pink">
            <p className="result-text">{DUMMY_TRANSLATION}</p>
          </div>
          <ListenChip label="お手本を聞く" />
        </div>
      </div>

      <div className="page-footer">
        <PrimaryButton onClick={onNext}>次へ</PrimaryButton>
      </div>
    </div>
  )
}

function PracticeScreen({ onBack, onNext }) {
  const [practiceState, setPracticeState] = useState('idle')
  // 'idle' | 'recording' | 'done'

  const handleMic = () => {
    if (practiceState === 'idle') {
      setPracticeState('recording')
    } else if (practiceState === 'recording') {
      setPracticeState('done')
    }
  }

  const handleRetry = () => setPracticeState('idle')

  return (
    <div className="page">
      <PageHeader title="発話練習" onBack={onBack} />

      <div className="page-body practice-body">
        <p className="practice-hint">
          お手本を聞いて、真似して
          <br />
          話してみましょう
        </p>

        <div className="result-card pink">
          <p className="result-text">{DUMMY_TRANSLATION}</p>
        </div>

        <ListenChip label="お手本を聞く" />

        <div className="mic-wrap">
          <button
            className={`mic-btn ${practiceState === 'recording' ? 'recording' : ''}`}
            onClick={handleMic}
            aria-label={practiceState === 'recording' ? '録音停止' : '録音開始'}
          >
            {practiceState === 'recording' ? (
              <span className="stop-square" />
            ) : (
              <MicIcon size={36} />
            )}
          </button>
          <p className="mic-hint">
            {practiceState === 'idle' && 'タップして録音'}
            {practiceState === 'recording' && '録音中…（タップで停止）'}
            {practiceState === 'done' && '録音が終了しました'}
          </p>
        </div>
      </div>

      <div className="page-footer footer-stack">
        {practiceState === 'done' && (
          <PrimaryButton onClick={onNext}>評価へ進む</PrimaryButton>
        )}
        <SecondaryButton onClick={handleRetry}>再録音する</SecondaryButton>
      </div>
    </div>
  )
}

function ScoreCircle({ value }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)
  return (
    <div className="score-circle-wrap">
      <svg width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="#E8F5E9" strokeWidth="10" />
        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="none"
          stroke="#7FBF72"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />
      </svg>
      <div className="score-circle-text">
        <span className="score-num">{value}</span>
        <span className="score-denom">/100</span>
      </div>
    </div>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div className="score-row">
      <span className="score-row-label">{label}</span>
      <div className="score-row-track">
        <div className="score-row-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="score-row-value">{value}</span>
    </div>
  )
}

function EvaluationScreen({ onBack, onSave }) {
  return (
    <div className="page">
      <PageHeader title="評価結果" onBack={onBack} />

      <div className="page-body">
        <div className="score-top">
          <div className="score-top-left">
            <ScoreCircle value={DUMMY_SCORES.total} />
            <p className="great-text">Great!</p>
          </div>
          <div className="score-top-illust">
            <CelebrationIllustration />
          </div>
        </div>

        <div className="score-list">
          {DUMMY_SCORES.details.map((d) => (
            <ScoreBar key={d.label} label={d.label} value={d.value} />
          ))}
        </div>

        <div className="comment-card">
          <p className="comment-title">コメント</p>
          <p className="comment-text">{DUMMY_SCORES.comment}</p>
        </div>
      </div>

      <div className="page-footer">
        <PrimaryButton onClick={onSave}>保存する</PrimaryButton>
      </div>
    </div>
  )
}

/* =========================
 * App root
 * ========================= */

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0])
  const [isPickerOpen, setPickerOpen] = useState(false)

  const goTo = (screen) => setCurrentScreen(screen)

  return (
    <div className="app">
      <div className="phone">
        {currentScreen === 'home' && (
          <HomeScreen
            selectedLang={selectedLang}
            onOpenPicker={() => setPickerOpen(true)}
            onStartRecording={() => goTo('recording')}
          />
        )}

        {currentScreen === 'recording' && (
          <RecordingScreen
            onBack={() => goTo('home')}
            onNext={() => goTo('convertResult')}
          />
        )}

        {currentScreen === 'convertResult' && (
          <ConvertResultScreen
            selectedLang={selectedLang}
            onBack={() => goTo('recording')}
            onNext={() => goTo('practice')}
          />
        )}

        {currentScreen === 'practice' && (
          <PracticeScreen
            onBack={() => goTo('convertResult')}
            onNext={() => goTo('evaluation')}
          />
        )}

        {currentScreen === 'evaluation' && (
          <EvaluationScreen
            onBack={() => goTo('practice')}
            onSave={() => goTo('home')}
          />
        )}
      </div>

      {isPickerOpen && (
        <div
          className="sheet-backdrop"
          onClick={() => setPickerOpen(false)}
          role="presentation"
        >
          <div
            className="sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="言語を選択"
          >
            <div className="sheet-head">
              <h3 className="sheet-title">言語を選択</h3>
              <button
                className="icon-btn"
                aria-label="閉じる"
                onClick={() => setPickerOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <ul className="lang-list">
              {LANGUAGES.map((lang) => {
                const active = lang.code === selectedLang.code
                return (
                  <li key={lang.code}>
                    <button
                      className={`lang-row ${active ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLang(lang)
                        setPickerOpen(false)
                      }}
                    >
                      <span className="flag">🇯🇵</span>
                      <span className="arrow">→</span>
                      <span className="flag">{lang.flag}</span>
                      <span className="lang-label">{lang.label}</span>
                      <span className="check-slot">{active && <CheckIcon />}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
