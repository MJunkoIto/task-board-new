import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login'
import PropertyList from './components/PropertyList'
import PropertyModal from './components/PropertyModal'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [properties, setProperties] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const fetchProperties = useCallback(async (uid) => {
    if (!uid) return

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setProperties(data ?? [])
  }, [])

  useEffect(() => {
    if (!user?.id) return

    const timer = setTimeout(() => {
      fetchProperties(user.id)
    }, 0)

    return () => clearTimeout(timer)
  }, [user, fetchProperties])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleModalSuccess = async () => {
    await fetchProperties(user.id)
    setShowModal(false)
  }

  if (!user) {
    return <Login />
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f6fa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          padding: '32px 24px 24px 24px',
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#2d1b4e',
              margin: 0,
            }}
          >
            物件一覧
          </h1>

          <button
            onClick={handleLogout}
            style={{
              background: 'linear-gradient(90deg, #aa3bff 0%, #7b2ff2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(170,59,255,0.08)',
              cursor: 'pointer',
              marginLeft: 12,
              transition: 'background 0.2s',
            }}
          >
            ログアウト
          </button>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #aa3bff 0%, #7b2ff2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 0',
            fontWeight: 600,
            fontSize: '1.05rem',
            boxShadow: '0 2px 8px rgba(170,59,255,0.08)',
            cursor: 'pointer',
            marginBottom: 24,
            marginTop: 0,
            transition: 'background 0.2s',
          }}
        >
          ＋新規登録
        </button>

        <PropertyList properties={properties} />

        {showModal && (
          <PropertyModal
            user={user}
            onClose={() => setShowModal(false)}
            onSuccess={handleModalSuccess}
          />
        )}
      </div>
    </div>
  )
}

export default App