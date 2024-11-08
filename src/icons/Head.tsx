import { useTheme } from "@/theme";

export const IconHead = (props : React.SVGProps<SVGSVGElement>) => {
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
                d="M17.5405 11.9065C18.0788 11.6376 18.2594 10.9577 17.9256 10.4571L16.0985 7.71718C15.9932 7.55928 15.9366 7.37404 15.9255 7.18458C15.685 3.07621 12.3458 -0.00598349 8.32299 8.7222e-06C4.06573 0.00657122 0.705811 3.48059 0.705811 7.65626C0.705811 9.35458 1.25628 10.9625 2.29768 12.3066C2.78233 12.9314 3.04956 13.784 3.04956 14.7064V19C3.04956 19.5523 3.49727 20 4.04956 20H10.2527C10.805 20 11.2527 19.5523 11.2527 19V17.9462C11.2526 17.8155 11.2962 17.6886 11.3765 17.5855C11.4569 17.4824 11.5694 17.4092 11.6962 17.3774L14.6092 16.6496C15.3926 16.4539 15.9402 15.7523 15.9402 14.9444V13.3242C15.9402 12.9453 16.1543 12.599 16.4933 12.4296L17.5405 11.9065ZM8.90893 11.1719C8.90893 11.4955 8.6466 11.7578 8.32299 11.7578C7.99939 11.7578 7.73706 11.4955 7.73706 11.1719C7.73706 10.8483 7.99939 10.5859 8.32299 10.5859C8.6466 10.5859 8.90893 10.8483 8.90893 11.1719ZM9.36448 7.90051C9.0792 8.11055 8.90893 8.44696 8.90893 8.80047V8.82813C8.90893 9.15173 8.6466 9.41407 8.32299 9.41407C7.99939 9.41407 7.73706 9.15173 7.73706 8.82813V8.80047C7.73706 8.07598 8.08569 7.3868 8.66967 6.95684C8.8217 6.84489 8.90893 6.6727 8.90893 6.48438C8.90893 6.16129 8.64608 5.89844 8.32299 5.89844C7.99991 5.89844 7.73706 6.16129 7.73706 6.48438C7.73706 6.80798 7.47472 7.07032 7.15112 7.07032C6.82752 7.07032 6.56518 6.80798 6.56518 6.48438C6.56518 5.51512 7.35374 4.72657 8.32299 4.72657C9.29225 4.72657 10.0808 5.51512 10.0808 6.48438C10.0808 7.04086 9.81299 7.57028 9.36448 7.90051Z" 
                fill={theme.accent_color}
            />
        </svg>
    );
}