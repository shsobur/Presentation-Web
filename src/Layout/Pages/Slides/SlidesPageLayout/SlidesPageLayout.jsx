import Slide01 from "../Slide01/Slide01";
import Slide02 from "../Slide02/Slide02";
import Slide03 from "../Slide03/Slide03";
import Slide04 from "../Slide04/Slide04";
import Slide05 from "../Slide05/Slide05";
import Slide06 from "../Slide06/Slide06";
import Slide07 from "../Slide07/Slide07";
import { useRef, useState, useCallback, useEffect } from "react";
import SlideNavigator from "../../../../Components/Slidenavigator/Slidenavigator";
import SlideBackground from "../../../../Components/Slidebackground/Slidebackground";

const TOTAL_SLIDES = 7;

const SlidesPageLayout = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef(Array.from({ length: TOTAL_SLIDES }, () => null));
  const isNavigating = useRef(false);

  // ── Scroll to a slide by index ────────────────────────────────
  const scrollToSlide = useCallback((index) => {
    const el = slideRefs.current[index];
    if (!el) return;
    isNavigating.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSlide(index);
    // Release lock after animation finishes
    setTimeout(() => {
      isNavigating.current = false;
    }, 800);
  }, []);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => {
      const next = Math.min(prev + 1, TOTAL_SLIDES - 1);
      scrollToSlide(next);
      return next;
    });
  }, [scrollToSlide]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => {
      const next = Math.max(prev - 1, 0);
      scrollToSlide(next);
      return next;
    });
  }, [scrollToSlide]);

  // ── Block all scroll: wheel, touch, keyboard arrow/space/pgup/pgdn
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();

    const blockKeys = (e) => {
      const blocked = [
        " ",
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (blocked.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", blockKeys);

    return () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", blockKeys);
    };
  }, []);

  // Helper — assigns ref to the slideRefs array
  const setRef = useCallback(
    (index) => (el) => {
      slideRefs.current[index] = el;
    },
    [],
  );

  return (
    <div className="relative" style={{ overflow: "hidden" }}>
      <SlideBackground />

      <SlideNavigator
        total={TOTAL_SLIDES}
        active={activeSlide}
        onNavigate={scrollToSlide}
      />

      {/* ── Slide 01 ── */}
      <section ref={setRef(0)}>
        <Slide01 onNext={handleNext} />
      </section>

      {/* ── Slide 02 ── */}
      <section ref={setRef(1)}>
        <Slide02 onNext={handleNext} onPrev={handlePrev} />
      </section>

      {/* ── Slide 03 ── */}
      <section ref={setRef(2)}>
        <Slide03 onNext={handleNext} onPrev={handlePrev} />
      </section>

      {/* ── Slide 04 ── */}
      <section ref={setRef(3)}>
        <Slide04 onNext={handleNext} onPrev={handlePrev} />
      </section>

      {/* ── Slide 05 ── */}
      <section ref={setRef(4)}>
        <Slide05 onNext={handleNext} onPrev={handlePrev} />
      </section>

      {/* ── Slide 06 ── */}
      <section ref={setRef(5)}>
        <Slide06 onNext={handleNext} onPrev={handlePrev} />
      </section>

      {/* ── Slide 07 ── */}
      <section ref={setRef(6)}>
        <Slide07 onNext={handleNext} onPrev={handlePrev} />
      </section>

      {/* ── Slides 04–08 — add components here as you build them ── */}
      {Array.from({ length: TOTAL_SLIDES - 7 }, (_, i) => (
        <section
          key={i + 7}
          ref={setRef(i + 7)}
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              color: "rgba(167,139,250,0.25)",
              textTransform: "uppercase",
            }}
          >
            Slide {String(i + 3).padStart(2, "0")} — coming soon
          </p>
        </section>
      ))}
    </div>
  );
};

export default SlidesPageLayout;
