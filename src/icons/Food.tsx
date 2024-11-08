import { useTheme } from "@/theme";

export const IconFood = (props : React.SVGProps<SVGSVGElement>) => {
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
                d="M10.3196 3.05078C6.66152 3.05078 3.69609 6.01621 3.69609 9.67426C3.69609 13.3323 6.66152 16.2977 10.3196 16.2977C13.9776 16.2977 16.943 13.3323 16.943 9.67426C16.943 6.01621 13.9776 3.05078 10.3196 3.05078ZM10.3195 14.7C7.54836 14.7 5.29383 12.4455 5.29383 9.6743C5.29383 6.90312 7.54836 4.64859 10.3195 4.64859C13.0907 4.64859 15.3452 6.90312 15.3452 9.6743C15.3452 12.4455 13.0907 14.7 10.3195 14.7Z" 
                fill={theme.accent_color}
            />
            <path 
                d="M10.3195 5.99566C8.29117 5.99566 6.64098 7.64585 6.64098 9.67421C6.64098 11.7026 8.29117 13.3528 10.3195 13.3528C12.3479 13.3528 13.9981 11.7026 13.9981 9.67421C13.9981 7.64585 12.3479 5.99566 10.3195 5.99566ZM19.5826 10.2296V2.18085C19.5826 2.14298 19.5707 2.10606 19.5486 2.07531C19.5265 2.04456 19.4953 2.02152 19.4594 2.00944C19.4235 1.99737 19.3847 1.99686 19.3485 2.008C19.3123 2.01913 19.2805 2.04135 19.2576 2.07152C18.2534 3.39584 17.7098 5.01225 17.7098 6.67425V9.6187C17.7098 9.9564 17.9836 10.2302 18.3213 10.2302H18.5763C18.325 12.8256 18.1589 16.4556 18.1589 16.8806C18.1589 17.5502 18.5711 18.093 19.0795 18.093C19.5879 18.093 20 17.5502 20 16.8806C20 16.4555 19.8339 12.825 19.5826 10.2296ZM2.67254 8.63409C3.18199 8.3255 3.5225 7.76597 3.5225 7.12683L3.27016 3.00101C3.26511 2.92256 3.22929 2.84927 3.17048 2.79711C3.11167 2.74494 3.03463 2.71811 2.95614 2.72247C2.87765 2.72682 2.80405 2.762 2.75137 2.82034C2.69869 2.87869 2.67118 2.95549 2.67484 3.03402L2.83895 6.34296C2.83895 6.43227 2.80347 6.51793 2.74031 6.58108C2.67716 6.64424 2.5915 6.67972 2.50219 6.67972C2.41287 6.67972 2.32722 6.64424 2.26406 6.58108C2.20091 6.51793 2.16543 6.43227 2.16543 6.34296L2.08344 3.03538C2.08117 2.95145 2.04624 2.87171 1.98607 2.81314C1.9259 2.75458 1.84525 2.72181 1.76129 2.72181C1.67732 2.72181 1.59667 2.75458 1.53651 2.81314C1.47634 2.87171 1.4414 2.95145 1.43914 3.03538L1.35715 6.34296C1.35715 6.43227 1.32167 6.51793 1.25851 6.58108C1.19536 6.64424 1.1097 6.67972 1.02039 6.67972C0.931077 6.67972 0.845421 6.64424 0.782267 6.58108C0.719113 6.51793 0.683633 6.43227 0.683633 6.34296L0.847734 3.03402C0.856172 2.86382 0.720312 2.72113 0.55 2.72113C0.474089 2.72111 0.401035 2.75007 0.345743 2.80208C0.29045 2.85409 0.257087 2.92524 0.252461 3.00101L0 7.12687C0 7.76601 0.340469 8.3255 0.849961 8.63413C1.01237 8.73258 1.14325 8.87541 1.22718 9.04578C1.3111 9.21616 1.34457 9.40697 1.32363 9.59573C1.03602 12.1878 0.840703 16.4197 0.840703 16.8807C0.840703 17.5503 1.25285 18.0931 1.76125 18.0931C2.26965 18.0931 2.6818 17.5502 2.6818 16.8807C2.6818 16.4197 2.48645 12.1878 2.19887 9.59573C2.17797 9.40697 2.21146 9.21617 2.29538 9.0458C2.3793 8.87542 2.51016 8.73258 2.67254 8.63409Z" 
                fill={theme.accent_color}
            />
        </svg>
    );
}