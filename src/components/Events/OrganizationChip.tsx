import { Organization as IlotaloOrg } from '@/server/ilotaloEvents';
import Chip from '../Chip';

// Common organizations that might be found in Tekis events
// Not using the actual values as they are not consistent
type TekisOrg =
	| 'tiedekunta'
	| 'faculty'
	| 'kandiohjelma'
	| 'hyy'
	| 'tkt-alumni'
	| 'titol'
	| 'tik'
	| 'tietokilta'
	| 'prodeko'
	| 'kimmon ystävät';

// These colors are not official
// They are slightly altered to make the labels more readable
const orgColors: Partial<
	Record<
		IlotaloOrg | TekisOrg,
		{
			bg: string;
			text: string;
		}
	>
> = {
	'TKO-äly': {
		bg: 'bg-[#000000]',
		text: 'text-[#fff500]',
	},
	Matlu: {
		bg: 'bg-[#ffb412]',
		text: 'text-[#09773a]',
	},
	Limes: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	Matrix: {
		bg: 'bg-[#eeeeee]',
		text: 'text-[#ff0000]',
	},
	Resonanssi: {
		bg: 'bg-[#000000]',
		text: 'text-[#00ff00]',
	},
	HYK: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	MaO: {
		bg: 'bg-[#00634C]',
		text: 'text-[#ffffff]',
	},
	EGEA: {
		bg: 'bg-[#eeeeee]',
		text: 'text-[#f3aa41]',
	},
	Helix: {
		bg: 'bg-[#000000]',
		text: 'text-[#fcc800]',
	},
	Meridiaani: {
		bg: 'bg-[#2e3192]',
		text: 'text-[#d60000]',
	},
	Symbioosi: {
		bg: 'bg-[#eeeeee]',
		text: 'text-[#368722]',
	},
	Synop: {
		bg: 'bg-[#ffd202]',
		text: 'text-[#000000]',
	},
	Vasara: {
		bg: 'bg-[#eeeeee]',
		text: 'text-[#000000]',
	},
	Moodi: {
		bg: 'bg-[#006633]',
		text: 'text-[#ffffff]',
	},
	'Kumpulan Speksi ry': {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	'Spektrum rf': {
		bg: 'bg-[#ff569a]',
		text: 'text-[#000000]',
	},
	Mesta: {
		bg: 'bg-[#eeeeee]',
		text: 'text-[#000000]',
	},
	Integralis: {
		bg: 'bg-gradient-to-r from-[#13DBFC] to-[#FD0AD4]',
		text: 'text-[#000000]',
	},
	tiedekunta: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	faculty: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	kandiohjelma: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	hyy: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	'tkt-alumni': {
		bg: 'bg-[#000000]',
		text: 'text-[#ee981b]',
	},
	titol: {
		bg: 'bg-gradient-to-r from-[#001d39] to-[#003e7a]',
		text: 'text-[#ffffff]',
	},
	tik: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	tietokilta: {
		bg: 'bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	prodeko: {
		bg: 'bg-[#eeeeee]',
		text: 'text-[#002851]',
	},
	'kimmon ystävät': {
		bg: 'bg-[#ff0000]',
		text: 'text-[#ffffff]',
	},
};

export const getOrgColor = (org: string) => {
	const orgKey = Object.keys(orgColors).find(
		(name) =>
			name.toLowerCase().includes(org.toLowerCase()) ||
			org.toLowerCase().includes(name.toLowerCase())
	) as IlotaloOrg | TekisOrg | undefined;
	if (!orgKey) return undefined;
	return orgColors[orgKey];
};

const OrganizationChip = ({
	org,
	truncate = 0,
}: {
	org: string;
	truncate?: number;
}) => {
	const orgColor = getOrgColor(org);
	const orgTWColor = orgColor
		? `${orgColor?.bg} ${orgColor?.text}`
		: undefined;

	const intlName = org.includes('//') ? org.split('//')[1].trim() : org; // Only show english name if available
	const nameOnly = intlName.replace(/ (?:ry|rf)$/, ''); // Remove organization suffixes
	const displayName = // Truncate name if it's too long
		truncate > 0 && nameOnly.length > truncate
			? `${nameOnly.slice(0, truncate).trim()}…`
			: nameOnly;

	return (
		<Chip className={orgTWColor || 'bg-black/20 text-grey-50'}>
			{displayName}
		</Chip>
	);
};

export default OrganizationChip;
