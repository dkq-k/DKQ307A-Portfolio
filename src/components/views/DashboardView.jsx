import React from 'react';
import { portfolioData } from '../../data/portfolio-data';
import { Github, ExternalLink } from 'lucide-react';

/**
 * Utility to group items by their 'year' (or section title) preserving the original array order.
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
 * Cyber-Dashboard Style GitHub Card
 */
const GitHubCard = ({ project }) => {
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
      className="glass-card dashboard-border"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: '#e0e0e0',
        overflow: 'hidden',
        maxWidth: '100%'
      }}
    >
      {project.image && (
        <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderBottom: '1px solid rgba(0, 243, 255, 0.1)' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
      )}
      
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <Github size={20} color="var(--accent-cyan)" style={{ marginRight: '10px' }} />
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff', letterSpacing: '1px' }}>
            {owner} / {repoName}
          </span>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, height: '40px', overflow: 'hidden' }}>
          {project.description}
        </div>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
             {project.tags?.map(tag => (
               <span key={tag} style={{ fontSize: '10px', color: 'var(--accent-cyan)', background: 'rgba(0, 243, 255, 0.05)', padding: '2px 6px', borderRadius: '2px', border: '1px solid rgba(0, 243, 255, 0.1)' }}>{tag}</span>
             ))}
          </div>
          <ExternalLink size={14} opacity={0.5} />
        </div>
      </div>
    </a>
  );
};

const DashboardView = () => {
  const { projects } = portfolioData;

  return (
    <div className="section container" style={{ paddingBottom: '120px' }}>
      {/* Activity Sections */}
      {portfolioData.sections?.map((section, sIdx) => {
        const groupedItems = groupByOrderPreserved(section.items || []);
        return (
          <section key={sIdx} style={{ marginBottom: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', margin: 0, color: '#fff', letterSpacing: '2px' }}>{section.title}</h2>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-gradient)', opacity: 0.2 }}></div>
            </div>
            
            {groupedItems.map(([year, items]) => (
              <div key={year} style={{ marginBottom: '40px' }}>
                <div style={{ 
                  color: 'var(--accent-cyan)', 
                  fontSize: '13px', 
                  fontWeight: 800, 
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ width: '10px', height: '10px', background: 'var(--accent-cyan)', borderRadius: '2px', transform: 'rotate(45deg)' }}></span>
                  DATA_YEAR_{year}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '15px' }}>
                  {items.map((item, idx) => (
                    <div key={idx} className="glass-card dashboard-border" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{item.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '1px' }}>STATUS_LOG: {item.date}</div>
                      </div>
                      {item.badge && (
                        <div className="neon-text" style={{ 
                          fontSize: '11px', 
                          padding: '6px 12px', 
                          background: 'rgba(0, 243, 255, 0.05)',
                          border: '1px solid var(--accent-cyan)',
                          borderRadius: '2px',
                          fontWeight: 700
                        }}>
                          {item.badge}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      {/* Projects Section */}
      <section id="projects">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '24px', margin: 0, color: '#fff', letterSpacing: '2px' }}>MISSION_ARCHIVES [PROJECTS]</h2>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-gradient)', opacity: 0.2 }}></div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' }}>
          {projects?.map((project) => (
            <GitHubCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
