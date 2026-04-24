import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import "./Slide05.css";

const CONTENT = {
  bn: {
    heading: "সমবায় সমিতির সংকটসমূহ",
    subheading:
      "সম্ভাবনা থাকা সত্ত্বেও, বাংলাদেশের সমবায় সমিতিগুলো বেশ কিছু গুরুতর চ্যালেঞ্জের সম্মুখীন।",
    items: [
      {
        title: "নেতৃত্বের অভাব ও দুর্নীতি",
        desc: "অনেক সময় সমবায়ের নেতৃত্ব যোগ্য ব্যক্তির হাতে না থেকে প্রভাবশালী বা স্বার্থান্বেষী মহলের হাতে চলে যায়, যা সমিতির কার্যকারিতা নষ্ট করে।",
      },
      {
        title: "প্রশিক্ষণ সুবিধার অভাব",
        desc: "অধিকাংশ সদস্যই সমবায় নীতি ও মূল্যবোধ এবং আধুনিক ব্যবসায়িক ব্যবস্থাপনা সম্পর্কে পর্যাপ্ত জ্ঞান ও প্রশিক্ষণের অভাবে ভোগেন।",
      },
      {
        title: "প্রযুক্তি ও আধুনিকায়নের অভাব",
        desc: "বর্তমান যুগে ডিজিটাল লেনদেন বা আধুনিক বিপণন ব্যবস্থা না থাকায় সমবায়গুলো প্রতিযোগিতায় পিছিয়ে পড়ছে।",
      },
      {
        title: "আইনি ও আমলাতান্ত্রিক জটিলতা",
        desc: "সমবায় আইন ২০০১ এবং এর বাস্তবায়ন প্রক্রিয়া জটিল ও সময়সাপেক্ষ। নিবন্ধন প্রক্রিয়ায় দীর্ঘসূত্রিতা এবং আমলাতান্ত্রিক জটিলতা উদ্যোক্তাদের নিরুৎসাহিত করে।",
      },
      {
        title: "মূলধন ও আর্থিক সমস্যা",
        desc: "ব্যাংক ঋণ পেতে জামানতের অভাব, উচ্চ সুদের হার এবং আর্থিক প্রতিষ্ঠানগুলোর সমবায়ের প্রতি অনাস্থা প্রধান বাধা।",
      },
      {
        title: "স্বচ্ছতা ও জবাবদিহিতার অভাব",
        desc: "হিসাব সংরক্ষণে অনিয়ম এবং সঠিক অডিট না হওয়ার ফলে সদস্যদের মধ্যে আস্থার সংকট তৈরি হয়, যা সমিতির দীর্ঘমেয়াদি স্থিতিশীলতার জন্য ক্ষতিকর।",
      },
    ],
    prev: "পূর্ববর্তী",
    next: "পরবর্তী",
  },
  en: {
    heading: "Challenges of Cooperative Societies",
    subheading:
      "Despite their potential, cooperative societies in Bangladesh face several serious challenges.",
    items: [
      {
        title: "Lack of Leadership and Corruption",
        desc: "Often, leadership does not remain in the hands of qualified individuals but falls under the control of influential or self-interested groups, reducing effectiveness.",
      },
      {
        title: "Lack of Training Facilities",
        desc: "Many members suffer from a lack of proper knowledge and training in cooperative principles, values, and modern business management.",
      },
      {
        title: "Lack of Technology and Modernization",
        desc: "Due to limited use of digital transactions and modern marketing systems, cooperatives fall behind in competition.",
      },
      {
        title: "Legal and Bureaucratic Complexity",
        desc: "The Cooperative Societies Act 2001 and its implementation process are complex and time-consuming. Delays in registration and bureaucratic barriers discourage new initiatives.",
      },
      {
        title: "Capital and Financial Problems",
        desc: "Lack of collateral for bank loans, high interest rates, and lack of trust from financial institutions create major obstacles.",
      },
      {
        title: "Lack of Transparency and Accountability",
        desc: "Irregularities in record-keeping and lack of proper audits lead to a loss of trust among members, which harms long-term stability.",
      },
    ],
    prev: "Previous",
    next: "Next",
  },
};

const Slide05 = ({ onNext, onPrev }) => {
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
    <div className="s05-root">
      <div ref={cardRef} className="s05-card">
        <div className="s05-corner s05-corner--tl" />
        <div className="s05-corner s05-corner--tr" />
        <div className="s05-corner s05-corner--bl" />
        <div className="s05-corner s05-corner--br" />

        <div className="s05-accent" />

        <div className="s05-header" data-anim>
          <span className="s05-slide-num">05 / 08</span>
          <button
            className="s05-toggle"
            onClick={handleToggle}
            aria-label="Switch language"
          >
            <span className="s05-toggle-track">
              <span
                className={`s05-toggle-thumb ${
                  lang === "en" ? "s05-toggle-thumb--right" : ""
                }`}
              />
            </span>
            <span className="s05-toggle-label">
              {lang === "bn" ? "EN" : "বাং"}
            </span>
          </button>
        </div>

        <div ref={contentRef} className="s05-body">
          <h1 className="s05-heading" data-anim>
            {c.heading}
          </h1>
          <p className="s05-subheading" data-anim>
            {c.subheading}
          </p>
          <div className="s05-divider" data-anim />

          <div className="s05-grid" data-anim>
            {c.items.map((item, idx) => (
              <div key={idx} className="s05-grid-card">
                <span className="s05-card-title">{item.title}</span>
                <span className="s05-card-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="s05-footer" data-anim>
          <button className="s05-prev" onClick={onPrev}>
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

          <button className="s05-next" onClick={onNext}>
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

Slide05.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Slide05;