import "./Mobile.css";

const Mobile = () => {
  return (
    <div className="mobile-root">
      <div className="mobile-bg" />
      <div className="mobile-content">
        <div className="mobile-icon">⚡</div>
        <h1 className="mobile-title">Desktop Experience Only</h1>
        <p className="mobile-desc">
          This website features high‑performance animations and interactive
          content designed for larger screens. For the best experience, please
          access it from a <strong>desktop</strong> or <strong>tablet</strong>.
        </p>
        <div className="mobile-divider" />
        <p className="mobile-sub">
          We apologize for the inconvenience. The mobile version is not
          available due to the complex visual nature of the presentation.
        </p>
      </div>
    </div>
  );
};

export default Mobile;