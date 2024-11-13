
import React from 'react';

// Form Component
export const Form = ({
	children,
	className = '',
	...rest
}) => (
	<form {...rest} className={`space-y-6 ${className}`}>
		{children}
	</form>
);

// Fieldset Component
export const Fieldset = ({
	children,
	className = '',
	...rest
}) => (
	<fieldset
		{...rest}
		className={`flex flex-col gap-1 rounded-md ${className}`}
	>
		{children}
	</fieldset>
);

export const Label = ({
	children,
	className = '',
	...rest
}) => (
	<label
		className={`py-3 text-sm font-medium text-gray-700 ${className}`}
		{...rest}
	>
		{children}
	</label>
);

// TextInput Component\
export const Input = ({ className = '', ...rest }) => (
	<input
		{...rest}
		className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ${className}`}
	/>
);



export const Checkbox = ({
	label,
	className = '',
	...rest
}) => (
	<div className={`flex items-center space-x-2 ${className}`}>
		<input
			{...rest}
			type="checkbox"
			className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
		/>
		{label && (
			<label
				htmlFor={rest.id || rest.name}
				className="block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
		)}
	</div>
);
