/* =========================================================
   작품 목록 · 사이트 설정
   ---------------------------------------------------------
   새 작품 추가 방법
   1. images 폴더에 사진을 올린다 (파일명은 영어 소문자, 띄어쓰기 대신 -)
   2. 아래 목록에서 한 줄을 복사해 붙이고 내용을 바꾼다
      - 큰따옴표 " " 와 줄 끝의 쉼표 , 를 지우지 않도록 주의
      - 같은 연도 안에서는 목록 위쪽에 있을수록 앞에 나온다
   선택 항목
      main: true   → 메인 페이지 슬라이드에 나온다 (목록 순서대로)
      medium: "종이에 아크릴", mediumEn: "Acrylic on paper"
                   → 재료가 캔버스에 유화가 아닐 때만 적는다
   ========================================================= */

/* Exhibitions 메뉴: 보이게 하려면 false 를 true 로 */
const SHOW_EXHIBITIONS = false;

/* 이 연도까지의 작품은 Work 페이지 맨 아래 Earlier works 로 묶인다
   (해당 작품이 하나도 없으면 Earlier works 는 보이지 않는다) */
const EARLIER_UNTIL = 2020;

/* 재료를 따로 적지 않은 작품에 쓰이는 기본값 */
const DEFAULT_MEDIUM = { ko: "캔버스에 유화", en: "Oil on canvas" };

const WORKS = [
  { ko: "떨어지는 해", en: "Sundown", size: "91.0 × 116.8 cm", year: 2026, img: "sundown.jpg" },
  { ko: "바람", en: "Wind", size: "31.8 × 40.9 cm", year: 2026, img: "wind.jpg" },
  { ko: "바람, 노을", en: "Wind at Dusk", size: "91.0 × 116.8 cm", year: 2026, img: "wind-at-dusk.jpg" },
  { ko: "오후 : 빛", en: "Afternoon : Light", size: "72.7 × 72.7 cm", year: 2026, img: "afternoon-light.jpg" },
  { ko: "오후 : 잔상", en: "Afternoon : Afterimage", size: "72.7 × 72.7 cm", year: 2026, img: "afternoon-afterimage.jpg" },  { ko: "흔들리고 부유하는", en: "Drifting and Swaying", size: "112.1 × 145.5 cm", year: 2025, img: "drifting-and-swaying.jpg", main: true },
  { ko: "흔들리는 수면", en: "Wavering Surface", size: "130.3 × 162.2 cm", year: 2025, img: "wavering-surface.jpg", main: true },
  { ko: "푸른빛에 덮인", en: "Veiled in Blue", size: "72.7 × 90.9 cm", year: 2025, img: "veiled-in-blue.jpg" },
  { ko: "해질녘의 방", en: "Sunset in the Room", size: "91.0 × 116.8 cm", year: 2025, img: "sunset-in-the-room.jpg", main: true },
  { ko: "유영하는 시선", en: "A Floating Gaze", size: "50.0 × 60.6 cm", year: 2025, img: "a-floating-gaze.jpg" },
  { ko: "새벽", en: "Dawn", size: "72.7 × 90.9 cm", year: 2025, img: "dawn.jpg" },
  { ko: "수면의 경계", en: "The Edge of the Surface", size: "91.0 × 116.8 cm", year: 2025, img: "the-edge-of-the-surface.jpg" },
  { ko: "부유하는 그림자", en: "Floating Shadow", size: "31.8 × 40.9 cm", year: 2025, img: "floating-shadow.jpg" },
  { ko: "물든 공기", en: "Tinted Air", size: "40.9 × 53.0 cm", year: 2025, img: "tinted-air.jpg" },
  { ko: "가라앉은 빛", en: "Submerged Light", size: "31.8 × 40.9 cm", year: 2025, img: "submerged-light.jpg" },
  { ko: "석양", en: "Sunset", size: "130.3 × 162.2 cm", year: 2022, img: "sunset.jpg", main: true },
  { ko: "푸른 밤", en: "Blue Night", size: "112.1 × 145.5 cm", year: 2022, img: "blue-night.jpg" },
  { ko: "눈을 감으면", en: "When I Close My Eyes", size: "31.8 × 31.8 cm", year: 2022, img: "when-i-close-my-eyes.jpg" },
  { ko: "상상하다", en: "I Can Imagine", size: "31.8 × 31.8 cm", year: 2022, img: "i-can-imagine.jpg" },
  { ko: "초록의 꿈", en: "Dream in the Green", size: "31.8 × 31.8 cm", year: 2022, img: "dream-in-the-green.jpg" },
  { ko: "보이지 않는 세계", en: "I Cannot See Everything", size: "97.0 × 130.3 cm", year: 2021, img: "i-cannot-see-everything.jpg" },
  { ko: "겨울의 잔상", en: "Mixed Winter", size: "97.0 × 130.3 cm", year: 2021, img: "mixed-winter.jpg" },
  { ko: "허공의 방", en: "A Blue Room in the Air", size: "90.0 × 120.0 cm", year: 2021, img: "a-blue-room-in-the-air.jpg", main: true },
  { ko: "길을 잃다", en: "I lost my way", size: "45.5 × 53.5 cm", year: 2021, img: "i-lost-my-way.jpg" },
  { ko: "강 위의 안개", en: "River Fog", size: "45.5 × 53.5 cm", year: 2021, img: "river-fog.jpg" },
];
