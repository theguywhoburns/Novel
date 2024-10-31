import * as React from "react";

const IconCrystal = (props : React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="url(#paint0_radial_2311_1984)"
      d="M6.322 5.437h5.356L9 .327zM9.472 0l2.669 5.092L15.05 0zm2.293 6.01h-5.53L9 17.135zm-6.364-.573L2.439.257 0 5.438zm6.95.573L9.372 18l8.595-11.99zm.248-.573H18L15.56.257zm-6.95.573H.033L8.628 18zm.21-.918L8.53 0h-5.58z"
    ></path>
    <defs>
      <radialGradient
        id="paint0_radial_2311_1984"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(-34.67518 32.09046 -305.84215 -330.47611 17.65 .281)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF627E"></stop>
        <stop offset="1" stopColor="#F4CD76"></stop>
        <stop offset="1" stopColor="#FFF8F8" stopOpacity="0"></stop>
      </radialGradient>
    </defs>
  </svg>
);

export default IconCrystal;
