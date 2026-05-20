import { atom, useAtomValue } from 'jotai';

// Titles in both languages are separated by // and split so that
// 0: Finnish, 1: English
export const langAtom = atom<0 | 1>(0);

export const useLang = () => useAtomValue(langAtom);

//When true language isn't cycled automatically
export const doLangCycleAtom = atom<boolean>(true);

export const useLangCycle = () => useAtomValue(doLangCycleAtom);