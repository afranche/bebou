import type { FunctionComponent } from "react";

/**
 * SVG component to visually indicate breathing through a half-circle.
 * It is supposed to be positioned at the bottom of a page visually and
 * will expand and contract to indicate inhale and exhale cycles.
 *
 * @param {object} props
 * @param {number} props.value Numerical percentage between 1 and 100% that controls the size of the shape.
 * @param {number} props.duration The time in seconds at which the CSS transition will be set.
 * @returns {JSX.Element}
 */
const BreathingGuide: FunctionComponent<{
  value: number;
  duration: number;
}> = ({ value, duration }) => {
  // Scale factor mapped from 0-100 to a range suitable for SVG
  const scale = 0.5 + (value / 100) * 0.5;
  const translateY = (1 - scale) * 50; // Translate upward as scale increases

  return (
    <svg
      className="text-purple-300 drop-shadow-2xl self-end bottom-0 fill-current h-2/3 w-screen"
      viewBox="0 0 200 200"
    >
      <path
        d="M -150,250 A 90,90 0 0,1 350,250"
        stroke="none"
        strokeLinecap="round"
        style={{
          transform: `scaleX(${
            scale / 0.9
          }) scaleY(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center bottom",
          transition: `transform ${duration}s`,
        }}
      />
    </svg>
  );
};

export default BreathingGuide;
