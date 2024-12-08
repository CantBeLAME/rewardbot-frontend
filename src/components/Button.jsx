// Button.tsx
import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
	"inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all", // Base styles
	{
		variants: {
			variant: {
				primary:
					"bg-primary text-white hover:bg-primary-700 focus:ring-primary-500",
				secondary:
					"bg-secondary text-white hover:bg-secondary-700 focus:ring-secondary-500",
				danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
				outline:
					"border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
				link: "text-indigo-600 hover:underline focus:ring-indigo-500",
			},
			size: {
				sm: "px-3 py-1 text-sm",
				md: "px-4 py-2 text-base",
				lg: "px-5 py-3 text-lg",
			},
			disabled: {
				true: "opacity-50 cursor-not-allowed",
				false: "",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "sm",
			disabled: false,
		},
	},
);

export const Button = ({
	variant,
	size,
	disabled,
	className,
	children,
	...rest
}) => {
	return (
		<button
			className={clsx(
				buttonStyles({ variant, size, disabled }),
				className,
			)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};
