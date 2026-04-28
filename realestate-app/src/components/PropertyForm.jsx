import { useState } from 'react';
import { supabase } from '../supabaseClient';

// 物件新規登録フォーム
const PropertyForm = ({ user, onAdd }) => {
  const [form, setForm] = useState({ name: '', rent: '', area: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // 入力値変更
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 物件追加
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const { data, error } = await supabase.from('properties').insert([
      {
        name: form.name,
        price: Number(form.rent), 
        area: form.area,
        user_id: user.id,
      },
    ]).select();
    setLoading(false);
    if (error) {
      setMsg('登録失敗: ' + error.message);
    } else {
      setMsg('登録成功！');
      setForm({ name: '', rent: '', area: '' });
      if (onAdd && data && data[0]) onAdd(data[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(170,59,255,0.04)',
      padding: '24px 18px',
      marginBottom: 24,
      maxWidth: 400,
      margin: '0 auto 24px auto',
      textAlign: 'left',
    }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2d1b4e', margin: '0 0 18px 0', textAlign: 'center' }}>物件を追加</h2>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 500, fontSize: '1rem', display: 'block', color: '#6b6375' }}>物件名</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e4e7', background: '#fafbfc', fontSize: '1rem', marginTop: '4px', boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontWeight: 500, fontSize: '1rem', display: 'block', color: '#6b6375' }}>家賃（円）</label>
        <input
          name="rent"
          type="number"
          value={form.rent}
          onChange={handleChange}
          required
          style={{
            width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e4e7', background: '#fafbfc', fontSize: '1rem', marginTop: '4px', boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 500, fontSize: '1rem', display: 'block', color: '#6b6375' }}>エリア</label>
        <input
          name="area"
          value={form.area}
          onChange={handleChange}
          required
          style={{
            width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e4e7', background: '#fafbfc', fontSize: '1rem', marginTop: '4px', boxSizing: 'border-box',
          }}
        />
      </div>
      <button type="submit" disabled={loading} style={{
        width: '100%', background: 'linear-gradient(90deg, #aa3bff 0%, #7b2ff2 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 0', fontWeight: 600, fontSize: '1.05rem', boxShadow: '0 2px 8px rgba(170,59,255,0.08)', cursor: 'pointer', marginTop: '4px', transition: 'background 0.2s',
      }}>
        {loading ? '登録中...' : '追加'}
      </button>
      <div style={{ color: msg.startsWith('登録成功') ? '#2d1b4e' : '#e74c3c', minHeight: '1.5em', marginTop: 8, textAlign: 'center' }}>{msg}</div>
    </form>
  );
};

export default PropertyForm;
