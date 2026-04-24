import { useRef, useEffect, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import image1 from "../../../../assets/p1.jpg";
import image2 from "../../../../assets/p2.jpg";
import image3 from "../../../../assets/p3.jpg";
import ThreeDBackground from "../../../../Components/ThreeDBackground/ThreeDBackground";
import PropTypes from "prop-types";

const members = [
  {
    name: "Taslim Akter Monni",
    roll: "826",
    img: image1,
    role: "Lead Presenter",
  },
  { name: "Ananna Das Adri", roll: "807", img: image3, role: "Presenter" },
  { name: "Tasnim Jahan Raisa", roll: "812", img: image2, role: "Presenter" },
];

// ── Memoized member card — EXACT original design, no changes ──────────
const MemberCard = memo(({ member, onClick }) => (
  <div
    className="relative w-96 rounded-3xl p-[2px] overflow-hidden"
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        background: `conic-gradient(from 0deg, transparent 0deg, #a78bfa 60deg, #c084fc 120deg, #8b5cf6 180deg, transparent 240deg)`,
        animation: "rotateBorder 10s linear infinite",
        filter: "blur(0.8px)",
        opacity: 0.9,
      }}
    />
    <div className="relative flex flex-col items-center rounded-3xl bg-[#0b0719]/80 backdrop-blur-xl p-6 border border-white/10">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl" />
        <img
          src={member.img}
          alt={member.name}
          className="relative w-64 h-64 object-cover rounded-full border-2 border-white/20 shadow-2xl"
        />
      </div>
      <h4 className="mt-6 text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        {member.name}
      </h4>
      <p className="text-xl font-medium text-indigo-200 mt-2">
        Roll: {member.roll}
      </p>
      <p
        className={`text-lg mt-1 ${member.role === "Lead Presenter" ? "text-amber-300 font-semibold" : "text-purple-300/70 italic"}`}
      >
        {member.role}
      </p>
    </div>
  </div>
));
MemberCard.displayName = "MemberCard";
MemberCard.propTypes = {
  member: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

// ── Styles — exact original ───────────────────────────────────────────
const NEON_STYLES = `
  @keyframes rotateBorder {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @property --x { syntax: '<angle>'; inherits: true; initial-value: 1deg; }
  @property --c { syntax: '<color>'; inherits: true; initial-value: #0000; }

  .neon-button {
    --x: 1deg;
    --c: #a78bfa;
    --color: #c084fc;
    font-size: 1.5rem;
    position: relative;
    padding: 1rem 3rem;
    border-radius: 100em;
    background: linear-gradient(to bottom right, #0001, #0000), #1a1325;
    color: white;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    box-shadow:
      inset 0 0 0.25em -0.25em #0008,
      inset 0.05em 0.05em 0.2em #000811,
      inset -0.05em -0.05em 0.15em 0.05em #ccc1,
      0 0 0 0.11em #2a1f35;
    transition: --x 0.5s, --c 0.5s, box-shadow 0.5s, transform 0.3s;
    filter: drop-shadow(0 0 0.5em var(--c));
    transform: scale(1);
    outline: none;
  }
  .neon-button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 0.4em);
    height: calc(100% + 0.4em);
    border: 0.12em solid var(--color);
    border-radius: 100em;
    -webkit-mask: conic-gradient(from calc(270deg - var(--x)), #000 calc(2 * var(--x)), #0001 0);
    mask: conic-gradient(from calc(270deg - var(--x)), #000 calc(2 * var(--x)), #0001 0);
    box-shadow: 0 0 0 2em #0000;
    pointer-events: none;
  }
  .neon-button:hover {
    --x: 5deg;
    --c: rgb(from var(--color) r g b / 40%);
    box-shadow:
      inset 0 0 0.25em -0.25em #0008,
      inset 0.05em 0.05em 0.2em #000811,
      inset -0.05em -0.05em 0.15em 0.05em #ccc1,
      0 0 0.05em 0.075em #2a1f35;
    transform: scale(1.05);
  }
  .neon-button:active {
    transform: scale(0.98);
    --x: 10deg;
  }
  @supports not (background: paint(something)) {
    .neon-button {
      transition: box-shadow 0.5s, transform 0.3s;
    }
    .neon-button:hover {
      box-shadow:
        inset 0 0 0.25em -0.25em #0008,
        inset 0.05em 0.05em 0.2em #000811,
        inset -0.05em -0.05em 0.15em 0.05em #ccc1,
        0 0 0.05em 0.075em #2a1f35,
        0 0 1em #a78bfa;
    }
  }
`;

// ── Intro ─────────────────────────────────────────────────────────────
const Intro = ({ startAnimation }) => {
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  const navigate = useNavigate();

  const welcomeRef = useRef(null);
  const titleRef = useRef(null);
  const presentedRef = useRef(null);
  const hostedRef = useRef(null);
  const memberRefs = useRef([]);
  const allMembersContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const buttonRef = useRef(null);
  const tlRef = useRef(null);

  // ── Change 4: navigate to /all-slides ─────────────────────────────
  const handleStart = useCallback(() => navigate("/all-slides"), [navigate]);

  useEffect(() => {
    if (!startAnimation) return;
    tlRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        // ── Change 2 & 3: smooth group reveal ─────────────────────
        setShowAllMembers(true);

        // Small timeout so React paints the new DOM before GSAP runs
        setTimeout(() => {
          const cards = cardRefs.current.filter(Boolean);
          const btn = buttonRef.current;

          // Cards stagger up — left → middle → right
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.1,
            },
          );

          // Button slides up after last card lands
          if (btn) {
            setShowStartButton(true);
            gsap.fromTo(
              btn,
              { opacity: 0, y: 24, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                delay: cards.length * 0.1 + 0.18,
              },
            );
          }
        }, 20);
      },
    });

    tlRef.current = tl;

    // ── Change 1: faster timings throughout ───────────────────────

    // 1. Welcome Everyone
    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, scale: 0.7, y: 60, filter: "blur(4px)" },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
      },
    ).to(
      welcomeRef.current,
      { opacity: 0, scale: 0.8, y: -40, duration: 0.7, ease: "power2.in" },
      "+=0.9",
    );

    // 2. Title
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
      },
    ).to(
      titleRef.current,
      { opacity: 0, y: -40, duration: 0.7, ease: "power2.in" },
      "+=1.2",
    );

    // 3. Presented by Team A
    tl.fromTo(
      presentedRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power3.out" },
    ).to(
      presentedRef.current,
      { opacity: 0, scale: 0.9, y: -30, duration: 0.7, ease: "power2.in" },
      "+=1.0",
    );

    // 4. This presentation is hosted by
    tl.fromTo(
      hostedRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power3.out" },
    ).to(
      hostedRef.current,
      { opacity: 0, scale: 0.95, y: -20, duration: 0.7, ease: "power2.in" },
      "+=1.0",
    );

    // 5. Members one by one
    members.forEach((_, i) => {
      tl.fromTo(
        memberRefs.current[i],
        { opacity: 0, scale: 0.7, y: 80 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "back.out(1.2)",
          onStart: () => {
            memberRefs.current.forEach((el, idx) => {
              if (idx !== i) gsap.set(el, { opacity: 0, scale: 0.7, y: 80 });
            });
          },
        },
        ">+=0.3",
      ).to(
        memberRefs.current[i],
        { opacity: 0, scale: 0.7, y: -60, duration: 0.7, ease: "power1.in" },
        "+=1.2",
      );
    });

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [startAnimation]);

  const stepClass =
    "absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none";

  return (
    <div className="relative w-full h-screen overflow-hidden text-white font-sans select-none">
      <ThreeDBackground />
      <style>{NEON_STYLES}</style>

      {/* 1. Welcome */}
      <div
        ref={welcomeRef}
        className={stepClass}
        style={{ willChange: "opacity, transform" }}
      >
        <h1 className="text-3xl md:text-8xl font-black uppercase tracking-[0.3em] bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,0.9)]">
          Welcome Everyone
        </h1>
      </div>

      {/* 2. Title */}
      <div
        ref={titleRef}
        className={stepClass}
        style={{ willChange: "opacity, transform" }}
      >
        <h2 className="max-w-6xl leading-tight flex flex-col items-center justify-center gap-10">
          <span className="block text-3xl md:text-7xl font-light tracking-[0.2em] text-amber-200/80 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            To the Presentation of
          </span>
          <span className="block text-4xl md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.7)]">
            Introduction to Business
          </span>
        </h2>
      </div>

      {/* 3. Presented by Team A */}
      <div
        ref={presentedRef}
        className={stepClass}
        style={{ willChange: "opacity, transform" }}
      >
        <p className="text-3xl md:text-7xl font-serif italic tracking-wide text-purple-200 drop-shadow-[0_0_20px_rgba(216,180,254,0.8)]">
          Presented by Team A
        </p>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
      </div>

      {/* 4. Hosted by */}
      <div
        ref={hostedRef}
        className={stepClass}
        style={{ willChange: "opacity, transform" }}
      >
        <p className="text-3xl md:text-7xl font-serif italic tracking-wide text-purple-200/80 drop-shadow-[0_0_15px_rgba(216,180,254,0.6)]">
          This presentation is hosted by
        </p>
      </div>

      {/* 5. Individual members — one at a time */}
      {members.map((member, i) => (
        <div
          key={member.roll}
          ref={(el) => (memberRefs.current[i] = el)}
          className={stepClass}
          style={{ willChange: "opacity, transform" }}
        >
          <MemberCard member={member} />
        </div>
      ))}

      {/* 6. Final stage — all three cards + button */}
      {showAllMembers && (
        <div
          ref={allMembersContainerRef}
          className={`${stepClass} flex flex-col items-center justify-center gap-12 pointer-events-none`}
        >
          {/* Cards — each wrapped for individual GSAP stagger */}
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-7xl">
            {members.map((member, i) => (
              <div
                key={member.roll}
                ref={(el) => (cardRefs.current[i] = el)}
                className="pointer-events-auto"
                style={{ opacity: 0 }}
              >
                <MemberCard member={member} onClick={handleStart} />
              </div>
            ))}
          </div>

          {/* Button — starts hidden, GSAP reveals it */}
          <div
            ref={buttonRef}
            className="pointer-events-auto"
            style={{ opacity: 0 }}
          >
            {showStartButton && (
              <button
                onClick={handleStart}
                className="neon-button text-2xl md:text-3xl"
                style={{ "--color": "#c084fc" }}
              >
                Start Presentation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Intro.propTypes = { startAnimation: PropTypes.bool };

export default Intro;