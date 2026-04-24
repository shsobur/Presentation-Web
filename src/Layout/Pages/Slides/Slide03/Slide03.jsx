import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import "./Slide03.css";

const CONTENT = {
  bn: {
    heading: "বাংলাদেশে সমবায় সমিতি: একটি সংক্ষেপিত পরিচিতি",
    items: [
      {
        label: "মূলনীতি",
        text: "এর মূলমন্ত্র হলো 'একতাই বল' এবং 'সকলের তরে সকলে আমরা', যা সদস্যদের মধ্যে ঐক্য ও পারস্পরিক সহযোগিতাকে উৎসাহিত করে।",
      },
      {
        label: "আইন",
        text: "বাংলাদেশে সমবায় সমিতি ২০০১ সালের সমবায় আইন দ্বারা পরিচালিত হয়, যা এর গঠন, পরিচালনা ও নিয়ন্ত্রণের ভিত্তি।",
      },
      {
        label: "সদস্য সংখ্যা",
        text: "একটি প্রাথমিক সমিতির জন্য ন্যূনতম ২০ জন এবং কেন্দ্রীয় বা জাতীয় সমিতির জন্য ১০ জন প্রাতিষ্ঠানিক সদস্যের প্রয়োজন হয়।",
      },
      {
        label: "উদাহরণ",
        text: "মিল্ক ভিটা, ব্র্যাক এবং বিভিন্ন কৃষি সমবায় বাংলাদেশে সফল সমবায় সমিতির উজ্জ্বল দৃষ্টান্ত।",
      },
    ],
    prev: "পূর্ববর্তী",
    next: "পরবর্তী",
  },
  en: {
    heading: "Cooperative Societies in Bangladesh: A Brief Introduction",
    items: [
      {
        label: "Principles",
        text: 'Its main motto is "Unity is Strength" and "All for one, and one for all," which encourage unity and mutual cooperation among members.',
      },
      {
        label: "Law",
        text: "In Bangladesh, cooperative societies are governed by the Cooperative Societies Act, 2001, which provides the basis for their formation, operation, and regulation.",
      },
      {
        label: "Membership",
        text: "A primary society requires a minimum of 20 members, while a central or national society requires at least 10 institutional members.",
      },
      {
        label: "Examples",
        text: "Milk Vita, BRAC, and various agricultural cooperatives are notable examples of successful cooperative societies in Bangladesh.",
      },
    ],
    prev: "Previous",
    next: "Next",
  },
};

const Slide03 = ({ onNext, onPrev }) => {
  const [lang, setLang] = useState("bn");
  const c = CONTENT[lang];

  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const isAnimating = useRef(false);

  // Mount entrance animation
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

    const els = card.querySelectorAll("[data-anim]");
    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.09,
        delay: 0.4,
        clearProps: "opacity,transform",
      },
    );
  }, []);

  // Language toggle crossfade
  const handleToggle = useCallback(() => {
    if (isAnimating.current) return;
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
        setLang((l) => (l === "bn" ? "en" : "bn"));
        gsap.fromTo(
          inner,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  }, []);

  return (
    <div className="s03-root">
      <div ref={cardRef} className="s03-card">
        {/* Four corner accents */}
        <div className="s03-corner s03-corner--tl" />
        <div className="s03-corner s03-corner--tr" />
        <div className="s03-corner s03-corner--bl" />
        <div className="s03-corner s03-corner--br" />

        {/* Top accent line */}
        <div className="s03-accent" />

        {/* Header */}
        <div className="s03-header" data-anim>
          <span className="s03-slide-num">03 / 08</span>
          <button
            className="s03-toggle"
            onClick={handleToggle}
            aria-label="Switch language"
          >
            <span className="s03-toggle-track">
              <span
                className={`s03-toggle-thumb ${
                  lang === "en" ? "s03-toggle-thumb--right" : ""
                }`}
              />
            </span>
            <span className="s03-toggle-label">
              {lang === "bn" ? "EN" : "বাং"}
            </span>
          </button>
        </div>

        {/* Main content (scrollable body) */}
        <div ref={contentRef} className="s03-body">
          <h1 className="s03-heading" data-anim>
            {c.heading}
          </h1>
          <div className="s03-divider" data-anim />

          <div className="s03-grid" data-anim>
            {c.items.map((item, idx) => (
              <div key={idx} className="s03-grid-card">
                <span className="s03-card-label">{item.label}</span>
                <span className="s03-card-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="s03-footer" data-anim>
          <button className="s03-prev" onClick={onPrev}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 15L9 3M9 3L4 8M9 3L14 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{c.prev}</span>
          </button>

          <button className="s03-next" onClick={onNext}>
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

Slide03.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Slide03;