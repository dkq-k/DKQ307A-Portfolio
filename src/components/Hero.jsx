import Terminal from './Terminal';
import { portfolioData } from '../data/portfolio-data';

/**
 * Hero Component
 * @description 웹사이트의 첫 화면(랜딩 섹션)입니다.
 * 'portfolio-data.js'의 profile 정보를 가져와서 보여줍니다.
 */
const Hero = () => {
  const { profile } = portfolioData;
  return (
    <section className="section container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '100px',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative'
    }}>
      <div className="scanline-moving"></div>

      {/* Dashboard Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '12px', letterSpacing: '2px', color: 'var(--accent-cyan)', opacity: 0.8 }}>
        <div>[ MISSION_STATUS: <span className="neon-text">ACTIVE</span> ]</div>
        <div style={{ textAlign: 'right' }}>[ COORD: 37.5665 / 126.9780 ]</div>
      </div>

      <div className="dashboard-border glass-card" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        alignItems: 'stretch',
        padding: '3rem',
        gap: '4rem',
        boxShadow: '0 0 50px rgba(0, 243, 255, 0.05)'
      }}>
        {/* 왼쪽: 텍스트 소개 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {profile.avatar && (
            <div className="animate-fade-in avatar-glow" style={{ marginBottom: '2.5rem', alignSelf: 'flex-start' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  style={{ 
                    width: '140px', 
                    height: '140px', 
                    borderRadius: '4px', // Dashed border feel
                    objectFit: 'cover',
                    border: '1px solid var(--accent-cyan)',
                    padding: '4px',
                    background: 'rgba(0, 243, 255, 0.1)'
                  }} 
                />
                <div style={{ position: 'absolute', top: '-10px', left: '-10px', fontSize: '10px', color: 'var(--accent-cyan)' }}>ID_SCAN: OK</div>
              </div>
            </div>
          )}
          
          <div className="animate-fade-in" style={{ 
            fontSize: '14px', 
            letterSpacing: '4px', 
            color: 'var(--accent-cyan)', 
            marginBottom: '0.5rem',
            textTransform: 'uppercase'
          }}>
            SYSTEM_ACCESS_GRANTED // 0x740EB
          </div>

          <h1 className="animate-fade-in delay-100" style={{ 
            fontSize: '4.5rem', 
            fontWeight: 800, 
            marginBottom: '0.5rem', 
            lineHeight: 1,
            color: '#fff'
          }}>
            {profile.name}
          </h1>

          <h2 className="animate-fade-in delay-200 neon-text" style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem', 
            fontWeight: 400,
            letterSpacing: '2px'
          }}>
            {profile.role}
          </h2>

          <div style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '20px', marginBottom: '3rem' }}>
             <p className="animate-fade-in delay-300" style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {profile.bio}
            </p>
          </div>

          <div className="animate-fade-in delay-500" style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#projects" className="glass-card" style={{
              padding: '12px 30px',
              color: 'var(--accent-cyan)',
              border: '1px solid var(--accent-cyan)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Execute_Projects
            </a>

            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="glass-card" style={{
              padding: '12px 30px',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Git_Repository
            </a>
          </div>
        </div>

        {/* 오른쪽: 터미널 */}
        <div className="animate-fade-in delay-300" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '10px', fontSize: '10px', color: 'var(--accent-purple)', letterSpacing: '1px' }}>
            [ RUNNING_TERMINAL: STABLE ]
          </div>
          <Terminal />
          <div style={{ marginTop: '15px', color: 'var(--text-secondary)', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
            <span>CPU: 12%</span>
            <span>MEM: 4.2GB</span>
            <span>UPLINK: SECURE</span>
          </div>
        </div>
      </div>

      {/* Dashboard Bottom Data */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '40px', opacity: 0.4, fontSize: '10px', color: 'var(--text-secondary)' }}>
        <span>{">> "} 2026.04.05 SYSTEM_BOOT_COMPLETE</span>
        <span>{">> "} ENCRYPTION_MODE: AES-256</span>
        <span>{">> "} USER_AUTH_TOKEN: 11BLSQ...</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-border {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
          }
          h1 {
            fontSize: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
