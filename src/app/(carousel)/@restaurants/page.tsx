import { Slide } from '@/components/Carousel';
import { RestaurantMenu } from '@/components/Restaurants/Restaurant';
import { getRestaurants } from '@/server/restaurants';

const Restaurants = async () => {
	const restaurants = await getRestaurants([
		'Chemicum',
		'Exactum',
		'Kaivopiha',
	]);

	if (Object.values(restaurants).length > 0)
		return <p>There are no open restaurants at the moment.</p>;

	return (
		<Slide full className="bg-green-900 pb-0">
			<div className="flex min-h-0 overflow-hidden">
				<div className="flex">
					{restaurants.Chemicum && (
						<RestaurantMenu restaurant={restaurants.Chemicum} />
					)}
					{restaurants.Kaivopiha && (
						<RestaurantMenu restaurant={restaurants.Kaivopiha} />
					)}
					{restaurants.Exactum && (
						<RestaurantMenu restaurant={restaurants.Exactum} />
					)}
				</div>
			</div>
		</Slide>
	);
};

export default Restaurants;
