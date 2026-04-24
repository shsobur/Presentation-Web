import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./Slidebackground.css";

const SlideBackground = () => {
  const containerRef = useRef(null);
  const auroraRef = useRef(null);
  const glowRef = useRef(null);
  const particleContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Aurora sweep — a diagonal wave of light that continuously moves
      gsap.to(auroraRef.current, {
        backgroundPosition: "200% 200%, -50% -50%, 150% 150%",
        duration: 24,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Central glow pulse — breathing behind content
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.6,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animate each particle individually
      const particles = particleContainerRef.current?.children || [];
      Array.from(particles).forEach((particle, i) => {
        gsap.to(particle, {
          x: `${((i % 3) - 1) * 15}vw`,
          y: `-${10 + ((i * 7) % 20)}vh`,
          opacity: 0.2,
          duration: 12 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sb-root" aria-hidden="true">
      {/* Deep cosmic base */}
      <div className="sb-base" />

      {/* Aurora sweep — large, slow, luminous */}
      <div ref={auroraRef} className="sb-aurora" />

      {/* Central breathing glow */}
      <div ref={glowRef} className="sb-glow" />

      {/* Floating light particles */}
      <div ref={particleContainerRef} className="sb-particles">
        <div className="sb-particle" />
        <div className="sb-particle" />
        <div className="sb-particle" />
        <div className="sb-particle" />
        <div className="sb-particle" />
        <div className="sb-particle" />
      </div>

      {/* Subtle grid + noise texture */}
      <div className="sb-grid" />
      <div className="sb-noise" />

      {/* Deep vignette */}
      <div className="sb-vignette" />
    </div>
  );
};

export default SlideBackground;