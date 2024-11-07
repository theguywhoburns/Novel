import { useTheme } from "@/theme";
import * as React from "react";

interface IIconChatProps extends React.SVGProps<SVGSVGElement> {
	focused: boolean;
}

const IconChat = ({ focused = false, ...props }: IIconChatProps) => {
    const theme = useTheme();
    return (
        <svg 
            width="25" 
            height="24" 
            viewBox="0 0 25 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                d="M10.6754 11.512C12.4213 9.77098 13.0331 9.64296 13.0331 8.90248C13.0331 8.35971 12.5939 7.92035 12.051 7.92035C11.4327 7.92035 11.2285 8.40781 10.6754 8.88917L9.99422 8.20803C9.61036 7.82421 8.98917 7.82421 8.60531 8.20803C8.2252 8.58813 8.22239 9.20496 8.59697 9.58854L10.6754 11.512Z" 
                fill={focused ? "url(#svg_base_gradient)" : theme.grey}
            />
            <path 
                d="M10.6754 19.6875C16.1032 19.6875 20.5191 15.2716 20.5191 9.84375C20.5191 4.41591 16.1032 0 10.6754 0C2.21392 0 -2.28289 10.0622 3.29809 16.3618L0.845826 19.6875H10.6754ZM7.61087 7.21378C8.44389 6.38095 9.74383 6.29287 10.6754 6.94987C11.607 6.29283 12.9069 6.38081 13.7398 7.21378C14.671 8.145 14.671 9.66014 13.7398 10.5914C10.3223 13.7551 10.705 13.4009 10.6754 13.4283L7.61087 10.5914C6.67975 9.66014 6.67975 8.145 7.61087 7.21378Z" 
                fill={focused ? "url(#svg_base_gradient)" : theme.grey}
            />
            <path 
                d="M22.4989 20.995C25.5962 17.4441 25.2972 12.0764 21.8837 8.88037C22.4475 15.5015 17.2037 21.0937 10.6754 21.0937H9.39191C11.0299 22.9212 13.3841 24 15.902 24H24.7147L22.4989 20.995Z" 
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

export default IconChat;
