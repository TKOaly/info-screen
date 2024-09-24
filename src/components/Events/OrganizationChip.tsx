import { type Organization as IlotaloOrg } from '@/server/ilotaloEvents';
import Chip from '../Chip';
import I18n from '../I18n/I18n';

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
		bg: 'ring-[#fff500] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#fff500]',
	},
	Matlu: {
		bg: 'ring-[#09773a] ring-1 ring-offset-1 ring-offset-transparent bg-[#ffb412]',
		text: 'text-[#111111]',
	},
	Limes: {
		bg: 'ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	Matrix: {
		bg: 'ring-[#000083] ring-1 ring-offset-1 ring-offset-transparent bg-[#eeeeee]',
		text: 'text-[#ff0000]',
	},
	Resonanssi: {
		bg: 'ring-[#00ff00] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#fe00fe]',
	},
	HYK: {
		bg: 'ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	MaO: {
		bg: 'ring-[#55bb88] ring-1 ring-offset-1 ring-offset-transparent bg-[#ffffff]',
		text: 'text-[#2b2a29]',
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
		bg: 'ring-[#ff0000] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffd202]',
	},
	Vasara: {
		bg: 'ring-[#000000] ring-1 ring-offset-1 ring-offset-transparent bg-[#eeeeee]',
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
		bg: 'ring-[#000000] ring-1 ring-offset-1 ring-offset-transparent bg-gradient-to-r from-[#13DBFC] to-[#FD0AD4]',
		text: 'text-[#ffffff]',
	},
	tiedekunta: {
		bg: 'font-inter ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	faculty: {
		bg: 'font-inter ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	kandiohjelma: {
		bg: 'font-inter ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	hyy: {
		bg: 'font-inter ring-[#000000] ring-1 ring-offset-1 ring-offset-transparent bg-[#ffffff]',
		text: 'text-[#000000]',
	},
	'tkt-alumni': {
		bg: 'ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ee981b]',
	},
	titol: {
		bg: 'bg-gradient-to-r from-[#001d39] to-[#003e7a]',
		text: 'text-[#ffffff]',
	},
	tik: {
		bg: 'ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	tietokilta: {
		bg: 'ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#000000]',
		text: 'text-[#ffffff]',
	},
	prodeko: {
		bg: 'bg-[#eeeeee]',
		text: 'text-[#002851]',
	},
	'kimmon ystävät': {
		bg: 'ring-[#ffffff] ring-1 ring-offset-1 ring-offset-transparent bg-[#ff0000]',
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

	const nameOnly = org.replace(/ (?:ry|rf)$/i, ''); // Remove organization suffixes
	const displayName = // Truncate name if it's too long
		truncate > 0 && nameOnly.length > truncate
			? `${nameOnly.slice(0, truncate).trim()}…`
			: nameOnly;

	return (
		<Chip
			className={`font-serif text-base ${orgTWColor ?? 'bg-black/20 text-grey-100'}`}
		>
			<I18n>{displayName}</I18n>
		</Chip>
	);
};

export default OrganizationChip;
