# 포트폴리오 웹사이트 템플릿

React, Vite, React Router로 만든 현대적이고 반응형 포트폴리오 웹사이트입니다.

## 주요 기능

- 모던하고 깔끔한 디자인
- 반응형 레이아웃
- GitHub 연동 (저장소 자동 표시)
- 프로젝트 쇼케이스
- 연락처 섹션
- Vite 기반 빠른 성능

## 빠른 시작

### 사전 요구사항

- Node.js 18 이상 설치
- GitHub 계정
- Vercel 계정 (무료 플랜 가능)

### 설치 방법

1. **저장소 복사 또는 다운로드**
   ```bash
   git clone <당신의-저장소-URL>
   cd DKQ307A
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   
   브라우저에서 [http://localhost:5173](http://localhost:5173)을 열어주세요.
## 커스터마이징

### 1. 개인 정보 수정

다음 파일들을 수정하여 본인의 정보를 입력하세요:

- **`src/`** - 개인 정보, 소셜 링크, 콘텐츠 수정
- **`public/`** - 파비콘 및 이미지 교체
- **`index.html`** - 페이지 제목 및 메타 태그 수정

### 2. GitHub 연동

GitHub API로 저장소를 표시하려면:

1. [GitHub 설정 → Tokens](https://github.com/settings/tokens)에서 Personal Access Token 생성
2. 환경 변수에 추가 (아래 참고)

## Vercel 배포하기

### 방법 1: GitHub + Vercel 연동 (권장)

1. **GitHub에 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <당신의-GitHub-저장소-URL>
   git push -u origin main
   ```

2. **Vercel에서 배포**
   - [vercel.com](https://vercel.com) 접속
   - "Add New Project" 클릭
   - GitHub 저장소 Import
   - Vercel이 자동으로 Vite 설정 감지
   - "Deploy" 클릭

3. **환경 변수 설정** (필요한 경우)
   - Vercel 대시보드 → Settings → Environment Variables
   - 필요한 변수 추가 (예: `VITE_GITHUB_TOKEN`)

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

##  환경 변수

프로젝트 루트에 `.env` 파일 생성 (이미 `.gitignore`에 포함됨):

```env
VITE_GITHUB_TOKEN=당신의_github_토큰
VITE_GITHUB_USERNAME=당신의_사용자명
```

## 사용 가능한 스크립트

- `npm run dev` - 개발 서버 시작
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 프로덕션 빌드 미리보기
- `npm run lint` - ESLint 실행

## 기술 스택

- **React 19** - UI 라이브러리
- **Vite 5** - 빌드 도구
- **React Router** - 라우팅
- **Lucide React** - 아이콘
- **Octokit** - GitHub API 연동

##  라이선스

이 템플릿을 자유롭게 사용하여 본인의 포트폴리오를 만드세요!

##  크레딧

Original template by [DKQ307A](https://github.com/dkq-k)
