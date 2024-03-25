import { Slide } from '@/components/Carousel';
import { getRestaurants } from '@/server/restaurants';
import CloseRestaurants from './CloseRestaurants';
import { Restaurant } from './Restaurant';

const Restaurants = async () => {
	const restaurants = await getRestaurants([
		'Exactum',
		'Chemicum',
		'Kaivopiha',
		// 'Myöhä Café & Bar',
	]);

	if (restaurants.length === 0) return null;

	return (
		<Slide
			fullWidth={restaurants.length > 2}
			className="flex-col bg-green-unari px-8 pt-3 font-gabarito"
		>
			<CloseRestaurants restaurants={restaurants} />
			<div className="flex w-full justify-center py-2">
				<h1 className="text-5xl">Unicafe</h1>
			</div>
			<div
				className={`grid size-full ${'grid-cols-' + Math.min(restaurants.length, 4)} gap-8`}
			>
				{restaurants.map((restaurant) => (
					<Restaurant key={restaurant.name} restaurant={restaurant} />
				))}
			</div>
		</Slide>
	);
};

export default Restaurants;
