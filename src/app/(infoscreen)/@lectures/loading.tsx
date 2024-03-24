import { Slide } from '@/components/Carousel';

const TemplateError = async () => {
	return (
		<Slide className="bg-grey-800">
			<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
				<h1 className="text-4xl">Loading lecture rooms...</h1>
			</div>
		</Slide>
	);
};

export default TemplateError;
