import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolio-data';

/**
 * Advanced Functional Terminal Component
 * @description Simulates a real file system with directory navigation and file reading.
 */
const Terminal = () => {
    // Simulated File System
    const fileSystem = {
        '/': ['about/', 'projects/', 'activities/', 'contact.txt'],
        '/about': ['bio.txt', 'goal.txt'],
        '/projects': portfolioData.projects.map(p => `${p.title.toLowerCase().replace(/\s+/g, '_')}.txt`),
        '/activities': ['ctf_history.txt', 'awards.txt'],
    };

    const fileContents = {
        '/about/bio.txt': portfolioData.profile.bio,
        '/about/goal.txt': 'Goal: To become a top-tier Security Researcher and Developer.',
        '/contact.txt': `Email: ${portfolioData.profile.email}\nGitHub: ${portfolioData.profile.github}`,
        ...portfolioData.projects.reduce((acc, p) => {
            acc[`/projects/${p.title.toLowerCase().replace(/\s+/g, '_')}.txt`] = 
                `Title: ${p.title}\nDescription: ${p.description}\nTags: ${p.tags.join(', ')}\nLink: ${p.link}`;
            return acc;
        }, {}),
        '/activities/ctf_history.txt': portfolioData.sections[0].items.map(i => `${i.year} - ${i.title} (${i.date})`).join('\n'),
        '/activities/awards.txt': 'Check the "Activities" section below for full visual awards and badges.',
    };

    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to DKQ307A-OS v1.1.0' },
        { type: 'output', text: 'Type "help" to see available commands.' },
    ]);
    const [currentPath, setCurrentPath] = useState('/');
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const formatPrompt = () => {
        const path = currentPath === '/' ? '~' : currentPath.replace(/^\//, '');
        return `DKQ307A@MacBook ${path} %`;
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const fullCmd = inputValue.trim();
            const [cmd, ...args] = fullCmd.split(' ');
            const target = args.join(' ');
            const newHistory = [...history, { type: 'command', text: fullCmd }];

            if (cmd) {
                switch (cmd.toLowerCase()) {
                    case 'help':
                        newHistory.push({ type: 'output', text: 'Commands: ls, cd [dir], cat [file], pwd, clear, whoami, help' });
                        break;
                    case 'whoami':
                        newHistory.push({ type: 'output', text: `User: Guest | Identity: ${portfolioData.profile.name}` });
                        break;
                    case 'clear':
                        setHistory([]);
                        setInputValue('');
                        return;
                    case 'pwd':
                        newHistory.push({ type: 'output', text: currentPath });
                        break;
                    case 'ls':
                        const contents = fileSystem[currentPath] || [];
                        newHistory.push({ type: 'output', text: contents.join('  ') });
                        break;
                    case 'cd':
                        if (!target || target === '~' || target === '/') {
                            setCurrentPath('/');
                        } else if (target === '..') {
                            if (currentPath !== '/') {
                                const parts = currentPath.split('/').filter(Boolean);
                                parts.pop();
                                setCurrentPath('/' + parts.join('/'));
                            }
                        } else {
                            const newPath = currentPath === '/' ? `/${target}` : `${currentPath}/${target}`;
                            if (fileSystem[newPath]) {
                                setCurrentPath(newPath);
                            } else {
                                newHistory.push({ type: 'output', text: `cd: no such directory: ${target}` });
                            }
                        }
                        break;
                    case 'cat':
                        if (!target) {
                            newHistory.push({ type: 'output', text: 'usage: cat [file]' });
                        } else {
                            const filePath = target.startsWith('/') ? target : (currentPath === '/' ? `/${target}` : `${currentPath}/${target}`);
                            if (fileContents[filePath]) {
                                newHistory.push({ type: 'output', text: fileContents[filePath] });
                            } else if (fileSystem[filePath]) {
                                newHistory.push({ type: 'output', text: `cat: ${target}: Is a directory` });
                            } else {
                                newHistory.push({ type: 'output', text: `cat: ${target}: No such file or directory` });
                            }
                        }
                        break;
                    default:
                        newHistory.push({ type: 'output', text: `zsh: command not found: ${cmd}` });
                }
            }

            setHistory(newHistory);
            setInputValue('');
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div 
            onClick={focusInput}
            style={{
                color: '#fff',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                lineHeight: 1.6,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                cursor: 'text'
            }}
        >
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
                {history.map((line, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                        {line.type === 'command' ? (
                            <div style={{ color: 'var(--accent-green)' }}>
                                <span style={{ opacity: 0.7 }}>{formatPrompt().replace(/ %$/, '')}</span> <span style={{ color: '#fff' }}>% {line.text}</span>
                            </div>
                        ) : (
                            <div style={{ color: '#888', whiteSpace: 'pre-wrap' }}>{line.text}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input Line */}
            <div style={{ display: 'flex', color: 'var(--accent-green)' }}>
                <span style={{ opacity: 0.7, marginRight: '8px' }}>{formatPrompt()}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleCommand}
                    autoFocus
                    style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#fff',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        flex: 1,
                        padding: 0
                    }}
                />
            </div>

            <style>{`
                input::-ms-clear { display: none; }
            `}</style>
        </div>
    );
};

export default Terminal;
