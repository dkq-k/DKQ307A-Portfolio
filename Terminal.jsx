import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState('');
    const [commandIndex, setCommandIndex] = useState(0);
    const scrollRef = useRef(null);

    const commands = [
        { cmd: "whoami", output: "Abdullah (NT_DKQ307A)" },
        { cmd: "cat skills.txt", output: "System Hacking, Pwnable, Cryptography, Web Security" },
        { cmd: "date", output: new Date().toDateString() },
        { cmd: "./welcome.sh", output: "Access Granted. Welcome to my secure portfolio." }
    ];

    useEffect(() => {
        let charIndex = 0;
        let timeout;

        // 타자기 효과로 커맨드 입력
        const typeCommand = () => {
            if (commandIndex >= commands.length) return;

            const targetCommand = commands[commandIndex].cmd;

            if (charIndex < targetCommand.length) {
                setCurrentLine(targetCommand.substring(0, charIndex + 1));
                charIndex++;
                timeout = setTimeout(typeCommand, 50 + Math.random() * 50);
            } else {
                // 커맨드 입력 완료 후 엔터 처리 (출력 표시)
                timeout = setTimeout(() => {
                    setLines(prev => [
                        ...prev,
                        { type: 'command', text: targetCommand },
                        { type: 'output', text: commands[commandIndex].output }
                    ]);
                    setCurrentLine('');
                    charIndex = 0;
                    setCommandIndex(prev => prev + 1);
                }, 300);
            }
        };

        if (commandIndex < commands.length) {
            timeout = setTimeout(typeCommand, 800);
        }

        return () => clearTimeout(timeout);
    }, [commandIndex]);

    // 자동 스크롤
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines, currentLine]);

    return (
        <div className="terminal-window" style={{
            background: 'rgba(0, 0, 0, 0.9)', // 더 진한 배경
            backdropFilter: 'blur(10px)',
            borderRadius: '12px', // 둥글게
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)', // 깊은 그림자
            width: '100%',
            maxWidth: '600px',
            height: '280px', // 높이 조정
            fontFamily: "'Fira Code', 'Consolas', monospace",
            fontSize: '13px', // 폰트 약간 작게
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            // marginTop 제거됨
        }}>
            {/* 터미널 상단 바 */}
            <div style={{
                background: '#1a1a1a',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #333'
            }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }}></div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', color: '#666', fontSize: '12px' }}>dkq307a@kali:~</div>
            </div>

            {/* 터미널 내용 */}
            <div ref={scrollRef} style={{
                padding: '16px',
                color: '#e0e0e0',
                overflowY: 'auto',
                flex: 1
            }}>
                {lines.map((line, i) => (
                    <div key={i} style={{ marginBottom: '4px' }}>
                        {line.type === 'command' ? (
                            <span style={{ color: '#00ff00' }}>➜ ~ <span style={{ color: '#fff' }}>{line.text}</span></span>
                        ) : (
                            <div style={{ color: '#aaa', paddingLeft: '0' }}>{line.text}</div>
                        )}
                    </div>
                ))}

                {/* 현재 입력 중인 라인 */}
                {commandIndex < commands.length && (
                    <div>
                        <span style={{ color: '#00ff00' }}>➜ ~ </span>
                        <span>{currentLine}</span>
                        <span style={{ animation: 'blink 1s infinite' }}>_</span>
                    </div>
                )}

                {/* 완료 후 커서 */}
                {commandIndex >= commands.length && (
                    <div>
                        <span style={{ color: '#00ff00' }}>➜ ~ </span>
                        <span style={{ animation: 'blink 1s infinite' }}>_</span>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default Terminal;
