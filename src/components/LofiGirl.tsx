import Image from 'next/image';

const LofiGirl = (props: React.ComponentProps<'div'>) => (
	<div className="relative flex" {...props}>
		<Image
			src={'/lofihiphop.gif'}
			fill
			className="z-20 object-contain"
			unoptimized
			alt={'Lo-Fi Girl'}
		/>
	</div>
);

export default LofiGirl;
