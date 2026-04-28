import { useState } from 'react';
import { supabase } from '../supabaseClient';

// 物件新規登録モーダル
const PropertyModal = ({ user, onClose, onSuccess }) => {
  const [form, setForm] = useState({ name: '', price: '', area: '', layout: '' });
  const [loading, setLoading] = useState(false);

  // 入力値変更
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 物件追加
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('properties').insert([
      {
        name: form.name,
        price: Number(form.price),
        area: form.area,
        layout: form.layout,
        user_id: user.id,
      },
    ]);
    setLoading(false);
     if (error) {
     console.error(error);
     alert(error.message);
      return;
    }
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        padding: '36px 32px 28px 32px',
        minWidth: '340px',
        maxWidth: '90vw',
        textAlign: 'left',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer',
        }} aria-label="閉じる">×</button>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d1b4e', marginBottom: 24, textAlign: 'center' }}>物件新規登録</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, fontSize: '1rem', display: 'block', color: '#6b6375' }}>物件名</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e4e7', background: '#fafbfc', fontSize: '1rem', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, fontSize: '1rem', display: 'block', color: '#6b6375' }}>家賃（円）</label>
            <input
              name="price"
              type="text"
              inputMode="numeric"
              value={form.price}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e4e7', background: '#fafbfc', fontSize: '1rem', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, fontSize: '1rem', display: 'block', color: '#6b6375' }}>エリア</label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e4e7', background: '#fafbfc', fontSize: '1rem', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontWeight: 500, fontSize: '1rem', display: 'block', color: '#6b6375' }}>間取り</label>
            <input
              name="layout"
              value={form.layout}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e4e7', background: '#fafbfc', fontSize: '1rem', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{
            width: '100%', background: 'linear-gradient(90deg, #aa3bff 0%, #7b2ff2 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 0', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(170,59,255,0.08)', cursor: 'pointer', marginTop: '4px', transition: 'background 0.2s',
          }}>{loading ? '登録中...' : '登録する'}</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyModal;
