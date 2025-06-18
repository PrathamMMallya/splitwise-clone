import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { createGroup } from '../api';

export default function CreateGroup() {
  const [name, setName] = useState('');
  const [userIds, setUserIds] = useState('1,2');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) return setMessage('Group name is required');
    const ids = userIds.split(',').map(s => +s.trim()).filter(n => n);
    if (ids.length < 1) return setMessage('At least one user id required');

    try {
      await createGroup(name, ids);
      setMessage('✅ Group created successfully!');
      setName(''); setUserIds('');
    } catch {
      setMessage('❌ Failed to create group');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold">Create a New Group</h2>

      <input
        className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Group name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="User IDs (comma-separated)"
        value={userIds}
        onChange={e => setUserIds(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="flex items-center justify-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Group
      </button>

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
