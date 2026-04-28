import { useState } from 'react'
import { supabase } from './supabaseClient'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        const detail = `ログイン失敗: ${error.message} (status: ${error.status ?? 'n/a'})`
        setMessage(detail)
        alert(detail)
        console.error('signIn error', error)
        return
      }
      window.location.reload()
    } catch (e) {
      const detail = `例外発生: ${e?.message ?? e}`
      setMessage(detail)
      alert(detail)
      console.error(e)
    }
  }

  const handleSignup = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        const detail = `登録失敗: ${error.message} (status: ${error.status ?? 'n/a'})`
        setMessage(detail)
        alert(detail)
        console.error('signUp error', error)
        return
      }
      setMessage('登録成功！確認メールをご確認ください')
    } catch (e) {
      const detail = `例外発生: ${e?.message ?? e}`
      setMessage(detail)
      alert(detail)
      console.error(e)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f6fa',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '40px 32px 32px 32px',
        minWidth: '340px',
        maxWidth: '90vw',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: '8px',
          color: '#2d1b4e',
        }}>不動産管理アプリ</h1>
        <h2 style={{
          fontSize: '1.3rem',
          fontWeight: 500,
          marginBottom: '32px',
          color: '#2d1b4e',
        }}>{isSignUp ? '会員登録' : 'ログイン'}</h2>
        <form onSubmit={e => { e.preventDefault(); isSignUp ? handleSignup() : handleLogin(); }}>
          <div style={{ marginBottom: '18px', textAlign: 'left' }}>
            <label style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '6px', display: 'block', color: '#6b6375' }}>メールアドレス</label>
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e5e4e7',
                background: '#fafbfc',
                fontSize: '1rem',
                marginTop: '4px',
                marginBottom: '2px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '6px', display: 'block', color: '#6b6375' }}>パスワード</label>
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e5e4e7',
                background: '#fafbfc',
                fontSize: '1rem',
                marginTop: '4px',
                marginBottom: '2px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            background: 'linear-gradient(90deg, #aa3bff 0%, #7b2ff2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 0',
            fontWeight: 600,
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(170,59,255,0.08)',
            cursor: 'pointer',
            marginBottom: '12px',
            marginTop: '4px',
            transition: 'background 0.2s',
          }}>{isSignUp ? '登録' : 'ログイン'}</button>
        </form>
        <div style={{ marginTop: '8px', marginBottom: '8px' }}>
          {isSignUp ? (
            <>
              <span style={{ color: '#6b6375', fontSize: '0.98rem' }}>すでにアカウントをお持ちの方は</span>
              <button
                onClick={() => { setIsSignUp(false); setMessage(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7b2ff2',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  marginLeft: '4px',
                }}
              >ログイン</button>
            </>
          ) : (
            <>
              <span style={{ color: '#6b6375', fontSize: '0.98rem' }}>アカウントをお持ちでない方は</span>
              <button
                onClick={() => { setIsSignUp(true); setMessage(''); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7b2ff2',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  marginLeft: '4px',
                }}
              >会員登録</button>
            </>
          )}
        </div>
        <div style={{ color: '#e74c3c', minHeight: '1.5em' }}>{message}</div>
      </div>
    </div>
  )
}

export default Login