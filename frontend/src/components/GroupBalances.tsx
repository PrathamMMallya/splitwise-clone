import React, { useEffect, useState } from 'react';
import { getGroupBalances } from '../api';

export default function GroupBalances() {
  const [groupId, setGroupId] = useState('');
  const [balances, setBalances] = useState<Record<number, number>>({});
  const [msg, setMsg] = useState('');

  const fetch = async () => {
    if (!groupId) return;
    try {
      const data = await getGroupBalances(+groupId);
      setBalances(data);
      setMsg('');
    } catch {
      setMsg('❌ Error fetching balances');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Group Balances</h2>

      <input
        type="number"
        className="px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Group ID"
        value={groupId}
        onChange={e => setGroupId(e.target.value)}
      />

      <button
        onClick={fetch}
        className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
      >
        Show Balances
      </button>

      {msg && <p className="text-sm">{msg}</p>}
      {Object.keys(balances).length > 0 && (
        <div className="pt-4 border-t space-y-2">
          {Object.entries(balances).map(([uid, bal]) => (
            <div key={uid} className="flex justify-between">
              <span>User {uid}</span>
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
