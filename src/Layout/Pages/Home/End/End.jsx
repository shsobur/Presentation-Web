import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin, FaGlobe, FaChevronRight } from "react-icons/fa";
import "./End.css";
import profilePic from "../../../../assets/sobur.png";

const End = () => {
  const containerRef = useRef(null);
  const intro1Ref = useRef(null);
  const intro2Ref = useRef(null);
  const cardRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // --- INITIAL STATE (Hidden) ---
      gsap.set(
        [
          intro1Ref.current,
          intro2Ref.current,
          cardRef.current,
          missionRef.current,
        ],
        {
          opacity: 0,
          display: "none",
        },
      );

      // --- PHASE 1: THE CASUAL THANKS ---
      tl.delay(0.5) // Small wait for browser stability
        .set(intro1Ref.current, { display: "flex" }) // Changed to flex for centering
        .to(intro1Ref.current, { opacity: 1, duration: 0.5 })
        .fromTo(
          intro1Ref.current.querySelectorAll("h2"),
          { y: 30, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.3,
            ease: "back.out(1.7)",
          },
        )
        .to(intro1Ref.current, {
          opacity: 0,
          y: -30,
          duration: 2,
          delay: 2.5,
          ease: "power4.in",
        })
        .set(intro1Ref.current, { display: "none" })

        // --- PHASE 2: THE "CRAFTED BY" ---
        .set(intro2Ref.current, { display: "flex" })
        .to(intro2Ref.current, { opacity: 1, duration: 0.3 })
        .fromTo(
          intro2Ref.current.querySelector("h2"),
          { scale: 1.4, opacity: 0, letterSpacing: "10px" },
          {
            scale: 1,
            opacity: 1,
            letterSpacing: "2px",
            duration: 1.2,
            ease: "expo.out",
          },
        )
        .to(intro2Ref.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: 1.5,
        })
        .set(intro2Ref.current, { display: "none" })

        // --- PHASE 3: THE BIG INFO CARD ---
        .set(cardRef.current, { display: "flex" })
        .fromTo(
          cardRef.current,
          { y: 100, opacity: 0, rotationX: -10 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "power4.out" },
        )
        .fromTo(
          ".reveal-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          "-=0.5",
        )

        // --- PHASE 4: MISSION PASSED (Grand Finale) ---
        .to(containerRef.current, {
          backgroundColor: "#000",
          duration: 1,
          delay: 6,
        })
        .to(cardRef.current, { opacity: 0, scale: 0.9, duration: 0.5 })
        .set(missionRef.current, { display: "flex" })
        .to(missionRef.current, { opacity: 1, duration: 0.05 })
        .fromTo(
          ".mission-bg-flash",
          { opacity: 0 },
          { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 },
        )
        .fromTo(
          ".mission-title",
          { letterSpacing: "2em", opacity: 0 },
          { letterSpacing: "0.2em", opacity: 1, duration: 1 },
        )
        .fromTo(
          ".mission-respect",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=0.4",
        )
        .fromTo(
          ".star",
          { scale: 0 },
          { scale: 1, stagger: 0.1, ease: "back.out" },
        );

      // Constant background drift
      gsap.to(".blob", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="end-root">
      {/* Background blobs */}
      <div className="bg-visuals">
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      {/* Intro 1: Casual Thanks */}
      <div ref={intro1Ref} className="intro-text-box intro-1">
        <h2>Thanks for your time! 🙌</h2>
        <h2 className="dim">...and for enduring my &quot;boring&ldquo; animations.</h2>
      </div>

      {/* Intro 2: Crafted by */}
      <div ref={intro2Ref} className="intro-text-box intro-2">
        <h2 className="gradient-text">THIS PROJECT WAS CRAFTED BY</h2>
      </div>

      {/* Main Big Card */}
      <div ref={cardRef} className="big-card-wrapper">
        <div className="glass-card-large">
          <div className="profile-section reveal-item">
            <div className="circle-image-container">
              <img src={profilePic} alt="Sobur Hossen" className="circle-img" />
              <div className="rotating-border" />
              <div className="status-dot" />
            </div>
          </div>

          <div className="details-section">
            <span className="reveal-item tag">MERN STACK DEVELOPER</span>
            <h1 className="reveal-item name">
              Sobur <span className="outline">Hossen</span>
            </h1>
            <p className="reveal-item bio">
              Passionate about building clean, functional, and user-centric web
              applications. Let&lsquo;s build something amazing together.
            </p>

            <div className="reveal-item actions">
              <a
                href="https://github.com/shsobur"
                target="_blank"
                className="end-btn primary"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://portfolio-2-c48ba.web.app/"
                target="_blank"
                className="end-btn outline-btn"
              >
                <FaGlobe /> Portfolio <FaChevronRight size={10} />
              </a>
              <a
                href="https://www.linkedin.com/in/soburhossen/"
                target="_blank"
                className="end-btn linkedin"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Passed */}
      <div ref={missionRef} className="mission-overlay">
        <div className="mission-bg-flash" />
        <div className="mission-content">
          <h2 className="mission-title">MISSION PASSED</h2>
          <div className="mission-respect">RESPECT +</div>
          <div className="mission-stars">★★★★★</div>
        </div>
      </div>
    </div>
  );
};

export default End;