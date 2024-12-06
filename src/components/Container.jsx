export default function Container({ children, className }) {
	return (
		<div
			className={`h-full w-full rounded-2xl bg-white shadow-md ${className}`}
		>
			
			{children}
		</div>
	);
}
