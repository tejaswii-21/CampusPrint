import { useState } from 'react';
import { Briefcase, Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import Logo from '@/components/Logo';
import { useApp } from '@/context/AppContext';

export default function StaffLogin() {
  const { navigate, login, showToast } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        id: 'staff-1',
        name: 'Rajesh Kumar',
        email: email || 'rajesh.kumar@college.edu',
        role: 'staff',
        department: 'Print Center',
      });
      showToast('Welcome, staff member!', 'success');
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-ink-50">
      {/* Left panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-ink-800 to-ink-950 lg:flex lg:flex-col">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-brand-400 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-brand-300 blur-3xl" />
        </div>
        <div className="relative z-10 flex h-full flex-col p-12">
          <button onClick={() => navigate('landing')} className="flex w-fit items-center gap-2 text-sm text-ink-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to home
          </button>
          <div className="mt-8">
            <Logo size="lg" light />
          </div>
          <div className="mt-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-3.5 py-1.5 text-xs font-medium text-brand-300 ring-1 ring-inset ring-ink-700">
              <ShieldCheck size={14} />
              Staff Portal — Authorized access only
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white">
              Manage orders,<br />efficiently.
            </h2>
            <p className="mt-4 max-w-sm text-ink-400">
              View all student orders, update statuses, manage stationery inventory, and generate reports — all in one place.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'Pending', value: '12', color: 'text-amber-400' },
                { label: 'In Progress', value: '5', color: 'text-blue-400' },
                { label: 'Ready', value: '8', color: 'text-teal-400' },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl bg-ink-800/50 p-4 ring-1 ring-inset ring-ink-700">
                  <p className={`font-display text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="mt-1 text-xs text-ink-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xs text-ink-600">© 2026 Xerofy. Staff access is restricted to authorized personnel.</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <Logo size="md" />
          </div>

          <div className="card p-8 animate-slide-up">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
                <Briefcase size={22} />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-ink-900">Staff Login</h1>
                <p className="text-sm text-ink-500">Sign in to the staff management portal</p>
              </div>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-lg bg-amber-50 px-4 py-3 ring-1 ring-inset ring-amber-200">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs leading-relaxed text-amber-800">
                This portal is for authorized print center staff only. Use your staff credentials issued by the administration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-text">Staff Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="staff@college.edu"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="label-text">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field px-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-ink-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
                  Keep me signed in
                </label>
                <button type="button" className="font-medium text-brand-600 hover:text-brand-700">Forgot password?</button>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  <>
                    Sign In to Staff Portal
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-ink-200" />
              <span className="text-xs text-ink-400">or</span>
              <div className="h-px flex-1 bg-ink-200" />
            </div>

            <button
              onClick={() => navigate('student-login')}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-600 transition-all hover:bg-ink-50"
            >
              Are you a student? Student Login →
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-ink-400">
            Need staff access? Contact the administration office.
          </p>
        </div>
      </div>
    </div>
  );
}
