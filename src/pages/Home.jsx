
import Hero from '../components/Hero';
import NotionView from '../components/views/NotionView';
import { portfolioData } from '../data/portfolio-data';

/**
 * Navigation Component (내비게이션 바)
 * @description 상단에 고정된 메뉴바입니다.
 * 스크롤 시 흐림 효과(backdropFilter)가 적용됩니다.
 */
const Navigation = () => (
  <nav style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'fixed', width: '100%', top: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* 로고 / 홈 링크 */}
      <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>DKQ307A</div>

      {/* 메뉴 링크들 */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* 메뉴 링크 제거됨 */}
      </div>
    </div>
  </nav>
);

/**
 * Footer Component (하단 바)
 * @description 웹사이트 맨 아래의 저작권 표시 영역입니다.
 */
const Footer = () => (
  <footer style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <p>© {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.</p>
  </footer>
);

/**
 * Home Page Component
 * @description 메인 페이지입니다. 내비게이션, 히어로, 프로젝트 섹션, 푸터를 조합합니다.
 */
const Home = () => {
  return (
    <>
      <Navigation />
      {/* 메인 콘텐츠 영역 (내비게이션 바 높이만큼 상단 여백 추가) */}
      <main style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <Hero />
        <NotionView />
      </main>
      <Footer />
    </>
  );
};

export default Home;
