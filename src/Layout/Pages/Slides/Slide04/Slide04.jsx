import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import "./Slide04.css";

const CONTENT = {
  bn: {
    heading: "সমবায় সমিতির অপার সম্ভাবনা",
    subheading:
      "বাংলাদেশের আর্থ-সামাজিক প্রেক্ষাপটে সমবায় সমিতির অবদান ব্যাপক এবং সুদূরপ্রসারী।",
    items: [
      {
        title: "অর্থনৈতিক সম্ভাবনা",
        desc: "ক্ষুদ্র ক্ষুদ্র সঞ্চয়ের মাধ্যমে বিশাল মূলধন গঠন করে যৌথভাবে উৎপাদন, বিপণন ও বিক্রয় কার্যক্রমে খরচ কমানো ও লাভ বৃদ্ধি সম্ভব।",
      },
      {
        title: "সামাজিক ক্ষমতায়ন",
        desc: "নিম্নবিত্ত মানুষেরা একতাবদ্ধ হওয়ার ফলে সমাজে তাদের মতামতের গুরুত্ব ও অধিকার আদায়ের শক্তি বৃদ্ধি পায়, যা সামাজিক ন্যায়বিচার প্রতিষ্ঠায় সহায়ক।",
      },
      {
        title: "দারিদ্র্য বিমোচন ও কর্মসংস্থান সৃষ্টি",
        desc: "ডেইরি ফার্ম, মৎস্য চাষ বা কুটির শিল্পের মাধ্যমে বেকার যুবকদের জন্য কর্মসংস্থানের বিশাল সুযোগ রয়েছে (যেমন: মিল্ক ভিটা একটি সফল উদাহরণ)।",
      },
      {
        title: "মধ্যস্বত্বভোগীদের দৌরাত্ম্য হ্রাস",
        desc: "কৃষক বা ক্ষুদ্র উদ্যোক্তারা সরাসরি পণ্য বাজারজাত করতে পারেন, ফলে ফড়িয়া বা দালালদের হাতে লভ্যাংশ যায় না, যা গ্রামীণ অর্থনীতিকে শক্তিশালী করে।",
      },
      {
        title: "রপ্তানি সম্ভাবনা",
        desc: "জৈব কৃষি পণ্য, পাট ও হস্তশিল্প সমবায়ের মাধ্যমে আন্তর্জাতিক মানের পণ্য উৎপাদন ও রপ্তানি করে বৈদেশিক মুদ্রা অর্জন করা সম্ভব।",
      },
    ],
    prev: "পূর্ববর্তী",
    next: "পরবর্তী",
  },
  en: {
    heading: "Vast Opportunities of Cooperative Societies",
    subheading:
      "In the socio-economic context of Bangladesh, cooperative societies have wide and far-reaching contributions.",
    items: [
      {
        title: "Economic Opportunities",
        desc: "By combining small savings, large capital can be formed, which helps reduce costs and increase profit through joint production, marketing, and sales activities.",
      },
      {
        title: "Social Empowerment",
        desc: "When lower-income people unite, their voices gain importance, and their ability to claim rights increases, which supports social justice.",
      },
      {
        title: "Poverty Reduction and Employment Generation",
        desc: "There are huge employment opportunities for unemployed youth through dairy farming, fish farming, and cottage industries (e.g., Milk Vita is a successful example).",
      },
      {
        title: "Reduction of Middlemen Influence",
        desc: "Farmers and small entrepreneurs can sell products directly, reducing dependency on middlemen and strengthening the rural economy.",
      },
      {
        title: "Export Potential",
        desc: "Organic agricultural products, jute, and handicrafts can be produced and exported through cooperatives, earning foreign currency.",
      },
    ],
    prev: "Previous",
    next: "Next",
  },
};

const Slide04 = ({ onNext, onPrev }) => {
  const [lang, setLang] = useState("bn");
  const c = CONTENT[lang];

  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const isAnimating = useRef(false);

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
    <div className="s04-root">
      <div ref={cardRef} className="s04-card">
        <div className="s04-corner s04-corner--tl" />
        <div className="s04-corner s04-corner--tr" />
        <div className="s04-corner s04-corner--bl" />
        <div className="s04-corner s04-corner--br" />

        <div className="s04-accent" />

        <div className="s04-header" data-anim>
          <span className="s04-slide-num">04 / 08</span>
          <button
            className="s04-toggle"
            onClick={handleToggle}
            aria-label="Switch language"
          >
            <span className="s04-toggle-track">
              <span
                className={`s04-toggle-thumb ${
                  lang === "en" ? "s04-toggle-thumb--right" : ""
                }`}
              />
            </span>
            <span className="s04-toggle-label">
              {lang === "bn" ? "EN" : "বাং"}
            </span>
          </button>
        </div>

        <div ref={contentRef} className="s04-body">
          <h1 className="s04-heading" data-anim>
            {c.heading}
          </h1>
          <p className="s04-subheading" data-anim>
            {c.subheading}
          </p>
          <div className="s04-divider" data-anim />

          <div className="s04-grid" data-anim>
            {c.items.map((item, idx) => (
              <div key={idx} className="s04-grid-card">
                <span className="s04-card-title">{item.title}</span>
                <span className="s04-card-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="s04-footer" data-anim>
          <button className="s04-prev" onClick={onPrev}>
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

          <button className="s04-next" onClick={onNext}>
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

Slide04.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Slide04;