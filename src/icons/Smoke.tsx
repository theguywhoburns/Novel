import { useTheme } from "@/theme";

export const IconSmoke = (props : React.SVGProps<SVGSVGElement>) => {
    const theme = useTheme();
    return (
        <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_2344_2470)">
                <path 
                    d="M1.71697 14.4932C1.94579 14.2644 1.94579 13.8935 1.71697 13.6646C0.840228 12.7879 1.11931 12.2191 1.83419 11.0161C2.5677 9.78174 3.57237 8.09121 1.754 5.89459C1.54773 5.64534 1.17841 5.61054 0.929051 5.8169C0.679808 6.02321 0.645044 6.39256 0.85136 6.64185C2.1432 8.20238 1.53316 9.22888 0.82683 10.4175C0.160229 11.5393 -0.669449 12.9354 0.888389 14.4932C1.0028 14.6076 1.15275 14.6649 1.30266 14.6649C1.45257 14.6649 1.60257 14.6076 1.71697 14.4932ZM19.8284 2.40127L18.1619 0.734848C18.1075 0.68044 18.043 0.63728 17.9719 0.607834C17.9008 0.578388 17.8246 0.563232 17.7477 0.563232C17.6707 0.563232 17.5945 0.578388 17.5235 0.607834C17.4524 0.63728 17.3878 0.68044 17.3334 0.734848L13.0343 5.03397L15.5293 7.52898L19.8284 3.22986C20.0572 3.00108 20.0572 2.63005 19.8284 2.40127ZM2.55024 15.518L1.29809 16.7702C1.06928 16.999 1.06928 17.37 1.29809 17.5988L2.96452 19.2652C3.01892 19.3196 3.0835 19.3628 3.15458 19.3922C3.22567 19.4217 3.30185 19.4368 3.37879 19.4368C3.45573 19.4368 3.53191 19.4217 3.603 19.3922C3.67408 19.3628 3.73866 19.3196 3.79306 19.2652L5.04522 18.0131L2.55024 15.518ZM3.37746 14.6887L12.203 5.86314L14.6976 8.35776L5.87208 17.1834L3.37746 14.6887Z" 
                    fill={theme.accent_color}
                />
            </g>
            <defs>
                <clipPath id="clip0_2344_2470">
                    <rect 
                        width="20" 
                        height="20" 
                        fill={theme.background_color}
                    />
                </clipPath>
            </defs>
        </svg>
    );
}