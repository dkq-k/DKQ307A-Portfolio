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
      minHeight: '90vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // 반응형 그리드
      alignItems: 'center',
      gap: '4rem', // 넉넉한 간격
      paddingTop: '80px',
      maxWidth: '1200px', // 전체 너비 제한
      margin: '0 auto'  // 중앙 정렬
    }}>
      {/* 왼쪽: 텍스트 소개 영역 */}
      <div style={{ order: 1 }}> {/* 모바일에서도 순서 유지 */}
        <h4 className="animate-fade-in" style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 500 }}>안녕하세요, 저는</h4>

        <h1 className="gradient-text animate-fade-in delay-100" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
          {profile.name}
        </h1>

        <h2 className="animate-fade-in delay-200" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 600 }}>
          {profile.role}
        </h2>

        <p className="animate-fade-in delay-300" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.8, maxWidth: '90%' }}>
          {profile.bio}
        </p>

        <div className="animate-fade-in delay-500" style={{ display: 'flex', gap: '1rem' }}>
          <a href="#projects" style={{
            padding: '14px 36px',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '1rem',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            프로젝트 보기
          </a>

          <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{
            padding: '14px 36px',
            border: '1px solid var(--text-secondary)',
            borderRadius: '50px',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            GitHub
          </a>
        </div>
      </div>

      {/* 오른쪽: 터미널 */}
      <div className="animate-fade-in delay-300" style={{ order: 2, display: 'flex', justifyContent: 'center' }}>
        <div className="animate-float" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Terminal />
        </div>
      </div>

      {/* 미디어 쿼리 스타일 주입 (JS로 처리하기 힘든 부분 보완) */}
      <style>{`
        @media (max-width: 768px) {
          .section.container {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .section.container > div {
             align-items: center !important;
          }
          .section.container p, .section.container h1, .section.container h2, .section.container h4 {
             width: 100%;
          }
          .section.container div > div { /* 버튼 그룹 */
             justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
