import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState('');
    const [commandIndex, setCommandIndex] = useState(0);
    const scrollRef = useRef(null);

    const commands = [
        { cmd: "whoami", output: "NiceTop / dkq-k" },
        { cmd: "ls -R /2026", output: "./CodeGate_CTF  ./Kalmar_CTF  ./CyberGAME" },
        { cmd: "cat ja_korea.txt", output: "Status: 2026 JA Korea Activity Logged. [4/4]" },
        { cmd: "cat status", output: "System Online. Latest 2026 data synchronized." }
    ];

    useEffect(() => {
        let charIndex = 0;
        let timeout;

        const typeCommand = () => {
            if (commandIndex >= commands.length) return;
            const targetCommand = commands[commandIndex].cmd;

            if (charIndex < targetCommand.length) {
                setCurrentLine(targetCommand.substring(0, charIndex + 1));
                charIndex++;
                timeout = setTimeout(typeCommand, 40 + Math.random() * 40);
            } else {
                timeout = setTimeout(() => {
                    setLines(prev => [
                        ...prev,
                        { type: 'command', text: targetCommand },
                        { type: 'output', text: commands[commandIndex].output }
                    ]);
                    setCurrentLine('');
                    charIndex = 0;
                    setCommandIndex(prev => prev + 1);
                }, 400);
            }
        };

        if (commandIndex < commands.length) {
            timeout = setTimeout(typeCommand, 600);
        }
        return () => clearTimeout(timeout);
    }, [commandIndex]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines, currentLine]);

    return (
        <div ref={scrollRef} style={{
            color: '#fff',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            lineHeight: 1.6,
            height: '100%',
            overflowY: 'auto',
            textAlign: 'left'
        }}>
            {lines.map((line, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                    {line.type === 'command' ? (
                        <div style={{ color: 'var(--accent-green)' }}>
                            <span style={{ opacity: 0.7 }}>cr4ne@MacBook ~ %</span> <span style={{ color: '#fff' }}>{line.text}</span>
                        </div>
                    ) : (
                        <div style={{ color: '#555', paddingLeft: '0' }}>{line.text}</div>
                    )}
                </div>
            ))}

            {/* Current typing line */}
            {commandIndex < commands.length && (
                <div style={{ color: 'var(--accent-green)' }}>
                    <span style={{ opacity: 0.7 }}>cr4ne@MacBook ~ %</span> <span style={{ color: '#fff' }}>{currentLine}</span>
                    <span style={{ animation: 'blink 1s infinite', background: '#fff', color: '#fff' }}>_</span>
                </div>
            )}

            {/* Final cursor */}
            {commandIndex >= commands.length && (
                <div style={{ color: 'var(--accent-green)' }}>
                    <span style={{ opacity: 0.7 }}>cr4ne@MacBook ~ %</span>
                    <span style={{ animation: 'blink 1s infinite', background: '#fff', color: '#fff', marginLeft: '8px' }}>_</span>
                </div>
            )}

            <style>{`
      `}</style>
        </div>
    );
};

export default Terminal;
