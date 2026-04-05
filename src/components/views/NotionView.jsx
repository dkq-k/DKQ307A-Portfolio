import React from 'react';
import { portfolioData } from '../../data/portfolio-data';
import { Github, ExternalLink } from 'lucide-react';

/**
 * Utility to group items by their 'year' (or section title) preserving the original array order.
 * This allows the user to define the order manually in the data file.
 */
const groupByOrderPreserved = (items) => {
  const groups = [];
  let currentGroup = null;

  items.forEach(item => {
    const sectionTitle = item.year || 'Others';

    if (!currentGroup || currentGroup[0] !== sectionTitle) {
      currentGroup = [sectionTitle, []];
      groups.push(currentGroup);
    }

    currentGroup[1].push(item);
  });

  return groups;
};

/**
 * Notion-style GitHub Card
 * Renders a project link looking like a GitHub repository preview
 */
const GitHubCard = ({ project }) => {
  // Extract repo name if possible
  let repoName = project.title;
  let owner = "dkq-k";

  if (project.link?.includes('github.com')) {
    const parts = project.link.split('github.com/')[1]?.split('/');
    if (parts && parts.length >= 2) {
      owner = parts[0];
      repoName = parts[1];
    }
  }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '12px',
        marginBottom: '4px',
        textDecoration: 'none',
        color: '#e0e0e0',
        overflow: 'hidden',
        maxWidth: '100%'
      }}
    >
      {/* Project Image Preview */}
      {project.image && (
        <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
      )}
      
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '16px', opacity: 0.8 }}>
          <Github size={28} color="#fff" />
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', color: '#fff' }}>
            {owner} / {repoName}
          </div>
          <div style={{ fontSize: '13px', color: '#999', lineHeight: 1.4 }}>
            {project.description}
          </div>
        </div>
        <div style={{ marginLeft: '12px', opacity: 0.5 }}>
          <ExternalLink size={16} />
        </div>
      </div>
    </a>
  );
};

const NotionView = () => {
  const { projects } = portfolioData;

  // Use the new order-preserving grouping
  const groupedProjects = groupByOrderPreserved(projects || []);

  const styles = {
    container: {
      color: '#e0e0e0',
      fontFamily: "'Inter', sans-serif",
      lineHeight: 1.6
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '16px',
      marginTop: '60px',
      borderBottom: '1px solid #333',
      paddingBottom: '8px'
    },
    yearHeader: {
      fontSize: '18px',
      fontWeight: '600',
      marginTop: '24px',
      marginBottom: '8px',
      color: '#a0a0a0'
    },
    list: {
      listStyle: 'none',
      paddingLeft: '0'
    },
    listItem: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: '4px',
      paddingLeft: '16px',
      position: 'relative'
    },
    bullet: {
      position: 'absolute',
      left: '0',
      color: '#777',
      fontSize: '14px'
    },
    itemContent: {
      fontSize: '15px'
    },
    date: {
      color: '#777',
      marginLeft: '8px',
      fontSize: '14px'
    }
  };

  return (
    <div className="section" style={{
      ...styles.container,
      maxWidth: '1200px', // 전체 너비 Hero와 통일
      margin: '0 auto',   // 화면 중앙 정렬 (컨테이너 자체)
      paddingLeft: '24px',
      paddingRight: '24px',
      width: '100%',
      // 내부 컨텐츠 정렬
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start' // 왼쪽 정렬 강제
    }}>
      {/* 내부 래퍼: Hero 섹션의 텍스트 영역 너비와 시각적으로 맞춤 */}
      <div style={{ maxWidth: '700px', width: '100%' }}>

        {/* --- 사용자 정의 섹션들 (포트폴리오, 활동 등) --- */}
        {portfolioData.sections?.map((section, sIdx) => {
          const groupedItems = groupByOrderPreserved(section.items || []);

          return (
            <section key={sIdx} style={{ marginBottom: '60px' }}>
              {/* 첫 번째 섹션에만 상단 날짜 표시 (디자인 선택) */}
              {/* 첫 번째 섹션에만 상단 날짜 표시 (제거됨) */}

              <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>{section.title}</h1>

              {groupedItems.map(([year, items]) => (
                <div key={year}>
                  <div style={styles.yearHeader}>{year}</div>
                  <ul style={styles.list}>
                    {items.map((item, idx) => (
                      <li key={idx} style={styles.listItem}>
                        <span style={styles.bullet}>•</span>
                        <span style={styles.itemContent}>
                          {item.title}
                          {item.badge && (
                            <span style={{
                              backgroundColor: 'rgba(217, 115, 13, 0.15)',
                              color: '#e38419',
                              fontSize: '12px',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              marginLeft: '8px',
                              verticalAlign: 'text-bottom'
                            }}>
                              {item.badge}
                            </span>
                          )}
                          {item.date && <span style={styles.date}>- {item.date}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}

        {/* --- 프로젝트 (별도 섹션 유지) --- */}
        <section id="projects">
          <h2 style={styles.sectionTitle}>프로젝트</h2>

          {groupedProjects.map(([year, items]) => (
            <div key={year}>
              <div style={styles.yearHeader}>{year}</div>
              <ul style={styles.list}>
                {items.map((project) => (
                  <li key={project.id} style={{ ...styles.listItem, flexDirection: 'column', alignItems: 'start' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                      <span style={styles.bullet}>•</span>
                      <span style={styles.itemContent}>
                        {/* [팀 프로젝트] 같은 접두사가 제목에 포함되어 있을 수 있음 */}
                        {project.title}
                        {project.date ? (
                          <span style={styles.date}>- {project.date}</span>
                        ) : (
                          <span style={styles.date}>- {year}</span>
                        )}
                        {/* 날짜가 별도로 없으면 연도만 표시 */}
                      </span>
                    </div>

                    {/* GitHub 카드 (Notion Embed 스타일) */}
                    <div style={{ width: '100%', paddingLeft: '0', marginTop: '4px' }}>
                      <GitHubCard project={project} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default NotionView;
