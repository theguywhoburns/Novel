import { useTheme } from "@/theme";

export const IconVortex = (props : React.SVGProps<SVGSVGElement>) => {
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
            <path 
                d="M13.1391 3.62218C13.7617 4.40737 14.2136 5.28933 14.4819 6.24354C14.7502 7.19776 14.8218 8.17678 14.6946 9.15338C14.5766 10.0597 14.2909 10.9276 13.8453 11.7379C15.6092 10.5761 16.7651 8.63604 16.7651 6.43846C16.7651 2.88257 13.7395 0 10.0072 0V1.2582C10.2648 1.36693 10.5161 1.48853 10.7601 1.6225C11.6935 2.13593 12.494 2.80874 13.1391 3.62218Z" 
                fill={theme.accent_color}
            />
            <path 
                d="M2.76503 5.18402C3.69845 4.67058 4.71021 4.3466 5.77216 4.22105C6.79721 4.09988 7.8248 4.16808 8.82639 4.42374C9.82795 4.67941 10.7537 5.10988 11.5778 5.70316C12.3427 6.25374 12.9886 6.92335 13.5024 7.69616C13.3283 5.65991 12.1427 3.73617 10.1452 2.63734C6.91295 0.859415 2.77992 1.91453 0.913788 4.99398L2.05749 5.62308C2.28505 5.46494 2.52123 5.31839 2.76503 5.18402Z" 
                fill={theme.accent_color}
            />
            <path 
                d="M4.34445 8.18019C5.07765 7.48164 5.93177 6.93309 6.8831 6.54973C7.766 6.19395 8.69765 5.99578 9.65702 5.95824C7.71906 5.08379 5.37761 5.10008 3.38004 6.19887C0.14782 7.97679 -0.959639 11.9145 0.90649 14.9939L2.05019 14.3648C2.02026 14.098 2.00514 13.8298 2.00489 13.5615C2.00489 12.5346 2.21628 11.5378 2.63313 10.5988C3.03551 9.69249 3.61128 8.87875 4.34445 8.18019Z" 
                fill={theme.accent_color}
            />
            <path 
                d="M6.86097 16.3779C6.2383 15.5927 5.78648 14.7108 5.51813 13.7565C5.24978 12.8023 5.1782 11.8233 5.30538 10.8467C5.42342 9.94033 5.70915 9.07256 6.1547 8.26221C4.39083 9.42396 3.23495 11.364 3.23495 13.5617C3.23495 17.1175 6.26052 20.0001 9.99278 20.0001V18.7419C9.73526 18.6332 9.48395 18.5116 9.23989 18.3776C8.30644 17.8641 7.50607 17.1913 6.86097 16.3779Z" 
                fill={theme.accent_color}
            />
            <path 
                d="M17.2349 14.8159C16.3015 15.3293 15.2898 15.6533 14.2278 15.7788C13.2028 15.9 12.1751 15.8318 11.1736 15.5761C10.1721 15.3205 9.24637 14.89 8.42222 14.2967C7.65736 13.7461 7.0114 13.0765 6.49763 12.3037C6.67171 14.34 7.85728 16.2637 9.85485 17.3625C13.0871 19.1404 17.2201 18.0853 19.0862 15.0059L17.9425 14.3768C17.715 14.5349 17.4788 14.6815 17.2349 14.8159Z" 
                fill={theme.accent_color}
            />
            <path 
                d="M15.6555 11.8198C14.9223 12.5184 14.0682 13.0669 13.1169 13.4503C12.234 13.8061 11.3023 14.0042 10.343 14.0418C12.2809 14.9163 14.6224 14.9 16.6199 13.8012C19.8522 12.0232 20.9596 8.08555 19.0935 5.0061L17.9498 5.6352C17.9797 5.90204 17.9948 6.1702 17.9951 6.43856C17.9951 7.46543 17.7837 8.46219 17.3668 9.40121C16.9645 10.3075 16.3887 11.1213 15.6555 11.8198Z" 
                fill={theme.accent_color}
            />
            <path 
                d="M10.6715 12.693C12.2354 12.3396 13.2025 10.8454 12.8317 9.35539C12.4608 7.86541 10.8924 6.94397 9.32853 7.29728C7.76463 7.65059 6.79748 9.14488 7.16832 10.6349C7.53916 12.1248 9.10757 13.0463 10.6715 12.693Z" 
                fill={theme.accent_color}
            />
        </svg>
    );
}