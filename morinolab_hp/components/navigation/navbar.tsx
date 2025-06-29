'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Atom } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/navigation/language-switcher';
import { useLocale } from '@/contexts/locale';
import { useScrollPosition } from '@/contexts/scroll-position';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const router = useRouter();
  const { locale } = useLocale();
  const { getScrollPosition, saveScrollPosition } = useScrollPosition();
  const pathname = usePathname();

  const navItems = [
    { name: locale === 'ja' ? 'ホーム' : 'Home', href: 'home' },
    {
      name: locale === 'ja' ? '研究内容' : 'Research',
      href: 'research',
    },
    { name: locale === 'ja' ? 'メンバー' : 'Team', href: 'team' },
    { name: locale === 'ja' ? 'ニュース' : 'News', href: 'news' },
    { name: locale === 'ja' ? '論文' : 'Publications', href: 'publications' },
    { name: locale === 'ja' ? '受賞' : 'Awards', href: 'awards' },
    { name: locale === 'ja' ? 'キャリア' : 'Career', href: 'career' },
    { name: locale === 'ja' ? 'お問い合わせ' : 'Contact', href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setCurrentScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    setCurrentScrollY(window.scrollY);
    setScrolled(window.scrollY > 50);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    saveScrollPosition();
    if (href === 'publications') {
      router.push('/publications');
    } else if (href === 'awards') {
      router.push('/awards');
    } else if (href === 'career') {
      router.push('/career');
    } else {
      router.push(`/#${href}`);
      setTimeout(() => window.scrollTo(0, 0), 0);
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    saveScrollPosition();
    router.push('/#home');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const navRootClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled
      ? 'bg-black/80 backdrop-blur-md border-b border-white/10 navbar-dark'
      : 'bg-transparent'
  );

  const brandIconClasses = cn(
    'w-8 h-8 transition-colors duration-200',
    scrolled
      ? 'text-white group-hover:text-cyan-400'
      : 'text-blue-400 group-hover:text-cyan-400'
  );

  const brandTextClasses = cn(
    'text-xl font-bold transition-colors duration-200',
    scrolled
      ? 'text-white group-hover:text-cyan-400'
      : 'text-foreground group-hover:text-cyan-400'
  );

  const navButtonClasses = (active?: boolean) =>
    cn(
      'font-medium relative group transition-colors duration-200',
      scrolled
        ? 'text-white hover:text-cyan-100'
        : 'text-gray-700 hover:text-blue-700'
    );

  return (
    <nav className={navRootClasses}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <button
            onClick={handleLogoClick}
            className='flex items-center space-x-2 group transition-all duration-200 hover:scale-105'
          >
            <Atom className={brandIconClasses} />
            <span className={brandTextClasses}>MorinoLab</span>
          </button>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-8'>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={navButtonClasses()}
              >
                {item.name}
                <div className='absolute bottom-[-4px] left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300'></div>
              </button>
            ))}
            {/* Language toggle */}
            <LanguageSwitcher dark={scrolled} />
          </div>

          {/* Mobile Menu Button */}
          <div className='lg:hidden'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'hover:bg-white/10 transition-all duration-200',
                scrolled ? 'text-white' : 'text-gray-700'
              )}
            >
              {isOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className={cn(
              'lg:hidden backdrop-blur-md animate-in slide-in-from-top-5 duration-200',
              scrolled
                ? 'bg-black/90 border-t border-white/10'
                : 'bg-white/90 border-t border-gray-200'
            )}
          >
            <div className='py-4 space-y-2'>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'block w-full text-left px-4 py-3 transition-all duration-200 relative group',
                    scrolled
                      ? 'text-gray-300 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  {item.name}
                  <div className='absolute left-4 bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-8 transition-all duration-300'></div>
                </button>
              ))}
              {/* Language toggle for mobile */}
              <div className='px-4 pt-2'>
                <LanguageSwitcher dark={scrolled} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
