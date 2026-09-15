import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import api from '../api/axios';

const CATEGORIES = ['Food', 'Transport', 'Rent', 'Bills', 'Shopping', 'Entertainment', 'Other'];
const COLORS = ['#2D5A4A', '#C4634A', '#3D6B8C', '#B08968', '#7A5C8C', '#A8763E', '#5C7A73'];

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: 'Food', amount: '', date: '', note: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await api.post('/expenses', { ...form, amount: parseFloat(form.amount) });
      setForm({ category: 'Food', amount: '', date: '', note: '' });
      setShowForm(false);
      fetchExpenses();
    } catch (err) {
      console.error('Failed to add expense', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryData = CATEGORIES.map((cat) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  })).filter((c) => c.value > 0);

  const getCategoryColor = (category) => {
    const index = CATEGORIES.indexOf(category);
    return COLORS[index % COLORS.length];
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <header className="border-b border-[#E4E1D8] px-8 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[#1C1C1A] tracking-tight">Ledger</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-[#1C1C1A]/50 hover:text-[#1C1C1A] transition"
        >
          Log out
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-[#1C1C1A]/50">This month</p>
              <p className="font-mono-ledger text-3xl text-[#1C1C1A] mt-1">
                ${total.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-[#2D5A4A] text-white text-sm rounded hover:bg-[#24483b] transition"
            >
              {showForm ? 'Cancel' : '+ Add expense'}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleAddExpense}
              className="mb-6 p-5 bg-white border border-[#E4E1D8] rounded space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="px-3 py-2 border border-[#E4E1D8] rounded text-sm focus:outline-none focus:border-[#2D5A4A]"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="px-3 py-2 border border-[#E4E1D8] rounded text-sm focus:outline-none focus:border-[#2D5A4A]"
                  required
                />
              </div>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-[#E4E1D8] rounded text-sm focus:outline-none focus:border-[#2D5A4A]"
                required
              />
              <input
                type="text"
                placeholder="Note (optional)"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full px-3 py-2 border border-[#E4E1D8] rounded text-sm focus:outline-none focus:border-[#2D5A4A]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#2D5A4A] text-white text-sm rounded hover:bg-[#24483b] transition"
              >
                Save expense
              </button>
            </form>
          )}

          <div className="border-t border-[#E4E1D8]">
            {expenses.length === 0 && (
              <p className="text-sm text-[#1C1C1A]/40 py-8 text-center">
                No expenses yet — add your first one above.
              </p>
            )}
            {expenses
              .slice()
              .reverse()
              .map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between py-3 border-b border-[#E4E1D8]/60"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: getCategoryColor(exp.category) }}
                    />
                    <div>
                      <p className="text-sm text-[#1C1C1A]">{exp.category}</p>
                      <p className="text-xs text-[#1C1C1A]/40">
                        {exp.date} {exp.note && `· ${exp.note}`}
                      </p>
                    </div>
                  </div>
                  <p className="font-mono-ledger text-sm text-[#1C1C1A]">
                    -${exp.amount.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="bg-white border border-[#E4E1D8] rounded p-5">
            <p className="text-sm text-[#1C1C1A]/50 mb-4">By category</p>
            {categoryData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {categoryData.map((entry) => (
                        <Cell key={entry.name} fill={getCategoryColor(entry.name)} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((entry) => (
                    <div key={entry.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getCategoryColor(entry.name) }}
                        />
                        <span className="text-[#1C1C1A]/70">{entry.name}</span>
                      </div>
                      <span className="font-mono-ledger text-[#1C1C1A]">
                        ${entry.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-[#1C1C1A]/40 text-center py-8">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}