
import Hero from '../components/Hero';
import MinimalistView from '../components/views/MinimalistView';
import { portfolioData } from '../data/portfolio-data';

/**
 * Navigation Component (내비게이션 바)
 * @description 상단에 고정된 메뉴바입니다.
 */
const Navigation = () => null; /* Navigation hidden as requested */


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
