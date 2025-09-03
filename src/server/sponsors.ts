'use server';
import { revalidateTag } from 'next/cache';

const ENDPOINT = 'https://jobs.tko-aly.fi/api/companies/partners';
const fetchTag = 'sponsors';


export type SponsorData = {
  name: {
    xx: string
  },
  logoUrl?: string
}

export const getSponsorData = async (): Promise<SponsorData[]> => {
  'use server';
  const response = await fetch(ENDPOINT, {
    next: {
      tags: [fetchTag],
      revalidate: 3600,
    },
  })
  return response.json();
};
export const revalidateSponsorData = async () => revalidateTag(fetchTag);
