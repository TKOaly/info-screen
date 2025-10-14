import Image from 'next/image';
import voteSvg from '/public/vote.svg';

export const VotingSvg = () => (
	<Image
		key="vote-svg"
		alt="vaalit.hyy.fi QR code"
		className="mt-12 self-center"
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		src={voteSvg}
	/>
);
