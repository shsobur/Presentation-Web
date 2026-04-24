import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import "./Slide06.css";

const CONTENT = {
  bn: {
    heading: "সংকট উত্তরণে কার্যকরী সমাধান",
    subheading:
      "সমবায় সমিতির বর্তমান সংকটগুলো দূর করতে হলে সমন্বিত ও সুপরিকল্পিত পদক্ষেপ গ্রহণ করা জরুরি।",
    items: [
      {
        title: "সরকারি ও বেসরকারি সহযোগিতা বৃদ্ধি",
        desc: "করমুক্ত সুবিধা, প্রণোদনা প্যাকেজ, বাজার সংযোগ সহায়তা, সহজ শর্তে ঋণ সুবিধা এবং সমবায় উন্নয়ন একাডেমি জোরদার করা প্রয়োজন।",
      },
      {
        title: "আইনি সংস্কার ও আমলাতান্ত্রিক সরলীকরণ",
        desc: "সমবায় আইন সহজীকরণ, নিবন্ধন প্রক্রিয়া দ্রুততর করা, ডিজিটাল সেবা চালু করা এবং দুর্নীতি কমিয়ে স্বচ্ছ শাসন নিশ্চিত করতে হবে।",
      },
      {
        title: "অর্থায়ন ব্যবস্থা উন্নয়ন ও বীমা সুবিধা",
        desc: "সমবায়ের জন্য বিশেষ তহবিল গঠন, কম সুদে ঋণের ব্যবস্থা এবং সরকারি ভর্তুকি কর্মসূচি চালু করা যেতে পারে। ব্যাংক ও আর্থিক প্রতিষ্ঠানের সাথে সংযোগ স্থাপনও গুরুত্বপূর্ণ।",
      },
      {
        title: "স্বচ্ছতা, জবাবদিহিতা ও কঠোর তদারকি",
        desc: "নিয়মিত অডিট এবং গণতান্ত্রিক পদ্ধতিতে নেতৃত্ব নির্বাচন নিশ্চিত করতে হবে, যাতে সদস্যদের আস্থা বজায় থাকে।",
      },
      {
        title: "প্রশিক্ষণ প্রদান ও ডিজিটালাইজেশন",
        desc: "সদস্যদের দক্ষতা বৃদ্ধি এবং নেতৃত্বের গুণাবলি তৈরির জন্য নিয়মিত প্রশিক্ষণ কর্মশালার আয়োজন করা। হিসাবরক্ষণ ও লেনদেনে ডিজিটাল পদ্ধতি চালু করা।",
      },
      {
        title: "গবেষণা ও উন্নয়ন",
        desc: "গবেষণা কেন্দ্র স্থাপন, নতুন পণ্য উদ্ভাবন, বাজার গবেষণা এবং সফল মডেলগুলোর ডকুমেন্টেশন করা।",
      },
    ],
    prev: "পূর্ববর্তী",
    next: "পরবর্তী",
  },
  en: {
    heading: "Effective Solutions to Overcome Challenges",
    subheading:
      "To address the current challenges of cooperative societies, coordinated and well-planned actions are essential.",
    items: [
      {
        title: "Increase Government and Private Support",
        desc: "Tax benefits, incentive packages, market linkage support, easy loan facilities, and strengthening cooperative development institutions are necessary.",
      },
      {
        title: "Legal Reform and Bureaucratic Simplification",
        desc: "Simplify cooperative laws, speed up the registration process, introduce digital services, and ensure transparent governance by reducing corruption.",
      },
      {
        title: "Improved Financing and Insurance Facilities",
        desc: "Create special funds for cooperatives, provide low-interest loans, and introduce government subsidy programs. Building connections with banks and financial institutions is also important.",
      },
      {
        title: "Transparency, Accountability, and Strong Monitoring",
        desc: "Ensure regular audits and democratic leadership selection to maintain trust among members.",
      },
      {
        title: "Training and Digitalization",
        desc: "Arrange regular training programs to improve members' skills and leadership qualities. Introduce digital systems in accounting and transactions.",
      },
      {
        title: "Research and Development",
        desc: "Establish research centers, develop new products, conduct market research, and document successful models.",
      },
    ],
    prev: "Previous",
    next: "Next",
  },
};

const Slide06 = ({ onNext, onPrev }) => {
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
    <div className="s06-root">
      <div ref={cardRef} className="s06-card">
        <div className="s06-corner s06-corner--tl" />
        <div className="s06-corner s06-corner--tr" />
        <div className="s06-corner s06-corner--bl" />
        <div className="s06-corner s06-corner--br" />

        <div className="s06-accent" />

        <div className="s06-header" data-anim>
          <span className="s06-slide-num">06 / 08</span>
          <button
            className="s06-toggle"
            onClick={handleToggle}
            aria-label="Switch language"
          >
            <span className="s06-toggle-track">
              <span
                className={`s06-toggle-thumb ${
                  lang === "en" ? "s06-toggle-thumb--right" : ""
                }`}
              />
            </span>
            <span className="s06-toggle-label">
              {lang === "bn" ? "EN" : "বাং"}
            </span>
          </button>
        </div>

        <div ref={contentRef} className="s06-body">
          <h1 className="s06-heading" data-anim>
            {c.heading}
          </h1>
          <p className="s06-subheading" data-anim>
            {c.subheading}
          </p>
          <div className="s06-divider" data-anim />

          <div className="s06-grid" data-anim>
            {c.items.map((item, idx) => (
              <div key={idx} className="s06-grid-card">
                <span className="s06-card-title">{item.title}</span>
                <span className="s06-card-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="s06-footer" data-anim>
          <button className="s06-prev" onClick={onPrev}>
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

          <button className="s06-next" onClick={onNext}>
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

Slide06.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Slide06;