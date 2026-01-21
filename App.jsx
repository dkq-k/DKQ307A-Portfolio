import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

/**
 * App Component
 * @description 라우팅(페이지 이동)을 설정하는 최상위 컴포넌트입니다.
 */
function App() {
  return (
    <Routes>
      {/* 기본 경로(/)로 접속 시 Home 컴포넌트를 보여줍니다. */}
      <Route path="/" element={<Home />} />
      {/* 관리자 페이지 경로 (/admin) */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
