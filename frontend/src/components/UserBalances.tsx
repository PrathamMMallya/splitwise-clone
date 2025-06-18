import React, { useEffect, useState } from 'react';
import { getUserBalances } from '../api';

export default function UserBalances() {
  const [userId, setUserId] = useState('');
  const [balances, setBalances] = useState<Record<number, number>>({});
  const [msg, setMsg] = useState('');

  const fetch = async () => {
    if (!userId) return;
    try {
      const data = await getUserBalances(+userId);
      setBalances(data);
      setMsg('');
    } catch {
      setMsg('❌ Error fetching user balances');
    }
  };

  useEffect(() => {
    if (userId) fetch();
  }, [userId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4 mt-6">
      <h2 className="text-xl font-semibold">User Balances</h2>

      <input
        type="number"
        className="px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Your User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />

      {msg && <p className="text-sm">{msg}</p>}
      {Object.keys(balances).length > 0 && (
        <div className="pt-4 border-t space-y-2">
          {Object.entries(balances).map(([gid, bal]) => (
            <div key={gid} className="flex justify-between">
              <span>Group {gid}</span>
              <span className={bal < 0 ? 'text-red-600' : 'text-green-600'}>
                {bal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
