import React from 'react';
import { portfolioData } from '../../data/portfolio-data';
import { Github, ExternalLink } from 'lucide-react';

/**
 * Minimalist Project Card
 */
const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-view"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
        marginBottom: '16px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <Github size={18} color="var(--text-secondary)" />
        <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{project.title}</h4>
        <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 12px 0', lineHeight: 1.5 }}>
        {project.description}
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {project.tags?.map(tag => (
          <span key={tag} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', border: '1px solid #333', padding: '2px 8px', borderRadius: '4px' }}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};

const MinimalistView = () => {
  return (
    <div className="container" style={{ paddingBottom: '150px', maxWidth: 'var(--spacing-container)' }}>
      
      {/* Activity Sections (CTF, Activities, etc.) */}
      {portfolioData.sections?.map((section, sIdx) => {
        // Group items by year
        const years = [...new Set(section.items.map(item => item.year))].sort((a, b) => b - a);
        
        return (
          <section key={sIdx} style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '40px' }}>{section.title}</h2>
            
            {years.map(year => (
              <div key={year} style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1rem', color: '#fff', fontWeight: 700, marginBottom: '16px' }}>{year}</h3>
                <ul className="minimal-list">
                  {section.items.filter(item => item.year === year).map((item, iIdx) => (
                    <li key={iIdx}>
                      <span style={{ color: 'var(--text-primary)' }}>{item.title}</span>
                      {item.badge && (
                        <span style={{ marginLeft: '8px', color: '#ffd700', fontSize: '0.8rem', fontWeight: 600 }}>
                          🏆 {item.badge}
                        </span>
                      )}
                      <span style={{ marginLeft: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        — {item.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        );
      })}

      {/* Projects Section */}
      <section id="projects">
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '40px' }}>프로젝트</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {portfolioData.projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <div style={{ marginTop: '100px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p>© 2026 {portfolioData.profile.name}. All rights reserved.</p>
        <p style={{ marginTop: '8px' }}>4월 5일 편집 · 공유</p>
      </div>
    </div>
  );
};

export default MinimalistView;
