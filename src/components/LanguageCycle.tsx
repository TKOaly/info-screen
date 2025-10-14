'use client';

import { langAtom } from '@/lib/lang';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const LanguageCycle = () => {
    // For toggling language with 'l'
    const [lang, setLang] = useAtom(langAtom);

    // Register keyboard event listener to document on mount
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'l') {
                setLang(lang === 0 ? 1 : 0);
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [lang, setLang]);

    return null;
};