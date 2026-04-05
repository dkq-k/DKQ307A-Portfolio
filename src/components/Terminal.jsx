import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolio-data';

/**
 * Functional Terminal Component
 * @description Allows real-time command execution and interaction.
 */
const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to DKQ307A-OS v1.0.0' },
        { type: 'output', text: 'Type "help" to see available commands.' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const commands = {
        help: () => 'Available commands: about, projects, activities, contact, whoami, clear, help',
        whoami: () => `User: Guest | Identity: ${portfolioData.profile.name}`,
        about: () => portfolioData.profile.bio,
        clear: () => {
            setHistory([]);
            return null;
        },
        ls: () => 'projects/  activities/  skills.txt',
        projects: () => portfolioData.projects.map(p => `• ${p.title}`).join('\n'),
        activities: () => 'Visit the "Activities" section below for the full 2024-2026 history.',
        contact: () => `GitHub: ${portfolioData.profile.github}`,
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = inputValue.trim().toLowerCase();
            const newHistory = [...history, { type: 'command', text: cmd }];

            if (cmd) {
                if (commands[cmd]) {
                    const output = commands[cmd]();
                    if (output) {
                        newHistory.push({ type: 'output', text: output });
                    }
                } else {
                    newHistory.push({ type: 'output', text: `Command not found: ${cmd}. Type "help" for a list of commands.` });
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
                                <span style={{ opacity: 0.7 }}>DKQ307A@MacBook ~ %</span> <span style={{ color: '#fff' }}>{line.text}</span>
                            </div>
                        ) : (
                            <div style={{ color: '#888', whiteSpace: 'pre-wrap' }}>{line.text}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Input Line */}
            <div style={{ display: 'flex', color: 'var(--accent-green)' }}>
                <span style={{ opacity: 0.7, marginRight: '8px' }}>DKQ307A@MacBook ~ %</span>
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
