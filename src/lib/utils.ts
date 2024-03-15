import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge tailwind classes together removing duplicates
 */
export function merge(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
