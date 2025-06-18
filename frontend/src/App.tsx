import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import CreateGroup from './components/CreateGroup';
import AddExpense from './components/AddExpense';
import GroupBalances from './components/GroupBalances';
import UserBalances from './components/UserBalances';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">💸 Splitwise Pro</h1>
          <div className="space-x-6">
            {['/','/add','/balances','/user'].map(path => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-indigo-600 ${isActive ? 'font-semibold' : ''}`
                }
              >
                {path === '/' ? 'Create Group' :
                 path === '/add' ? 'Add Expense' :
                 path === '/balances' ? 'Group Balances' :
                 'User Balances'}
              </NavLink>
            ))}
          </div>
        </nav>
        <main className="p-6 max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<CreateGroup />} />
            <Route path="/add" element={<AddExpense />} />
            <Route path="/balances" element={<GroupBalances />} />
            <Route path="/user" element={<UserBalances />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
