import { Restaurant } from '@/server/restaurants';
import * as React from 'react';
import Chip from '../Chip';

type RestaurantMenuProps = {
	restaurant: Restaurant;
};

export const RestaurantMenu = ({ restaurant }: RestaurantMenuProps) => (
	<div className="flex flex-col items-center gap-y-4">
		<h1 className="-mb-4 text-4xl">Unicafe {restaurant.name}</h1>
		{restaurant.lunchHours && (
			<p className="text-xl">Lunch {restaurant.lunchHours}</p>
		)}
		<div className="flex w-full flex-col items-center gap-y-3">
			<Menu foodlist={restaurant.menuGroups} />
		</div>
	</div>
);

const Menu = ({ foodlist }: { foodlist: Restaurant['menuGroups'] }) => {
	const categories = Object.keys(foodlist);

	return categories.map((category) => {
		const categoryFoods = foodlist[category];

		if (!categoryFoods || categoryFoods.length === 0) return null;

		return (
			<div key={category} className="flex w-full flex-col gap-y-2">
				<h2 className="-mb-2 ml-3 text-lg">
					{category
						.toLocaleUpperCase('fi-FI')
						.replace('KAIVOPIHA', '')
						.trim()}
				</h2>
				{categoryFoods.map((food) => (
					<Food
						key={food.name}
						food={food}
						displayMeta={category !== 'tiedoitus'}
					/>
				))}
			</div>
		);
	});
};

const foodColor = (
	price: string,
	responsibility: string[],
	diets: string[]
) => {
	if (Number(price) < 2) return 'bg-pink-500';
	if (
		responsibility.join('').includes('Ilmasto') ||
		diets.join(' ').toLowerCase().includes('ve')
	)
		return 'bg-green-700';
	if (responsibility.join('').includes('kala')) return 'bg-sky-700';
	return 'bg-rose-600';
};

const Food = ({
	food: {
		name,
		price,
		meta: { diet, allergies, responsibility },
	},
	displayMeta,
}: {
	food: NonNullable<NonNullable<Restaurant['menuGroups'][number]>[number]>;
	displayMeta: boolean;
}) => (
	<div
		className={`flex flex-col gap-y-4 rounded-2xl p-4 ${foodColor(
			price,
			responsibility,
			diet
		)}`}
	>
		<p className="pl-1 text-xl font-semibold text-white">{name}</p>
		<div className="flex w-full flex-wrap gap-2">
			{displayMeta && (
				<>
					{price && <Chip variant="warning">{`${price} €`}</Chip>}
					{responsibility.join('').includes('Ilmasto') && (
						<Chip className="bg-green-500 text-grey-800">
							Climate choice
						</Chip>
					)}
					{responsibility.join('').includes('kala') && (
						<Chip className="bg-sky-500 text-grey-800">Fish</Chip>
					)}
					{Number(price) < 2 && (
						<Chip className="bg-pink-300 text-grey-800">
							Dessert
						</Chip>
					)}
					{toChips(diet, {
						className: `text-white/90 bg-black/20`,
					})}
					{toChips(allergies, {
						className: `text-white/90 bg-white/20`,
					})}
				</>
			)}
		</div>
	</div>
);

const toChips = (
	array: string[],
	chipProps?: React.ComponentProps<typeof Chip>
) => {
	if (array.length === 0) return null;

	return (
		<>
			{array.map((chip: string) => (
				<Chip key={chip} {...chipProps}>
					{chip}
				</Chip>
			))}
		</>
	);
};
