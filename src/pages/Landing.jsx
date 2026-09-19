import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <header className="px-8 py-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <h1 className="text-lg font-semibold text-[#1C1C1A] tracking-tight">Ledger</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm text-[#1C1C1A]/70 hover:text-[#1C1C1A] transition"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-[#2D5A4A] text-white text-sm rounded hover:bg-[#24483b] transition"
          >
            Get started
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <p className="text-sm font-mono-ledger text-[#2D5A4A] mb-4">
              PERSONAL FINANCE
            </p>
            <h2 className="text-5xl font-semibold text-[#1C1C1A] leading-tight mb-6">
              Track every dollar,
              <br />
              like a real ledger.
            </h2>
            <p className="text-lg text-[#1C1C1A]/60 mb-8 max-w-md">
              A calm, precise way to log expenses, see where your money goes,
              and stay on top of your spending — without the clutter.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-[#2D5A4A] text-white rounded hover:bg-[#24483b] transition"
              >
                Start tracking — free
              </Link>
              <Link
                to="/login"
                className="text-sm text-[#1C1C1A]/70 hover:text-[#1C1C1A] transition"
              >
                I already have an account →
              </Link>
            </div>
          </div>

          <div className="bg-white border border-[#E4E1D8] rounded-lg p-6">
            <p className="text-sm text-[#1C1C1A]/50 mb-4">This month</p>
            <p className="font-mono-ledger text-3xl text-[#1C1C1A] mb-6">$847.20</p>
            <div className="space-y-3">
              {[
                { name: 'Rent', amount: '600.00', color: '#3D6B8C' },
                { name: 'Food', amount: '187.20', color: '#2D5A4A' },
                { name: 'Transport', amount: '60.00', color: '#C4634A' },
              ].map((row) => (
                <div key={row.name} className="flex items-center justify-between py-2 border-b border-[#E4E1D8]/60">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 rounded-full" style={{ backgroundColor: row.color }} />
                    <span className="text-sm text-[#1C1C1A]">{row.name}</span>
                  </div>
                  <span className="font-mono-ledger text-sm text-[#1C1C1A]">
                    -${row.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="px-8 py-6 text-center text-xs text-[#1C1C1A]/40">
        Built with Spring Boot, React & Tailwind
      </footer>
    </div>
  );
}