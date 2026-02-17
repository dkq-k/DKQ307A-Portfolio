import { useState, useEffect } from 'react';
import { Octokit } from 'octokit';

const Admin = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [sha, setSha] = useState('');
  const [repoInfo, setRepoInfo] = useState({ owner: '', repo: '' });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // GitHub 레포지토리 정보 자동 감지 (또는 수동 입력)
  // Vercel 배포 시 환경 변수 사용 가능하지만, 클라이언트 사이드라 직접 입력받거나 하드코딩 필요
  // 여기서는 편의상 사용자 입력을 받거나 기본값을 설정합니다.
  // 사용자가 본인 레포지토리 주소를 알 것이라 가정.

  const handleLogin = async () => {
    if (!token) {
      setStatus('토큰을 입력해주세요.');
      return;
    }
    
    setIsLoading(true);
    try {
      const octokit = new Octokit({ auth: token });
      const { data } = await octokit.rest.users.getAuthenticated();
      setStatus(`로그인 성공: ${data.login}`);
      setIsLoggedIn(true);
      
      // 저장소 정보가 없으면 사용자에게 입력을 유도할 수도 있지만, 
      // 현재 컨텍스트에서는 owner는 사용자명, repo는 'CR4NE' (또는 배포된 레포명)일 가능성이 높음.
      // 일단 입력을 받도록 UI 구성
      setRepoInfo(prev => ({ ...prev, owner: data.login }));
    } catch (error) {
      console.error(error);
      setStatus('로그인 실패: 토큰을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFile = async () => {
    if (!repoInfo.owner || !repoInfo.repo) {
      setStatus('레포지토리 정보를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const octokit = new Octokit({ auth: token });
      // src/data/portfolio-data.js 파일 읽기
      const response = await octokit.rest.repos.getContent({
        owner: repoInfo.owner,
        repo: repoInfo.repo,
        path: 'src/data/portfolio-data.js',
      });

      // Base64 디코딩 (한글 깨짐 방지)
      const content = new TextDecoder().decode(Uint8Array.from(atob(response.data.content), c => c.charCodeAt(0)));
      
      setFileContent(content);
      setSha(response.data.sha); // 업데이트 시 필요
      setStatus('파일 불러오기 성공!');
    } catch (error) {
      console.error(error);
      setStatus(`오류 발생: ${error.message} (${error.status})`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFile = async () => {
    if (!window.confirm('정말 저장하시겠습니까? 웹사이트에 즉시 반영됩니다.')) return;

    setIsLoading(true);
    try {
      const octokit = new Octokit({ auth: token });
      
      // Base64 인코딩 (한글 보존)
      const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: repoInfo.owner,
        repo: repoInfo.repo,
        path: 'src/data/portfolio-data.js',
        message: 'Update portfolio data via Admin Page',
        content: encodedContent,
        sha: sha, // 파일의 현재 SHA (충돌 방지)
      });

      setStatus('저장 완료! Vercel이 자동으로 배포합니다.');
      // SHA 업데이트를 위해 다시 불러오기
      await fetchFile();
    } catch (error) {
      console.error(error);
      setStatus('저장 실패: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newText = fileContent.substring(0, selectionStart) + '  ' + fileContent.substring(selectionEnd);
      setFileContent(newText);
      
      // 커서 위치 업데이트 (비동기 상태 업데이트 후 실행 필요하므로 setTimeout 사용)
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
      }, 0);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container section" style={{ maxWidth: '500px', marginTop: '50px' }}>
        <h2 style={{ marginBottom: '20px' }}>Admin Login (GitHub)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="password"
            placeholder="GitHub Personal Access Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#111', color: '#fff' }}
          />
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            style={{ padding: '10px', background: 'var(--text-primary)', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            {isLoading ? '확인 중...' : '로그인'}
          </button>
          {status && <p style={{ color: 'red' }}>{status}</p>}
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            * 토큰은 브라우저에 저장되지 않습니다.<br/>
            * Repo 권한이 있는 토큰이 필요합니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Portfolio Editor</h2>
        <span style={{ fontSize: '0.9rem', color: '#888' }}>{status}</span>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Repository Name (e.g. CR4NE)" 
          value={repoInfo.repo} 
          onChange={(e) => setRepoInfo({ ...repoInfo, repo: e.target.value })}
          style={{ padding: '8px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
        />
        <button onClick={fetchFile} style={{ padding: '8px 16px', cursor: 'pointer' }}>Load Data</button>
        <button onClick={saveFile} style={{ padding: '8px 16px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save Changes</button>
      </div>

      <textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          height: '600px',
          background: '#111',
          color: '#eee',
          border: '1px solid #333',
          padding: '20px',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.5',
          borderRadius: '8px'
        }}
      />
    </div>
  );
};

export default Admin;
