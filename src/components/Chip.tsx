'use client';
import { merge } from '@/lib/utils';

type ChipProps = {
	variant?: keyof typeof variants;
	children?: string | number;
	color?: string;
	className?: string;
};

const variants = {
	primary: 'bg-grey-700 text-grey-100 ',
	secondary: 'bg-grey-100 text-grey-800',
	error: 'bg-red-600 text-white',
	info: 'bg-sky-600 text-grey-100',
	success: 'bg-green-600 text-grey-800',
	green: 'bg-green-600 text-grey-800',
	warning: 'bg-yellow-400 text-grey-800',
	special: 'bg-purple-500 text-grey-800',
};

const Chip = ({
	variant = 'primary',
	children,
	className,
	...rest
}: ChipProps) => {
	return (
		<div
			className={merge(
				'flex max-h-5 w-fit min-w-fit items-center overflow-y-hidden whitespace-nowrap text-nowrap rounded-full p-3 text-lg font-semibold',
				variants[variant],
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
};

export default Chip;
