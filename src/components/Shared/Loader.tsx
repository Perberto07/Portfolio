import React from 'react';

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Loader component displays a spinning loader.
 * @param size - Diameter of the loader in pixels.
 * @param color - Color of the spinner.
 * @param className - Additional CSS classes.
 */
const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = '#3498db',
  className = '',
}) => (
  <div
    className={`loader-container ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={{ display: 'block' }}
      aria-label="Loading"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray="90"
        strokeDashoffset="60"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export default Loader;