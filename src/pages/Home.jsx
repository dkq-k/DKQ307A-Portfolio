
import Hero from '../components/Hero';
import MinimalistView from '../components/views/MinimalistView';
import { portfolioData } from '../data/portfolio-data';

/**
 * Navigation Component (내비게이션 바)
 * @description 상단에 고정된 메뉴바입니다.
 */
const Navigation = () => (
  <nav style={{ 
    padding: '30px 0', 
    position: 'fixed', 
    width: '100%', 
    top: 0, 
    background: 'rgba(0,0,0,0.8)', 
    backdropFilter: 'blur(20px)', 
    zIndex: 100 
  }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 'var(--spacing-container)' }}>
      <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '2px' }}>{portfolioData.profile.name.split(' / ')[0]}</div>
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
        <a href="#projects" style={{ opacity: 0.6 }}>프로젝트</a>
        <a href="https://blog.cr4ne.kr" style={{ opacity: 0.6 }}>Blog</a>
      </div>
    </div>
  </nav>
);

/**
 * Home Page Component
 * @description 메인 페이지입니다. 내비게이션, 히어로, 프로젝트 섹션 등을 조합합니다.
 */
const Home = () => {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: '100px' }}>
        <Hero />
        <MinimalistView />
      </main>
    </>
  );
};

export default Home;
