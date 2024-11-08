import { useTheme } from "@/theme";

export const IconWallet = (props : React.SVGProps<SVGSVGElement>) => {
    const theme = useTheme();
    return (
        <svg 
            width="19" 
            height="18" 
            viewBox="0 0 19 18" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                d="M10.2614 10.9838C10.263 11.844 10.6054 12.6685 11.2137 13.2767C11.8219 13.885 12.6464 14.2274 13.5066 14.229H18V14.9779C18.0581 15.3848 18.0206 15.7996 17.8906 16.1895C17.7606 16.5795 17.5416 16.9338 17.2509 17.2244C16.9603 17.515 16.606 17.734 16.2161 17.864C15.8262 17.994 15.4113 18.0315 15.0044 17.9734H3.02212C2.61522 18.0315 2.20039 17.994 1.81047 17.864C1.42055 17.734 1.06625 17.515 0.775607 17.2244C0.48497 16.9338 0.265977 16.5795 0.135965 16.1895C0.00595353 15.7996 -0.0315069 15.3848 0.0265492 14.9779V1.99705C0.0281296 2.52621 0.23904 3.03325 0.613218 3.40743C0.987395 3.78161 1.49443 3.99252 2.0236 3.9941H15.0044C15.4113 3.93604 15.8262 3.9735 16.2161 4.10352C16.606 4.23353 16.9603 4.45252 17.2509 4.74316C17.5416 5.0338 17.7606 5.3881 17.8906 5.77802C18.0206 6.16794 18.0581 6.58277 18 6.98968V7.73857H13.5066C12.6464 7.74015 11.8219 8.08257 11.2137 8.69082C10.6054 9.29907 10.263 10.1236 10.2614 10.9838ZM13.5066 9.23636C13.0432 9.23636 12.5987 9.42046 12.271 9.74816C11.9433 10.0759 11.7592 10.5203 11.7592 10.9838C11.7592 11.4472 11.9433 11.8917 12.271 12.2194C12.5987 12.5471 13.0432 12.7312 13.5066 12.7312H18V9.23636H13.5066ZM14.0259 11.9823C13.8947 11.983 13.7648 11.9578 13.6434 11.9082C13.522 11.8586 13.4115 11.7856 13.3183 11.6934C13.2252 11.6011 13.1511 11.4914 13.1003 11.3705C13.0495 11.2496 13.023 11.1199 13.0224 10.9888C13.0217 10.8576 13.0469 10.7277 13.0964 10.6063C13.146 10.4849 13.219 10.3744 13.3113 10.2812C13.4035 10.1881 13.5133 10.114 13.6341 10.0632C13.755 10.0124 13.8848 9.98591 14.0159 9.98525H14.0259C14.2907 9.98525 14.5447 10.0905 14.7319 10.2777C14.9192 10.465 15.0244 10.719 15.0244 10.9838C15.0244 11.2486 14.9192 11.5026 14.7319 11.6898C14.5447 11.8771 14.2907 11.9823 14.0259 11.9823ZM12.0088 0H2.77249C2.44146 0 2.12399 0.131502 1.88991 0.365577C1.65584 0.599651 1.52434 0.917125 1.52434 1.24816C1.52434 1.57919 1.65584 1.89666 1.88991 2.13074C2.12399 2.36481 2.44146 2.49631 2.77249 2.49631H14.9745C14.8247 0.828776 13.8362 0 12.0088 0Z" 
                fill={theme.accent_color}
            />
        </svg>
    );
}