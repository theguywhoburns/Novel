import { useTheme } from "@/theme";

interface IIconPlaces extends React.SVGProps<SVGSVGElement> {
	focused: boolean;
}

const IconPlaces = ({ focused = false, ...props }: IIconPlaces) => {
    const theme = useTheme();
    return (
        <svg 
            width="19" 
            height="24" 
            viewBox="0 0 19 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                d="M2.27442 9.22944C2.30825 9.60385 2.62211 9.89062 2.99804 9.89062H15.3489C15.7248 9.89062 16.0386 9.60387 16.0725 9.22947C16.1109 8.80411 15.7759 8.4375 15.3489 8.4375H2.99804C2.57096 8.4375 2.23599 8.80409 2.27442 9.22944ZM0.765259 4.21875C0.360753 4.21875 0.0328369 4.54667 0.0328369 4.95117V6.29883C0.0328369 6.70333 0.360753 7.03125 0.765259 7.03125H17.5817C17.9862 7.03125 18.3141 6.70333 18.3141 6.29883V4.95117C18.3141 4.54667 17.9862 4.21875 17.5817 4.21875H0.765259ZM14.7555 0.460408C14.6443 0.182338 14.375 0 14.0755 0H4.27144C3.97195 0 3.70264 0.182337 3.59141 0.460407L3.05235 1.80806C2.85991 2.28916 3.21422 2.8125 3.73238 2.8125H14.6145C15.1327 2.8125 15.487 2.28917 15.2946 1.80806L14.7555 0.460408ZM8.65843 16.2901C8.94637 16.5566 9.39236 16.5475 9.67921 16.2799C10.7291 15.3002 11.0633 15.181 11.0633 14.7025C11.0633 14.0629 10.2844 13.7325 9.82648 14.1901L9.69136 14.3253C9.40534 14.6113 8.94158 14.6113 8.65554 14.3253L8.5204 14.1901C8.23784 13.9077 7.77832 13.9078 7.49581 14.1901C7.21601 14.4699 7.21338 14.9235 7.48784 15.2067L8.65843 16.2901ZM3.54889 23.3335C3.583 23.7109 3.89938 24 4.27834 24H14.0686C14.4475 24 14.7639 23.7109 14.798 23.3335L14.9233 21.9468C14.9621 21.5181 14.6244 21.1485 14.1939 21.1485H4.15304C3.72251 21.1485 3.38484 21.5181 3.42359 21.9468L3.54889 23.3335Z" 
                fill={focused ? "url(#svg_base_gradient)" : theme.grey}
            />
            <path 
                d="M3.14232 18.8322C3.18889 19.3476 3.62085 19.7423 4.13826 19.7423H14.209C14.7264 19.7423 15.1584 19.3476 15.205 18.8322L15.7874 12.3869C15.8403 11.8014 15.3792 11.2969 14.7914 11.2969H3.55586C2.96805 11.2969 2.50702 11.8014 2.55992 12.3869L3.14232 18.8322ZM6.50158 13.1958C7.06364 12.6339 7.8641 12.452 8.58038 12.6504C8.96302 12.7564 9.38427 12.7564 9.76691 12.6504C10.4832 12.452 11.2837 12.6338 11.8457 13.1958C12.6765 14.0266 12.6765 15.3784 11.8457 16.2092C10.8662 17.116 10.2454 17.6906 9.85213 18.0547C9.46874 18.4096 8.87763 18.4088 8.49424 18.0539L6.50158 16.2092C5.67086 15.3784 5.67086 14.0266 6.50158 13.1958Z" 
                fill={focused ? "url(#svg_base_gradient)" : theme.grey}
            />

            <defs>
                <radialGradient
                    id="svg_base_gradient"
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
}

export default IconPlaces;
