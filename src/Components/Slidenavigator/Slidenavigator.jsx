import PropTypes from "prop-types";
import "./SlideNavigator.css";

const SLIDE_TITLES = [
  "Slide 01",
  "Slide 02",
  "Slide 03",
  "Slide 04",
  "Slide 05",
  "Slide 06",
  "Slide 07",
];

const SlideNavigator = ({ total, active, onNavigate }) => {
  return (
    <nav className="sn-root" aria-label="Slide navigation">
      <div className="sn-track">
        {/* Thin vertical line behind all dots */}
        <div className="sn-line" />

        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={`sn-item ${active === i ? "sn-item--active" : ""}`}
            onClick={() => onNavigate(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
            data-title={SLIDE_TITLES[i] ?? `Slide ${i + 1}`}
          >
            <span className="sn-dot">
              <span className="sn-dot-inner" />
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

SlideNavigator.propTypes = {
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default SlideNavigator;