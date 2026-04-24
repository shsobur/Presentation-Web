# সমবায় সমিতি – Cooperative Societies Interactive Presentation

An immersive, multi-slide presentation exploring the role, opportunities, and challenges of cooperative societies in Bangladesh. Built with **React**, animated with **GSAP**, and styled with a modern glass-morphism aesthetic.

![Presentation Screenshot](https://res.cloudinary.com/dmfsmcy2y/image/upload/v1777024154/Screenshot_From_2026-04-24_15-47-21_ls4oq2.png)

---

## 🎯 Features

- **7 beautifully animated slides** covering:
  - Introduction to cooperatives
  - Main discussion topics (grid layout)
  - Opportunities & challenges
  - Solutions & concluding remarks
- **Bilingual support** – seamless toggling between **Bangla** and **English**
- **Glass-morphism cards** with smooth GSAP entrance animations and hover effects
- **Sci-fi loading screen** with splash gate and boot sequence animation
- **Custom ambient background** – breathing radial gradients with diagonal mesh
- **Left-side glass navigator** – slide-to-slide navigation with tooltips
- **Responsive design** – works on desktops, tablets, and mobile devices
- **Developer outro** – a cinematic "Mission Passed" screen with social links

---

## 🛠 Tech Stack

| Technology       | Purpose                                                           |
| ---------------- | ----------------------------------------------------------------- |
| **React**        | UI framework (functional components + hooks)                      |
| **GSAP**         | Page transitions, entrance animations, micro-interactions         |
| **Three.js**     | 3D animated background on the intro page                          |
| **React Router** | Client-side routing between intro and slides                      |
| **React Icons**  | Social and UI icons                                               |
| **CSS3**         | Custom properties, backdrop-filter, gradients, responsive layouts |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shsobur/Presentation-Web.git
cd cooperative-presentation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for production

```bash
npm run build
```

> If you don't have a repository yet, skip step 1 and run the project locally from the project folder.

---

## 📂 Project Structure

```
src/
├── assets/
│   ├── p1.jpg                      # Team member photos
│   ├── p2.jpg
│   └── p3.jpg
│
├── Components/
│   ├── ThreeDBackground/           # Three.js animated background (intro)
│   ├── SlideBackground/            # Ambient CSS background (slides)
│   ├── SlideNavigator/             # Fixed left-side glass navigator
│   └── LoadingScreen/              # Sci-fi boot loader with splash gate
│
├── Pages/
│   ├── HomePage/
│   │   ├── HomePageLayout.jsx      # Root layout — splash + loader + intro
│   │   └── Intro/
│   │       └── Intro.jsx           # GSAP cinematic intro sequence
│   │
│   └── SlidesPage/
│       ├── SlidesPageLayout.jsx    # Manages scroll, active state, refs
│       ├── Slide01/                # Title & Introduction
│       ├── Slide02/                # Topics Overview (2×2 grid)
│       ├── Slide03/                # Brief Introduction (grid cards)
│       ├── Slide04/                # Opportunities (2-col grid)
│       ├── Slide05/                # Challenges (2×3 grid)
│       ├── Slide06/                # Solutions (2×3 grid)
│       └── Slide07/                # Conclusion (centered text)
│
├── App.jsx
└── main.jsx
```

---

## 🖼 Screenshots

| Slide   | Description                       |
| ------- | --------------------------------- |
| Slide 1 | Introduction with language toggle |
| Slide 2 | Topics in a 2-column grid         |
| Slide 3 | Overview cards                    |
| Slide 4 | Opportunities grid                |
| Slide 5 | Challenges grid                   |
| Slide 6 | Solutions grid                    |
| Slide 7 | Conclusion                        |

> Replace `screenshot.png` with your own image and add more screenshots to the table as needed.

---

## 🧑‍💻 About the Developer

**Sobur Hossen** – MERN Stack Developer  
Passionate about crafting beautiful, performant web experiences.

- 🐙 GitHub: [@shsobur](https://github.com/shsobur)
- 💼 LinkedIn: [soburhossen](https://linkedin.com/in/soburhossen)
- 🌐 Portfolio: [portfolio-2-c48ba.web.app](https://portfolio-2-c48ba.web.app)

---

Built with care and a lot of GSAP magic. ✨