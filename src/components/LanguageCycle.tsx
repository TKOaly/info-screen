'use client';

import { doLangCycleAtom, langAtom } from '@/lib/lang';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

export const LanguageCycle = () => {
    // For toggling language with 'l'
    const [lang, setLang] = useAtom(langAtom);
    // For disabling language cycling briefly after language has been manually toggled
    const [, setDoLangCycle] = useAtom(doLangCycleAtom);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Register keyboard event listener to document on mount
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'l') {
                setLang(lang === 0 ? 1 : 0);
                setDoLangCycle(false);
                e.preventDefault();

                if (timeoutRef.current)
                    clearTimeout(timeoutRef.current);

                timeoutRef.current = setTimeout(
                    () => setDoLangCycle(true),
                    30 * 1000
                );
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [lang, setLang, setDoLangCycle]);

    return null;
};