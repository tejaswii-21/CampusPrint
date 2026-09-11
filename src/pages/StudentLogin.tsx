import { useState } from 'react';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  Hash,
  Calendar,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useApp } from '@/context/AppContext';

const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Technology', 'Electrical', 'Chemical', 'Biotech'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function StudentLogin() {
  const { navigate, login, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    rollNo: '',
    department: 'Computer Science',
    year: '1st Year',
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({
        id: 'student-1',
        name: form.name || 'Aarav Sharma',
        email: form.email || 'aarav.sharma@college.edu',
        role: 'student',
        department: form.department,
        rollNo: form.rollNo || 'CS21B042',
        year: form.year,
      });
      showToast(mode === 'login' ? 'Welcome back!' : 'Account created successfully!', 'success');
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-ink-50">
      {/* Left panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 lg:flex lg:flex-col">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-brand-300 blur-3xl" />
        </div>
        <div className="relative z-10 flex h-full flex-col p-12">
          <button onClick={() => navigate('landing')} className="flex w-fit items-center gap-2 text-sm text-brand-200 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to home
          </button>
          <div className="mt-8">
            <Logo size="lg" light />
          </div>
          <div className="mt-auto">
            <h2 className="font-display text-3xl font-bold leading-tight text-white">
              Print smarter,<br />not harder.
            </h2>
            <p className="mt-4 max-w-sm text-brand-100">
              Order prints, track status, and collect — all from your phone. No more standing in queues.
            </p>
            <div className="mt-8 space-y-3">
              {['Real-time order tracking', 'Upload PDF, DOCX, or images', 'Pay at the counter'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-brand-100">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-xs text-brand-300">© 2026 Xerofy. College email required.</p>
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
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <GraduationCap size={22} />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-ink-900">
                  {mode === 'login' ? 'Student Login' : 'Create Account'}
                </h1>
                <p className="text-sm text-ink-500">
                  {mode === 'login' ? 'Sign in to place and track orders' : 'Register with your college email'}
                </p>
              </div>
            </div>

            {/* Mode toggle */}
            <div className="mb-6 flex rounded-lg bg-ink-100 p-1">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  mode === 'login' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  mode === 'register' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="label-text">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label-text">Roll No.</label>
                      <div className="relative">
                        <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <input
                          type="text"
                          required
                          value={form.rollNo}
                          onChange={(e) => update('rollNo', e.target.value)}
                          placeholder="CS21B042"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-text">Phone</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="98765 43210"
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label-text">Department</label>
                      <div className="relative">
                        <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <select
                          value={form.department}
                          onChange={(e) => update('department', e.target.value)}
                          className="input-field appearance-none pl-10 pr-8"
                        >
                          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label-text">Year</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <select
                          value={form.year}
                          onChange={(e) => update('year', e.target.value)}
                          className="input-field appearance-none pl-10 pr-8"
                        >
                          {years.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="label-text">College Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="yourname@college.edu"
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
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
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

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-ink-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
                    Remember me
                  </label>
                  <button type="button" className="font-medium text-brand-600 hover:text-brand-700">Forgot password?</button>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Please wait...
                  </span>
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
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
              onClick={() => navigate('staff-login')}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-600 transition-all hover:bg-ink-50"
            >
              Are you a staff member? Staff Login →
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-ink-400">
            By continuing, you agree to Xerofy's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
