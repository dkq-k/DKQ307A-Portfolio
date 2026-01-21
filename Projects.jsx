import { portfolioData } from '../data/portfolio-data';

/**
 * Projects Component
 * @description 프로젝트 목록을 보여주는 섹션입니다.
 * 'portfolio-data.js'의 projects 배열을 순회하며 카드 형태로 렌더링합니다.
 */
const Projects = () => {
  // portfolioData에서 프로젝트 목록만 가져옵니다.
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section container">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>대표 프로젝트</h2>
      
      {/* Grid 레이아웃: 화면 크기에 따라 열 개수가 자동 조절됩니다. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* projects 배열을 map 함수로 순회하며 각 프로젝트를 카드로 만듭니다. */}
        {projects.map((project) => (
          <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="hover-scale" style={{
            background: 'var(--bg-secondary)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #222',
            display: 'block'
          }}>
            {/* 프로젝트 이미지 (썸네일) */}
            <div style={{ height: '200px', background: '#222', backgroundImage: `url(${project.image})`, backgroundSize: 'cover' }}></div>
            
            {/* 프로젝트 텍스트 정보 */}
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{project.description}</p>
              
              {/* 태그 목록 (React, Vite 등) */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ 
                    fontSize: '0.85rem', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
