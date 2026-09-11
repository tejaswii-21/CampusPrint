import {
  Printer,
  Copy,
  BookOpen,
  ScanLine,
  PencilRuler,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  ShieldCheck,
  Smartphone,
  Zap,
  Star,
  Quote,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useApp } from '@/context/AppContext';

const services = [
  { icon: Printer, title: 'Digital Printing', desc: 'High-quality B/W and color prints from PDF, DOCX, or images.', price: '₹1.5/page' },
  { icon: Copy, title: 'Xerox & Photocopy', desc: 'Quick photocopies of documents, notes, and reference material.', price: '₹1/page' },
  { icon: BookOpen, title: 'Spiral Binding', desc: 'Professional binding for project reports and dissertations.', price: '₹35/piece' },
  { icon: ScanLine, title: 'Document Scanning', desc: 'Scan and digitize documents with email delivery.', price: '₹3/page' },
  { icon: PencilRuler, title: 'Stationery', desc: 'Pens, notebooks, files, sheets, and more — delivered to your dept.', price: 'From ₹5' },
];

const steps = [
  { num: '01', title: 'Place Your Order', desc: 'Upload your file or select stationery. Pick color, sides, and copies.' },
  { num: '02', title: 'Track in Real-Time', desc: 'Watch your order move from Pending → In Progress → Ready.' },
  { num: '03', title: 'Collect & Pay', desc: 'Pick up from the print center and pay at the counter.' },
];

const pricing = [
  { type: 'Black & White', single: '₹1.5', double: '₹1.0', note: 'per page per side' },
  { type: 'Color Print', single: '₹5.0', double: '₹4.0', note: 'per page per side' },
  { type: 'Xerox (B/W)', single: '₹1.0', double: '₹0.8', note: 'per page per side' },
  { type: 'Scanning', single: '₹3.0', double: '—', note: 'per page' },
  { type: 'Spiral Binding', single: '₹35', double: '—', note: 'per piece' },
];

const features = [
  { icon: Smartphone, title: 'Order from Anywhere', desc: 'Place orders from your phone, laptop, or hostel room.' },
  { icon: Clock, title: 'Live Order Tracking', desc: 'Real-time status updates so you know exactly when it\'s ready.' },
  { icon: ShieldCheck, title: 'Secure & Verified', desc: 'College email login. Only students and staff can order.' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Most orders ready within 2 hours during working hours.' },
];

const testimonials = [
  { name: 'Aditya Verma', role: 'Final Year, CSE', text: 'Saved me so many trips to the print shop. I just upload my notes and pick them up between classes.', rating: 5 },
  { name: 'Dr. Lakshmi Rao', role: 'Faculty, Physics', text: 'The stationery ordering is a lifesaver for the department. Everything arrives sorted and on time.', rating: 5 },
  { name: 'Megha Shetty', role: '2nd Year, ECE', text: 'The tracking feature is brilliant. I know exactly when my project binding is ready for pickup.', rating: 5 },
];

export default function Landing() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-ink-50 to-ink-50" />
        <div className="absolute right-0 top-20 -z-10 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute left-10 top-40 -z-10 h-72 w-72 rounded-full bg-accent-200/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                Now live for 2026–27 semester
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                Your campus print shop,
                <span className="block text-brand-600">digitized.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">
                Order prints, xerox, binding, and stationery right from your phone. Track your order in real-time and collect it when it's ready.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => navigate('student-login')} className="btn-primary text-base px-7 py-3.5">
                  Get Started
                  <ArrowRight size={18} />
                </button>
                <a href="#services" className="btn-secondary text-base px-7 py-3.5">
                  Explore Services
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-ink-500">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-500" />
                  No advance payment
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-500" />
                  Pay at counter
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-500" />
                  College email only
                </div>
              </div>
            </div>

            {/* Hero card mockup */}
            <div className="animate-scale-in relative">
              <div className="card p-6 shadow-card-hover">
                <div className="flex items-center justify-between border-b border-ink-200 pb-4">
                  <div className="flex items-center gap-2">
                    <Printer size={20} className="text-brand-600" />
                    <span className="font-display font-semibold text-ink-900">Order #CP-2026-0042</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-200">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                    In Progress
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-ink-50 px-4 py-3">
                    <span className="text-sm text-ink-600">Data Structures Notes</span>
                    <span className="text-sm font-semibold text-ink-900">24 pages</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-ink-50 px-4 py-3">
                    <span className="text-sm text-ink-600">B/W, Double-sided</span>
                    <span className="text-sm font-semibold text-ink-900">1 copy</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-brand-50 px-4 py-3">
                    <span className="text-sm font-medium text-brand-700">Total</span>
                    <span className="text-lg font-bold text-brand-700">₹24</span>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-ink-500">
                    <span>Placed</span>
                    <span>Printing</span>
                    <span>Ready</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <div className="h-1.5 flex-1 rounded-full bg-emerald-500" />
                    <div className="h-1.5 flex-1 rounded-full bg-blue-500" />
                    <div className="h-1.5 flex-1 rounded-full bg-ink-200" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-3 hidden rounded-xl bg-ink-900 px-5 py-3.5 text-white shadow-xl sm:block">
                <p className="text-xs text-ink-300">Est. ready in</p>
                <p className="font-display text-lg font-bold">45 min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-ink-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-ink-200 lg:grid-cols-4">
            {[
              { value: '12K+', label: 'Orders Completed' },
              { value: '3.5K+', label: 'Students Served' },
              { value: '2 hrs', label: 'Avg. Turnaround' },
              { value: '4.9/5', label: 'Student Rating' },
            ].map((stat, i) => (
              <div key={i} className="px-6 py-8 text-center">
                <p className="font-display text-3xl font-bold text-brand-600">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our Services</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Everything you need, under one roof</h2>
            <p className="mt-4 text-ink-600">From a single-page print to full project binding — we handle it all.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="card p-6 hover:-translate-y-1 hover:shadow-card-hover group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{service.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                    <span className="text-sm font-semibold text-brand-600">{service.price}</span>
                    <button onClick={() => navigate('student-login')} className="text-sm font-medium text-ink-500 hover:text-brand-600 transition-colors">
                      Order now →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">How It Works</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Three simple steps</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                  <span className="font-display text-xl font-bold">{step.num}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="absolute top-8 left-[60%] hidden h-0.5 w-full md:block">
                    <div className="h-full w-full bg-gradient-to-r from-brand-300 to-brand-100" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why CampusPrint</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Built for campus life</h2>
              <p className="mt-4 text-ink-600">
                We know how hectic college gets. CampusPrint saves you time standing in queues so you can focus on what matters.
              </p>
              <div className="mt-8 space-y-5">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-ink-900">{feature.title}</h4>
                        <p className="mt-0.5 text-sm text-ink-600">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="card overflow-hidden p-0">
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white">
                  <MapPin size={28} />
                  <h3 className="mt-4 font-display text-xl font-bold">Visit the Print Center</h3>
                  <p className="mt-2 text-sm text-brand-100">
                    Ground Floor, Central Block. Open Mon–Sat, 8 AM to 6 PM.
                  </p>
                </div>
                <div className="p-6">
                  <h4 className="font-display font-semibold text-ink-900">Quick facts</h4>
                  <ul className="mt-3 space-y-2.5 text-sm text-ink-600">
                    <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Accepts PDF, DOCX, JPG, PNG</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Max file size: 25 MB</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> A4 & A3 sizes available</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Cash & UPI at counter</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Same-day for orders before 4 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Pricing</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Transparent rates, no surprises</h2>
            <p className="mt-4 text-ink-600">Pay at the counter when you collect your order.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-ink-200 shadow-card">
            <table className="w-full">
              <thead>
                <tr className="bg-ink-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ink-700">Service</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-ink-700">Single-Side</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-ink-700">Double-Side</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {pricing.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-brand-50/50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-ink-900">{row.type}</span>
                      <span className="ml-2 text-xs text-ink-400">({row.note})</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-ink-900">{row.single}</td>
                    <td className="px-6 py-4 text-right font-semibold text-ink-900">{row.double}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Testimonials</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Loved across campus</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <Quote size={28} className="text-brand-200" />
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{t.text}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-ink-100 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center shadow-xl sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Ready to skip the queue?</h2>
          <p className="mt-3 text-brand-100">Join thousands of students who order prints online and save time.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => navigate('student-login')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition-all hover:bg-brand-50 active:scale-[0.98]"
            >
              Student Login
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('staff-login')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-brand-400 transition-all hover:bg-brand-400 active:scale-[0.98]"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
