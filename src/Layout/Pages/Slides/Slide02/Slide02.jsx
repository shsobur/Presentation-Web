import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import "./Slide02.css";

// ====== Topics data (bn + en) ======
const TOPICS = {
  bn: [
    {
      num: "01",
      title: "বাংলাদেশে সমবায় সমিতির ভূমিকা",
      desc: "সমবায়ের ঐতিহাসিক প্রেক্ষাপট ও দেশের অর্থনীতিতে এর অবদান।",
    },
    {
      num: "02",
      title: "বাংলাদেশে সমবায় সমিতির সম্ভাবনা",
      desc: "অর্থনৈতিক, সামাজিক ও গ্রামীণ উন্নয়নে সমবায়ের ভবিষ্যৎ সুযোগ।",
    },
    {
      num: "03",
      title: "বাংলাদেশে সমবায় সমিতির সংকটসমূহ",
      desc: "নেতৃত্ব, প্রশিক্ষণ ও আইনি জটিলতাসহ বিভিন্ন চ্যালেঞ্জ।",
    },
    {
      num: "04",
      title: "সমস্যা সমাধানের উপায়",
      desc: "সংকট উত্তরণে কার্যকর পদক্ষেপ ও নীতিগত সুপারিশমালা।",
    },
  ],
  en: [
    {
      num: "01",
      title: "Role of Cooperative Societies in Bangladesh",
      desc: "The historical background and contribution to economy.",
    },
    {
      num: "02",
      title: "Opportunities of Cooperative Societies",
      desc: "Future potential in economic and rural development.",
    },
    {
      num: "03",
      title: "Challenges of Cooperative Societies",
      desc: "Issues like leadership, training and legal problems.",
    },
    {
      num: "04",
      title: "Solutions to the Problems",
      desc: "Steps and policy suggestions to solve issues.",
    },
  ],
};

// ====== Static text content ======
const CONTENT = {
  bn: {
    heading: "আমাদের মূল আলোচনার বিষয়সমূহ",
    prev: "পূর্ববর্তী",
    next: "পরবর্তী",
  },
  en: {
    heading: "Main Topics of Our Discussion",
    prev: "Previous",
    next: "Next",
  },
};

// ====== Main Slide Component ======
const Slide02 = ({ onNext, onPrev }) => {
  const [lang, setLang] = useState("bn"); // language state__
  const c = CONTENT[lang]; // current text__
  const topics = TOPICS[lang]; // topic list__

  const cardRef = useRef(null); // card ref__
  const contentRef = useRef(null); // content ref__
  const isAnimating = useRef(false); // animation lock__

  // ====== Card entrance animation ======
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

    const els = card.querySelectorAll("[data-anim]"); // anim elements__

    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.09, // step anim__
        delay: 0.4,
        clearProps: "opacity,transform",
      },
    );
  }, []);

  // ====== Language toggle animation ======
  const handleToggle = useCallback(() => {
    if (isAnimating.current) return; // prevent spam__
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
        setLang((l) => (l === "bn" ? "en" : "bn")); // switch lang__

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
    <div className="s02-root">
      <div ref={cardRef} className="s02-card">
        {/* Corner accents */}
        <div className="s02-corner s02-corner--tl" />
        <div className="s02-corner s02-corner--tr" />
        <div className="s02-corner s02-corner--bl" />
        <div className="s02-corner s02-corner--br" />

        {/* Top accent */}
        <div className="s02-accent" />

        {/* Header */}
        <div className="s02-header" data-anim>
          <span className="s02-slide-num">02 / 08</span>

          <button
            className="s02-toggle"
            onClick={handleToggle}
            aria-label="Switch language"
          >
            <span className="s02-toggle-track">
              <span
                className={`s02-toggle-thumb ${
                  lang === "en" ? "s02-toggle-thumb--right" : ""
                }`} // thumb move__
              />
            </span>
            <span className="s02-toggle-label">
              {lang === "bn" ? "EN" : "বাং"}
            </span>
          </button>
        </div>

        {/* ====== Main content ====== */}
        <div ref={contentRef} className="s02-body">
          <h1 className="s02-title" data-anim>
            {c.heading}
          </h1>

          <div className="s02-divider" data-anim />

          <div className="s02-topics" data-anim>
            {topics.map((t) => (
              <div key={t.num} className="s02-topic">
                <span className="s02-topic-num">{t.num}</span>

                <div className="s02-topic-text">
                  <span className="s02-topic-title">{t.title}</span>
                  <span className="s02-topic-desc">{t.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="s02-footer" data-anim>
          <button className="s02-prev" onClick={onPrev}>
            <span>{c.prev}</span>
          </button>

          <button className="s02-next" onClick={onNext}>
            <span>{c.next}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ====== Props validation ======
Slide02.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Slide02;