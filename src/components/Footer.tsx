import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink-900 text-ink-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Your campus print shop, digitized. Order prints, xerox, binding, and stationery from anywhere on campus.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 text-ink-400 transition-all hover:bg-brand-600 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Digital Printing</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Xerox & Photocopy</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Spiral Binding</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Document Scanning</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Stationery Supply</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Student Guide</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Staff Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <span>Print Center, Ground Floor, Central Block, Campus</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-brand-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-brand-400" />
                <span>campusprint@college.edu</span>
              </li>
            </ul>
            <div className="mt-4 rounded-lg bg-ink-800 px-4 py-3 text-xs text-ink-400">
              <span className="font-semibold text-ink-200">Hours:</span> Mon–Sat, 8:00 AM – 6:00 PM
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500">© 2026 CampusPrint. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-ink-500">
            <a href="#" className="hover:text-ink-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-ink-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
