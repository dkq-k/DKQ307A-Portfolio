import React from 'react';
import Terminal from './Terminal';
import { portfolioData } from '../data/portfolio-data';
import useReveal from '../hooks/useReveal';

/**
 * Hero Component
 * @description 웹사이트의 첫 화면(랜딩 섹션)입니다.
 * 'portfolio-data.js'의 profile 정보를 가져와서 보여줍니다.
 */
const Hero = () => {
  const { profile } = portfolioData;
  useReveal();
  return (
    <section className="section container animate-fade-in" style={{
      minHeight: '85vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      alignItems: 'center',
      gap: '4rem',
      paddingTop: '80px',
      maxWidth: 'var(--spacing-container)',
      margin: '0 auto',
      position: 'relative',
      paddingLeft: '60px' /* Move slightly to the right */
    }}>
      {/* Left Content */}
      <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
          안녕하세요, 저는
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
          fontWeight: 800, 
          lineHeight: 1.1,
          color: '#fff'
        }}>
          {profile.name}
        </h1>

        <div style={{ 
          fontSize: '1.8rem', 
          fontWeight: 700, 
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          덕영고등학교 <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>|</span> <span style={{ color: 'var(--accent-blue)' }}>NiceTop</span>
        </div>

        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.7,
          maxWidth: '450px'
        }}>
          {profile.bio}
        </p>

        {/* Buttons */}
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a href="#projects" className="glass-view" style={{
            padding: '12px 28px',
            background: '#fff',
            color: '#000',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '0.95rem',
            textDecoration: 'none'
          }}>
            프로젝트 보기
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="glass-view" style={{
            padding: '12px 28px',
            borderRadius: '50px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}>
            GitHub
          </a>
        </div>
      </div>

      {/* Right Terminal Area */}
      <div className="reveal delay-200" style={{ padding: '0 10px' }}>
        <div className="mac-terminal">
          <div className="terminal-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: '11px', color: '#555' }}>
              Terminal — zsh — 80x24
            </div>
          </div>
          <div className="terminal-body" style={{ minHeight: '300px' }}>
             <Terminal />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .section.container {
            grid-template-columns: 1fr !important;
            padding-top: 120px !important;
            text-align: center;
          }
          p { margin: 0 auto; }
          div { align-items: center; justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
