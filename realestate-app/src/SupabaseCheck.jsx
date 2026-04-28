// Supabase接続確認用の簡単なテストコンポーネント
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const SupabaseCheck = () => {
  const [status, setStatus] = useState('確認中...');

  useEffect(() => {
    // テーブルがなくても動作確認できるよう、認証APIを呼ぶ
    supabase.auth.getSession()
      .then(({ error }) => {
        if (error) setStatus('接続エラー: ' + error.message);
        else setStatus('Supabase接続成功');
      });
  }, []);

  return <div>{status}</div>;
};

export default SupabaseCheck;
