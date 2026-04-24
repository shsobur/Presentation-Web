import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Slide07.css";
import { Link } from "react-router-dom";

const CONTENT = {
  bn: {
    heading: "উপসংহার: সম্ভাবনাময় ভবিষ্যৎ",
    paragraph1:
      "'একতাই বল' নীতিতে পরিচালিত সমবায় সমিতি বাংলাদেশের গ্রামীণ উন্নয়ন ও বেকারত্ব দূরীকরণে এক বিশাল সম্ভাবনা।",
    paragraph2:
      "দুর্নীতি, নেতৃত্বের অভাব এবং আইনি জটিলতা সত্ত্বেও যথাযথ প্রশিক্ষণ, ডিজিটালাইজেশন ও সরকারি পৃষ্ঠপোষকতা নিশ্চিত করা গেলে এটি দেশের টেকসই অর্থনীতির অন্যতম প্রধান শক্তিতে পরিণত হবে। সম্মিলিত প্রচেষ্টা এবং সঠিক দিকনির্দেশনা একটি শক্তিশালী সমবায় আন্দোলন গড়ে তুলতে পারে, যা জাতির সামগ্রিক সমৃদ্ধিতে অবদান রাখবে।",
    prev: "পূর্ববর্তী",
    finish: "সমাপ্ত",
  },
  en: {
    heading: "Conclusion: A Promising Future",
    paragraph1:
      'Guided by the principle of "Unity is Strength," cooperative societies hold great potential for rural development and reducing unemployment in Bangladesh.',
    paragraph2:
      "Despite challenges such as corruption, lack of leadership, and legal complexities, with proper training, digitalization, and government support, they can become a major force in building a sustainable economy. Collective efforts and proper direction can create a strong cooperative movement that will contribute to the overall prosperity of the nation.",
    prev: "Previous",
    finish: "Finish",
  },
};

const Slide07 = ({ onFinish, onPrev }) => {
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
    <div className="s07-root">
      <div ref={cardRef} className="s07-card">
        <div className="s07-corner s07-corner--tl" />
        <div className="s07-corner s07-corner--tr" />
        <div className="s07-corner s07-corner--bl" />
        <div className="s07-corner s07-corner--br" />

        <div className="s07-accent" />

        <div className="s07-header" data-anim>
          <span className="s07-slide-num">07 / 07</span>
          <button
            className="s07-toggle"
            onClick={handleToggle}
            aria-label="Switch language"
          >
            <span className="s07-toggle-track">
              <span
                className={`s07-toggle-thumb ${
                  lang === "en" ? "s07-toggle-thumb--right" : ""
                }`}
              />
            </span>
            <span className="s07-toggle-label">
              {lang === "bn" ? "EN" : "বাং"}
            </span>
          </button>
        </div>

        <div ref={contentRef} className="s07-body">
          <div className="s07-content">
            <h1 className="s07-heading" data-anim>
              {c.heading}
            </h1>
            <div className="s07-divider" data-anim />
            <p className="s07-text s07-text--primary" data-anim>
              {c.paragraph1}
            </p>
            <p className="s07-text s07-text--secondary" data-anim>
              {c.paragraph2}
            </p>
          </div>
        </div>

        <div className="s07-footer" data-anim>
          <button className="s07-prev" onClick={onPrev}>
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

          <Link to="/end-path">
            <button className="s07-finish" onClick={onFinish}>
              <span>{c.finish}</span>
              <FaCheck size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Slide07.propTypes = {
  onFinish: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default Slide07;
