import { Printer } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  light?: boolean;
}

export default function Logo({ size = 'md', showText = true, light = false }: LogoProps) {
  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 28 : 22;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  const padding = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-3' : 'p-2';
  const rounded = size === 'sm' ? 'rounded-lg' : 'rounded-xl';

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${padding} ${rounded} bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm`}>
        <Printer size={iconSize} className="text-white" strokeWidth={2.5} />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-bold ${textSize} ${light ? 'text-white' : 'text-ink-900'}`}>
            Xerofy
          </span>
          <span className={`text-[10px] font-medium tracking-wide uppercase ${light ? 'text-ink-300' : 'text-ink-400'}`}>
            Xerox & Stationery
          </span>
        </div>
      )}
    </div>
  );
}
