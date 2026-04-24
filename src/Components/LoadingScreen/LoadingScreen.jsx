import { gsap } from "gsap";
import "./LoadingScreen.css";
import PropTypes from "prop-types";
import Mobile from "../Mobile/Mobile";
import { FaPowerOff } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "INITIALIZING QUANTUM CORE",
  "SYNCHRONIZING NEURAL INTERFACE",
  "LOADING ASSET MANIFEST.JSON",
  "DECRYPTING ARCHITECTURE",
  "ESTABLISHING SECURE PROTOCOLS",
  "SYSTEM STATUS: OPTIMAL",
];

const LoadingScreen = ({ onComplete }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth < 1024,
  );
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  // Screen‑width check with resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation for the "Click to Start" circle
  useEffect(() => {
    if (!isStarted) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(".start-ring", {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      }).to(
        ".start-icon",
        { scale: 1.1, duration: 0.8, yoyo: true, repeat: 1 },
        0,
      );
    }
  }, [isStarted]);

  // Main loading sequence and subsequent exit
  const startSequence = () => {
    setIsStarted(true);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "expo.inOut",
          onComplete: onComplete,
        });
      },
    });

    // Reveal HUD
    tl.fromTo(
      ".loading-hud",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
    );

    // Rotate rings
    gsap.to(".ring-outer", {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".ring-inner", {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    // Animate progress
    const obj = { value: 0 };
    tl.to(
      obj,
      {
        value: 100,
        duration: 6,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.floor(obj.value);
          if (progressRef.current) progressRef.current.textContent = val + "%";
          gsap.set(".progress-fill", { width: `${val}%` });
        },
      },
      "-=0.5",
    );

    // Cycle through messages
    MESSAGES.forEach((msg, i) => {
      tl.call(
        () => {
          if (textRef.current) {
            textRef.current.textContent = msg;
            gsap.fromTo(
              textRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3 },
            );
          }
        },
        null,
        i * (6 / MESSAGES.length),
      );
    });
  };

  // ── Small‑screen path: show the Mobile blocker, no loading sequence ──
  if (isSmallScreen) {
    return <Mobile />;
  }

  // ── Normal path (≥ 1024px) ──────────────────────────────────
  return (
    <div ref={containerRef} className="ls-full-wrapper">
      <div className="star-field" />

      {!isStarted ? (
        // SCREEN 1: THE PLAY BUTTON
        <div className="ls-start-gate" onClick={startSequence}>
          <div className="start-btn-container">
            <div className="start-ring" />
            <div className="start-ring" style={{ animationDelay: "0.5s" }} />
            <div className="start-button">
              <FaPowerOff className="start-icon" />
            </div>
          </div>
          <h2 className="start-text">INITIALIZE SYSTEM</h2>
          <p className="start-sub">CLICK TO BOOT THE INTERFACE</p>
        </div>
      ) : (
        // SCREEN 2: THE LOADING HUD
        <div className="ls-loading-hud">
          <div className="hud-corners">
            <div className="c-box tl" />
            <div className="c-box tr" />
            <div className="c-box bl" />
            <div className="c-box br" />
          </div>

          <div className="hud-center">
            <div className="hud-rings">
              <div className="ring ring-outer" />
              <div className="ring ring-inner" />
              <div className="ring ring-static" />
              <div ref={progressRef} className="hud-percentage">
                0%
              </div>
            </div>

            <div className="hud-info">
              <p ref={textRef} className="hud-msg">
                SYSTEM READY
              </p>
              <div className="hud-progress-bar">
                <div className="progress-fill" />
              </div>
              <p className="hud-footer">STAY CONNECTED // PROTOCOL 77</p>
            </div>
          </div>

          <div className="hud-data-left">
            <span>MEM: 1.2GB</span>
            <span>TMP: 34°C</span>
            <span>UPL: 12MB/S</span>
          </div>
          <div className="hud-data-right">
            <span>0x7F: LOAD</span>
            <span>SEC: TRUE</span>
            <span>LOC: EN_US</span>
          </div>
        </div>
      )}
    </div>
  );
};

LoadingScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default LoadingScreen;