import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

/**
 * Entry Point (진입점)
 * @description React 애플리케이션이 시작되는 곳입니다.
 * 'root'라는 ID를 가진 HTML 요소에 React 앱을 그립니다.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 브라우저 라우터 사용 설정 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
