
export default function Container({ children, className }) {
    return (
        <div className={`h-full w-full bg-white shadow-md rounded-2xl bg-white ${className}`}>
            {children}
        </div>
    );
};