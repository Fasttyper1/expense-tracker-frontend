import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg border border-[#E4E1D8]">
        <h1 className="text-2xl font-semibold text-[#1C1C1A] mb-1">Create account</h1>
        <p className="text-sm text-[#1C1C1A]/60 mb-6">Start your ledger</p>

        {error && (
          <div className="mb-4 text-sm text-[#C4634A] bg-[#C4634A]/10 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#1C1C1A]/70 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-[#E4E1D8] rounded focus:outline-none focus:border-[#2D5A4A]"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#1C1C1A]/70 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#E4E1D8] rounded focus:outline-none focus:border-[#2D5A4A]"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#1C1C1A]/70 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[#E4E1D8] rounded focus:outline-none focus:border-[#2D5A4A]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#2D5A4A] text-white rounded hover:bg-[#24483b] transition"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-[#1C1C1A]/60 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-[#2D5A4A] underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}