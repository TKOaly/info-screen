import { Restaurant } from '@/server/restaurants';
import * as React from 'react';
import Chip from '../Chip';

type RestaurantMenuProps = {
	restaurant: Restaurant;
};

export const RestaurantMenu = ({ restaurant }: RestaurantMenuProps) => {
	if (!restaurant) {
		return (
			<div>
				<p className="text-sm font-semibold text-red-500">
					Error loading Unicafe data
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-y-4">
			<h1 className="text-4xl">Unicafe {restaurant.name}</h1>
			{restaurant.lunchHours && (
				<p className="text-lg">Lunch {restaurant.lunchHours}</p>
			)}
			<div className="flex w-max flex-col items-center gap-y-4">
				{parseFoodlisting(restaurant.groups)}
			</div>
		</div>
	);
};

const parseFoodlisting = (foodlist: Restaurant['groups']) => {
	const keys = Object.keys(foodlist);
	return keys.map((key) => {
		const foodItems = foodlist[key];
		return (
			<React.Fragment key={`${key}`}>
				<h3 className="text-lg text-grey-500">{key}</h3>
				{mapFooditems(foodItems, key !== 'tiedoitus')}
			</React.Fragment>
		);
	});
};

const mapFooditems = (foodItems, displayMeta: boolean) =>
	foodItems.map(({ name, prices, meta }) => (
		<div key={`${name}`} className="flex flex-col">
			<p className="text-lg">{name}</p>
			<div className="flex w-full flex-wrap gap-2">
				{displayMeta && (
					<>
						{prices?.student && (
							<Chip variant="primary">{`${prices.student}€`}</Chip>
						)}
						{meta.climateChoice && (
							<Chip variant="success">{'"Climate choice"'}</Chip>
						)}
						{toChips(meta.diet, { color: 'secondary' })}
						{toChips(meta.allergies)}
					</>
				)}
			</div>
		</div>
	));

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
