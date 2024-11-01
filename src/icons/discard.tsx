import * as React from "react";

const IconDiscard = (props : React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="url(#paint0_radial_2311_1973)"
      d="M8.241.795V2.3c6.925 1.602 11.177 8.859 9.325 15.377-.147.516-.914.377-.87-.171.39-4.818-2.477-8.937-8.455-9.414v1.499c0 .629-.684 1.008-1.203.666L.356 5.86A.79.79 0 0 1 0 5.193a.8.8 0 0 1 .356-.666L7.038.13C7.557-.213 8.24.166 8.24.795"
    ></path>
    <defs>
      <radialGradient
        id="paint0_radial_2311_1973"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(-34.67518 32.09046 -305.84215 -330.47611 17.65 .281)"
        gradientUnits="userSpaceOnUse"
      >
        <stop className="svg-grad-start-color"></stop>
        <stop offset="1" className="svg-grad-end-color"></stop>
      </radialGradient>
    </defs>
  </svg>
);

export default IconDiscard;
