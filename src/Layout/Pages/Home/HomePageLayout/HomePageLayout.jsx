import { useState, useCallback } from "react";
import Intro from "../Intro/Intro";
import LoadingScreen from "../../../../Components/LoadingScreen/LoadingScreen";

function HomePageLayout() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [startIntroAnimation, setStartIntroAnimation] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoadingComplete(true);
    setTimeout(() => {
      setShowIntro(true);
      setStartIntroAnimation(true);
    }, 900);
  }, []);

  return (
    <div
      className={`relative w-full h-screen overflow-hidden transition-colors duration-700 ${
        showIntro ? "bg-transparent" : "bg-[#050510]"
      }`}
    >
      {/* Intro always mounted so Three.js initializes during loading */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          showIntro ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: showIntro ? "auto" : "none" }}
      >
        <Intro startAnimation={startIntroAnimation} />
      </div>

      {/* Loading screen + splash overlay */}
      <div
        className={`absolute inset-0 z-50 transition-opacity duration-500 ${
          loadingComplete ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <LoadingScreen onComplete={handleLoaderComplete} />
      </div>
    </div>
  );
}

export default HomePageLayout;
