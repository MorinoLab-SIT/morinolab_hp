'use client';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  useFadeInAnimation,
  useStaggeredFadeIn,
} from '@/hooks/use-fade-in-animation';
import { useLocale } from '@/contexts/locale';
import { loadThemes, Theme, getImagePath } from '@/lib/client-content-loader';
import { getLocalized } from '@/lib/utils';
import Image from 'next/image';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import localFont from 'next/font/local';

const mplusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const mkPop = localFont({
  src: '../../fonts/851MkPOP_101.ttf',
  display: 'swap',
});

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [themes, setThemes] = useState<Theme[]>([]);
  const { locale } = useLocale();
  const titleAnimation = useFadeInAnimation<HTMLHeadingElement>({
    delay: 0,
    duration: 600,
    translateY: 25,
    scale: 0.95,
  });
  const descAnimation = useFadeInAnimation<HTMLParagraphElement>({
    delay: 150,
    duration: 600,
    translateY: 20,
  });
  const cardsAnimation = useFadeInAnimation<HTMLDivElement>({
    delay: 300,
    duration: 600,
    translateY: 25,
    scale: 0.97,
  });
  const buttonsAnimation = useFadeInAnimation<HTMLDivElement>({
    delay: 450,
    duration: 600,
    translateY: 20,
  });
  const photoAnimation = useFadeInAnimation<HTMLDivElement>({
    delay: 200,
    duration: 600,
    translateY: 20,
  });

  const titlePart1 = locale === 'ja' ? '森野' : 'Morino';
  const titlePart2 = locale === 'ja' ? '研究室' : 'Lab';

  const subtitle =
    locale === 'ja'
      ? '移動通信ネットワーク研究室'
      : 'Mobile Information Networking Laboratory';
  const exploreText = locale === 'ja' ? '研究内容を見る' : 'Explore Research';
  const teamText = locale === 'ja' ? 'メンバーを見る' : 'Meet the Team';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themesData = await loadThemes();
        // 最初の3つのテーマを取得
        setThemes(themesData.slice(0, 3));
      } catch (error) {
        console.error('Error loading themes for hero:', error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <SectionWrapper className='min-h-screen flex items-center justify-center pt-24 md:pt-0'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Large screen: Two column layout */}
        <div className='hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center'>
          {/* Left column: Content */}
          <div className='space-y-8 text-center'>
            <div
              className='space-y-6'
              style={{
                transform: `translateY(${scrollY * 0.5}px)`,
                opacity: 1 - scrollY / 800,
              }}
            >
              <h1
                ref={titleAnimation.ref}
                style={titleAnimation.style}
                className='text-7xl font-bold text-foreground leading-tight'
              >
                {locale === 'ja' ? (
                  <>
                    <span className={mplusRounded.className}>{titlePart1}</span>
                    <span
                      className={
                        mplusRounded.className +
                        ' bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'
                      }
                    >
                      {titlePart2}
                    </span>
                  </>
                ) : (
                  <>
                    {titlePart1}
                    <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                      {titlePart2}
                    </span>
                  </>
                )}
              </h1>

              <p
                ref={descAnimation.ref}
                style={descAnimation.style}
                className='text-lg xl:text-xl text-gray-700 leading-relaxed'
              >
                {subtitle}
              </p>
            </div>

            {/* Theme cards */}
            <div
              ref={cardsAnimation.ref}
              style={cardsAnimation.style}
              className='flex flex-wrap gap-3 justify-center'
            >
              {themes.slice(0, 3).map((theme, index) => {
                const colors = [
                  'bg-gradient-to-r from-blue-500 to-cyan-500',
                  'bg-gradient-to-r from-purple-500 to-pink-500',
                  'bg-gradient-to-r from-green-500 to-teal-500',
                ];

                return (
                  <GlassCard
                    key={theme.id}
                    className='p-4 flex items-center space-x-3 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300'
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${colors[index]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-2`}
                    >
                      <Image
                        src={getImagePath(
                          `/generated_contents/theme/${theme.thumbnail}`
                        )}
                        alt={getLocalized(theme, 'name', locale)}
                        width={24}
                        height={24}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <span className='text-sm text-foreground font-medium group-hover:text-cyan-600 transition-colors duration-300'>
                      {getLocalized(theme, 'name', locale)}
                    </span>
                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out' />
                  </GlassCard>
                );
              })}
            </div>

            {/* Buttons */}
            <div
              ref={buttonsAnimation.ref}
              style={buttonsAnimation.style}
              className='flex flex-col sm:flex-row gap-4 sm:justify-center'
            >
              <Button
                size='lg'
                className='bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold'
                onClick={() =>
                  document.getElementById('research')?.scrollIntoView()
                }
              >
                {exploreText}
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='relative overflow-hidden px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500'
                onClick={() =>
                  document.getElementById('team')?.scrollIntoView()
                }
              >
                {teamText}
              </Button>
            </div>
          </div>

          {/* Right column: Photo */}
          <div
            ref={photoAnimation.ref}
            style={photoAnimation.style}
            className='flex justify-center lg:justify-end'
          >
            <div className='relative group cursor-pointer'>
              {/* ポラロイド風フレーム */}
              <div className='bg-white p-4 pb-16 rounded-t-sm rounded-b-sm shadow-2xl rotate-2 hover:rotate-1 transition-all duration-500 transform hover:scale-105'>
                <div className='relative overflow-hidden'>
                  <Image
                    src={getImagePath('/img/lab-group2023.png')}
                    alt='Morino Lab Group 2024'
                    width={1200}
                    height={650}
                    className='w-full max-w-2xl h-auto contrast-[1.15] brightness-[0.95] saturate-[0.85]'
                  />
                  {/* 周辺減光（ビネット効果） */}
                  <div
                    className='absolute inset-0 pointer-events-none'
                    style={{
                      background:
                        'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.3) 100%)',
                    }}
                  />
                  {/* フィルムグレイン効果 */}
                  <div
                    className='absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay'
                    style={{
                      backgroundImage:
                        'url("data:image/svg+xml,%3Csvg width="200" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.3"/%3E%3C/svg%3E")',
                      backgroundSize: '100px 100px',
                    }}
                  />
                  {/* 色温度調整オーバーレイ */}
                  <div
                    className='absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply'
                    style={{
                      background:
                        'linear-gradient(45deg, rgba(255,204,153,0.3), rgba(255,255,255,0.1), rgba(153,204,255,0.2))',
                    }}
                  />
                </div>
                {/* 手書き風キャプション */}
                <div className='absolute bottom-4 left-6 right-6 text-center'>
                  <p
                    className={`text-gray-700 text-lg transform -rotate-1 ${mkPop.className}`}
                  >
                    {locale === 'ja' ? '森野研 2024' : 'Morino Lab 2024'}
                  </p>
                </div>
              </div>
              {/* 追加のドロップシャドウ効果 */}
              <div className='absolute inset-0 bg-gray-400/20 rounded-t-sm rounded-b-sm -z-10 transform translate-x-2 translate-y-2 rotate-1' />
            </div>
          </div>
        </div>

        {/* Small screen: Original vertical layout */}
        <div className='lg:hidden text-center space-y-8 max-w-4xl mx-auto'>
          <div
            className='space-y-6'
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              opacity: 1 - scrollY / 800,
            }}
          >
            <h1
              ref={titleAnimation.ref}
              style={titleAnimation.style}
              className='text-4xl sm:text-7xl font-bold text-foreground leading-tight'
            >
              {locale === 'ja' ? (
                <>
                  <span className={mplusRounded.className}>{titlePart1}</span>
                  <span
                    className={
                      mplusRounded.className +
                      ' bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'
                    }
                  >
                    {titlePart2}
                  </span>
                </>
              ) : (
                <>
                  {titlePart1}
                  <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                    {titlePart2}
                  </span>
                </>
              )}
            </h1>

            <p
              ref={descAnimation.ref}
              style={descAnimation.style}
              className='text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed'
            >
              {subtitle}
            </p>
          </div>

          {/* Group Photo */}
          <div
            ref={photoAnimation.ref}
            style={photoAnimation.style}
            className='flex justify-center'
          >
            <div className='relative group cursor-pointer'>
              {/* ポラロイド風フレーム */}
              <div className='bg-white p-3 pb-12 sm:p-4 sm:pb-16 rounded-t-sm rounded-b-sm shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500 transform hover:scale-105'>
                <div className='relative overflow-hidden'>
                  <Image
                    src={getImagePath('/img/lab-group2023.png')}
                    alt='Morino Lab Group 2024'
                    width={1200}
                    height={650}
                    className='w-full max-w-3xl h-auto contrast-[1.15] brightness-[0.95] saturate-[0.85]'
                  />
                  {/* 周辺減光（ビネット効果） */}
                  <div
                    className='absolute inset-0 pointer-events-none'
                    style={{
                      background:
                        'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.3) 100%)',
                    }}
                  />
                  {/* フィルムグレイン効果 */}
                  <div
                    className='absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay'
                    style={{
                      backgroundImage:
                        'url("data:image/svg+xml,%3Csvg width="200" height="200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.3"/%3E%3C/svg%3E")',
                      backgroundSize: '100px 100px',
                    }}
                  />
                  {/* 色温度調整オーバーレイ */}
                  <div
                    className='absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply'
                    style={{
                      background:
                        'linear-gradient(45deg, rgba(255,204,153,0.3), rgba(255,255,255,0.1), rgba(153,204,255,0.2))',
                    }}
                  />
                </div>
                {/* 手書き風キャプション */}
                <div className='absolute bottom-2 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 text-center'>
                  <p
                    className={`text-gray-700 text-base sm:text-lg transform rotate-1 ${mkPop.className}`}
                  >
                    {locale === 'ja' ? '森野研 2024' : 'Morino Lab 2024'}
                  </p>
                </div>
              </div>
              {/* 追加のドロップシャドウ効果 */}
              <div className='absolute inset-0 bg-gray-400/20 rounded-t-sm rounded-b-sm -z-10 transform translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 rotate-0' />
            </div>
          </div>

          <div
            ref={cardsAnimation.ref}
            style={cardsAnimation.style}
            className='flex flex-wrap justify-center gap-4 mt-12'
          >
            {themes.slice(0, 3).map((theme, index) => {
              const colors = [
                'bg-gradient-to-r from-blue-500 to-cyan-500',
                'bg-gradient-to-r from-purple-500 to-pink-500',
                'bg-gradient-to-r from-green-500 to-teal-500',
              ];

              return (
                <GlassCard
                  key={theme.id}
                  className='p-6 flex items-center space-x-3 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300'
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${colors[index]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-2`}
                  >
                    <Image
                      src={getImagePath(
                        `/generated_contents/theme/${theme.thumbnail}`
                      )}
                      alt={getLocalized(theme, 'name', locale)}
                      width={32}
                      height={32}
                      className='w-full h-full object-contain'
                    />
                  </div>
                  <span className='text-foreground font-medium group-hover:text-cyan-600 transition-colors duration-300'>
                    {getLocalized(theme, 'name', locale)}
                  </span>
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out' />
                </GlassCard>
              );
            })}
          </div>

          <div
            ref={buttonsAnimation.ref}
            style={buttonsAnimation.style}
            className='flex flex-col sm:flex-row gap-4 justify-center mt-12'
          >
            <Button
              size='lg'
              className='bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold'
              onClick={() =>
                document.getElementById('research')?.scrollIntoView()
              }
            >
              {exploreText}
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='relative overflow-hidden px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500'
              onClick={() => document.getElementById('team')?.scrollIntoView()}
            >
              {teamText}
            </Button>
          </div>
        </div>

        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <ChevronDown className='w-8 h-8 text-white/70' />
        </div>
      </div>
    </SectionWrapper>
  );
}
