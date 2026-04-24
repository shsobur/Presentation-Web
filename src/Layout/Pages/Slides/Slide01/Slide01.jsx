import "./Slide01.css";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import { useState, useRef, useEffect, useCallback } from "react";

// ====== Static content for multi-language support ======
const CONTENT = {
  bn: {
    other: "EN",
    title: "বাংলাদেশে সমবায় সমিতি",
    subtitle: "সম্ভাবনা ও সংকট",
    body: "বাংলাদেশের অর্থনৈতিক ও সামাজিক উন্নয়নে সমবায় সমিতির গুরুত্ব অপরিসীম। এই উপস্থাপনায় আমরা সমবায়ের সম্ভাবনা, মুখোমুখি সংকট এবং সমাধানের উপায় নিয়ে আলোচনা করব।",
    next: "পরবর্তী",
  },
  en: {
    other: "বাং",
    title: "Cooperative Societies in Bangladesh",
    subtitle: "Opportunities & Challenges",
    body: "Cooperative societies play a very important role in the economic and social development of Bangladesh. In this presentation, we will discuss the opportunities of cooperatives, the challenges they face, and possible solutions.",
    next: "Next",
  },
};

// ====== Main Slide Component ======
const Slide01 = ({ onNext }) => {
  const [lang, setLang] = useState("bn"); // current language__
  const c = CONTENT[lang]; // selected content__

  const cardRef = useRef(null); // card ref__
  const contentRef = useRef(null); // content ref__
  const isAnimating = useRef(false); // animation lock__

  // ====== Card entrance animation on mount ======
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 0, y: 60, scale: 0.97 });

    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.15,
    });

    const els = card.querySelectorAll("[data-anim]"); // target elements__

    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.09, // step animation__
        delay: 0.4,
        clearProps: "opacity,transform",
      },
    );
  }, []);

  // ====== Language toggle with smooth animation ======
  const handleToggle = useCallback(() => {
    if (isAnimating.current) return; // prevent spam click__
    isAnimating.current = true;

    const inner = contentRef.current;
    if (!inner) {
      isAnimating.current = false;
      return;
    }

    gsap.to(inner, {
      opacity: 0,
      y: -8,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setLang((l) => (l === "bn" ? "en" : "bn")); // toggle lang__

        gsap.fromTo(
          inner,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false; // unlock__
            },
          },
        );
      },
    });
  }, []);

  return (
    <div className="s01-root">
      <div ref={cardRef} className="s01-card">
        {/* Four corner accents */}
        <div className="s01-corner s01-corner--tl" />
        <div className="s01-corner s01-corner--tr" />
        <div className="s01-corner s01-corner--bl" />
        <div className="s01-corner s01-corner--br" />

        {/* Top accent line */}
        <div className="s01-accent" />

        {/* Header */}
        <div className="s01-header" data-anim>
          <span className="s01-slide-num">01 / 08</span>
          <button
            className="s01-toggle"
            onClick={handleToggle}
            aria-label="Switch language"
          >
            <span className="s01-toggle-track">
              <span
                className={`s01-toggle-thumb ${
                  lang === "en" ? "s01-toggle-thumb--right" : ""
                }`} // thumb move based on lang__
              />
            </span>
            <span className="s01-toggle-label">{c.other}</span>
          </button>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="s01-body">
          <h1 className="s01-title" data-anim>
            {c.title}
          </h1>
          <h2 className="s01-subtitle" data-anim>
            {c.subtitle}
          </h2>
          <div className="s01-divider" data-anim />
          <p className="s01-desc" data-anim>
            {c.body}
          </p>
        </div>

        {/* Footer */}
        <div className="s01-footer" data-anim>
          <button className="s01-next" onClick={onNext}>
            <span>{c.next}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 3L9 15M9 15L4 10M9 15L14 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

Slide01.propTypes = {
  onNext: PropTypes.func.isRequired, // required function__
};

export default Slide01;