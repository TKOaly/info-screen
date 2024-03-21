import { Slide } from '@/components/Carousel';
import { RestaurantMenu } from '@/components/Restaurants/Restaurant';
import { getRestaurants } from '@/server/restaurants';

const Restaurants = async () => {
	const restaurants = await getRestaurants([
		'Exactum',
		'Chemicum',
		'Kaivopiha',
		'Myöhä Café & Bar',
	]);

	return Object.values(restaurants).length === 0 ? null : (
		/*
			<Slide fullWidth className="bg-green-unari p-0 font-gabarito">
				<LofiGirl />
			</Slide>
		*/
		<Slide
			fullWidth={Object.keys(restaurants).length > 2}
			className="flex-col bg-green-unari px-8 font-gabarito"
		>
			<div
				className={`grid w-full min-w-0 ${'grid-cols-' + Math.min(Object.keys(restaurants).length, 4)} gap-8`}
			>
				{Object.entries(restaurants).map(([name, restaurant]) => {
					if (!restaurant)
						return (
							<div
								key={name}
								className="flex flex-col items-center gap-y-4"
							>
								<h1 className="text-4xl">Unicafe {name}</h1>
								<p className="rounded-2xl bg-grey-800 p-4 text-xl font-semibold">
									No menu found
								</p>
							</div>
						);
					return (
						<RestaurantMenu key={name} restaurant={restaurant} />
					);
				})}
			</div>
		</Slide>
	);
};

export default Restaurants;
