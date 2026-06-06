/**
 * @file portfolio-data.js
 * @description 포트폴리오 웹사이트의 콘텐츠를 관리하는 데이터 파일입니다.
 * 이 파일의 내용을 수정하면 웹사이트에 즉시 반영됩니다.
 * 
 * 1. profile: 개인 정보, 소개글, SNS 링크
 * 2. skills: 보유 기술 및 숙련도
 * 3. projects: 프로젝트 목록 및 상세 정보
 */

export const portfolioData = {
  // 프로필 섹션 정보
  profile: {
    name: "Abdullah",
    role: "덕영고등학교 | NiceTop 소속",
    bio: "정보 보안을 공부하는 학생입니다. System Hacking과 Cryptography를 중심적으로 공부하고 있습니다.",
    email: "ab1315271@gmail.com",
    github: "https://github.com/dkq-k",
    avatar: "/images/avatar.png",
  },

  // 기술 스택
  skills: [
    { name: "Pwnable", icon: "security" },
    { name: "Web Hacking", icon: "security" },
    { name: "Python", icon: "python" },
    { name: "React", icon: "react" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Malware Analysis", icon: "security" },
    { name: "System Reconstruction", icon: "security" },
    { name: "Log Analysis", icon: "security" },
  ],

  // 프로젝트 목록
  projects: [
    {
      id: 1,
      title: "NT_SecurityChallenges",
      description: "정보보안 교육 용 웹 사이트",
      tags: ["React", "Firebase", "Web"],
      link: "https://nicetop.dyhs.kr",
      image: "/images/project1.png",
      year: "2025",
      date: "3/22"
    },
    {
      id: 2,
      title: "덕영 골든벨",
      description: "교내 골든벨 대회 진행을 위한 웹 사이트",
      tags: ["Web", "React", "JavaScript"],
      link: "http://goldenbell.dyhs.kr/",
      image: "/images/project2.png",
      year: "2025",
      date: "12/31"
    },
    {
      id: 3,
      title: "AsciiTerminal.py",
      description: "BadUSB 파일을 응용한 재밌는 바이러스(무해함)",
      tags: ["Python", "Ascii", "Terminal"],
      link: "https://github.com/dkq-k/BadUSB-1.git",
      image: "/images/project3.png",
      year: "2026",
      date: "1/7"
    }
  ],

  // 수상 및 활동
  sections: [
    {
      title: "CTF 참가 이력",
      items: [
        // 2024
        { year: "2024", title: "사이버 가디언즈 경진대회 본선 13위", date: "10/30" },
        { year: "2024", title: "LG U+ SecurityHackathon 예선", date: "11/16" },

        // 2025
        { year: "2025", title: "아주대학교 해킹경진대회 예선", date: "6/21" },
        { year: "2025", title: "2025 HackQuest", date: "7/5" },
        { year: "2025", title: "YISF 순천향대학교 정보보호 페스티벌", date: "8/8" },
        { year: "2025", title: "2025 사이버가디언즈 경진대회 본선", date: "9/9", badge: "4위(장려상) 🏆" },
        { year: "2025", title: "2025 육군 사이버보안 경진대회 본선 진출", date: "9/18" },
        { year: "2025", title: "LG U+ SecurityHackathon 예선", date: "9/28" },
        { year: "2025", title: "경기도 미래 창업가 발굴 프로그램", date: "10/27 ~ 11/29" },
        { year: "2025", title: "2025 경기 콘텐츠 창의학교 경진대회", date: "11/7" },
        { year: "2025", title: "2025년 Al-Security 창의 캠프 이수증", date: "11/10" },
        { year: "2025", title: "2025 Layer7 CTF", date: "11/15" },

        // 2026
        { year: "2026", title: "2026 Kalmar CTF", date: "3/27 ~ 3/29" },
        { year: "2026", title: "2026 CodeGate CTF", date: "3/28" },
        { year: "2026", title: "2026 CyberGAME", date: "4/2" },
        { year: "2026", title: "2026 RITSEC CTF", date: "4/3 ~ 4/5" }
      ]
    },
    {
      title: "활동 내역",
      items: [
        // 2024
        { year: "2024", title: "2024 Codegate 컨퍼런스", date: "8/30" },
        { year: "2024", title: "2024 경기시청자미디어센터 고교학점제 미디어 교육 수료", date: "9/9" },
        { year: "2024", title: "2024 사이버 가디언즈 정보보안 교육 프로그램 이수", date: "12/27" },

        // 2025
        { year: "2025", title: "2025 .HACK 컨퍼런스", date: "4/9" },
        { year: "2025", title: "용인 미르스타디움 NT_SecurityChallenges 전시", date: "5/23" },
        { year: "2025", title: "2025 대한민국 학생창의력 챔피언대회 경기도지역예선", date: "7/5" },
        { year: "2025", title: "2025 Codegate 컨퍼런스", date: "7/11" },
        { year: "2025", title: "경기대학교 디지털새싹 K-SW 안전탐험캠프 나도 프로파일러 : AI기반 스마트 범죄 예방 수료", date: "7/18" },
        { year: "2025", title: "용인 북 페스티벌 NT_SecurityChallenges 전시(CTF를 퀴즈로 이용)", date: "10/18" },
        { year: "2025", title: "2025 사이버 가디언즈 경진대회 장려상", date: "10/30" },
        { year: "2025", title: "경기 콘텐츠 창의 학교 NT_SecurityChallenges 전시", date: "11/7" },
        { year: "2025", title: "단국대학교 AI-Security 창의 캠프 이수", date: "11/10" },
        { year: "2025", title: "(주)지오유 : 웹 개발 교육", date: "9/7 ~ 2026/1/2" },

        // 2026
        { year: "2026", title: "주관 The Asia Foundation 후원 Microsoft 협력 BUSINESS H4C - Skills2Work-Seoul", date: "1/12 ~ 1/21" },
        { year: "2026", title: "서울여대 정보보호영재교육원 전문RnE 합격", date: "2/11" },
        { year: "2026", title: "(주)플럭스웨어 창업", date: "2/19" },
        { year: "2026", title: "2026 JA Korea", date: "4/4" },
        { year: "2026", title: "2026년 해킹팀 KR-X 합류하여 활동 중", date: "4/17" },
        { year: "2026", title: "제2회 경기 청소년 사이버 보안 캠프", date: "4/27 ~ 9/30" }
      ]
    }
  ]
};
