import { Slide } from '@/components/Carousel';

/*
Steps for creating a new slide
- Implement content here
- Implement loading and error pages
- Implement data fetching as a server action in @/server if the data updates infrequently
    in order to minimize work the dinky rasberry client has to do
- If the data needs to update frequently e.g. transit it may me better to do it client side
    to not call the TKO-äly backend thousands of times per day
- Add slide to ../layout
- Add possible revalidation interval to ../page
*/

const TemplateSlide = async () => {
	return (
		<Slide
			// fullWidth ( slides take up half the screen by default )
			className="bg-grey-500"
		>
			Implement slide content here. Example/template for an image covering
			the whole slide wan be found in @/components/LofiGirl.
		</Slide>
	);
};

export default TemplateSlide;
