import React, { useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { addExpense } from '../api';

export default function AddExpense() {
  const [form, setForm] = useState({
    groupId: '', description: '', amount: '', paidBy: '', splits: ''
  });
  const [splitType, setSplitType] = useState<'equal'|'percentage'>('equal');
  const [msg, setMsg] = useState('');

  const handle = async () => {
    const { groupId, description, amount, paidBy, splits } = form;
    if (!groupId || !description) return setMsg('Group & description required');
    try {
      const splitObj: Record<number, number> = {};
      splits.split(',').forEach(p => {
        const [u,v] = p.split(':').map(x=>x.trim());
        splitObj[+u] = +v;
      });
      await addExpense(+groupId, {
        description,
        amount: +amount,
        paid_by: +paidBy,
        split_type: splitType,
        splits: splitObj
      });
      setMsg('✅ Expense added successfully!');
      setForm({ groupId:'', description:'', amount:'', paidBy:'', splits:'' });
    } catch {
      setMsg('❌ Failed to add expense');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Add an Expense</h2>

      {['groupId','description','amount','paidBy','splits'].map(key => (
        <input
          key={key}
          className="w-full px-3 py-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={
            key === 'splits' ?
              (splitType === 'equal'
                ? "UserID:amount,..." : "UserID:percentage,...")
              : key.charAt(0).toUpperCase() + key.slice(1)
          }
          value={(form as any)[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <div>
        <label className="mr-4">
          <input
            type="radio" name="splitType" value="equal"
            checked={splitType === 'equal'}
            onChange={() => setSplitType('equal')}
          /> Equal Split
        </label>
        <label>
          <input
            type="radio" name="splitType" value="percentage"
            checked={splitType === 'percentage'}
            onChange={() => setSplitType('percentage')}
          /> Percentage Split
        </label>
      </div>

      <button
        onClick={handle}
        className="flex items-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        <CurrencyDollarIcon className="w-5 h-5 mr-2" /> Add Expense
      </button>

      {msg && <p className="text-sm">{msg}</p>}
    </div>
  );
}
