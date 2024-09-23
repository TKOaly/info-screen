import Chip from '@/components/Chip';
import { type Restaurant } from '@/server/restaurants';

type FoodType = NonNullable<
	NonNullable<Restaurant['menuGroups'][number]>[number]
>;

const foodColor = (food: FoodType) => {
	const {
		name,
		price,
		meta: { responsibility, diet, allergies },
	} = food;
	if (Number(price) === 0) return 'bg-orange-400';
	if (Number(price) < 2) return 'bg-pink-500';
	if (
		responsibility.join('').includes('Ilmasto') ||
		diet.join(' ').toLowerCase().includes('ve')
	)
		return 'bg-green-700';
	if (
		responsibility.concat(allergies).join('').includes('kala') ||
		name.toLowerCase().includes('fish')
	)
		return 'bg-sky-700';
	return 'bg-rose-600';
};

export const Food = ({
	food,
	displayMeta,
}: {
	food: FoodType;
	displayMeta: boolean;
}) => {
	const {
		name,
		price,
		meta: { diet, allergies, responsibility },
	} = food;

	return (
		<div
			className={`flex flex-col gap-y-3 rounded-2xl p-3 ${foodColor(food)}`}
		>
			<p className="pl-1 text-2xl font-semibold text-white">{name}</p>
			<div className="flex w-full flex-wrap gap-2">
				{displayMeta && (
					<>
						{price && Number(price) > 0 && (
							<Chip variant="warning">{`${price} €`}</Chip>
						)}
						{responsibility.join('').includes('Ilmasto') && (
							<Chip className="bg-green-500 text-black/70">
								Climate choice
							</Chip>
						)}
						{responsibility.join('').includes('kala') && (
							<Chip className="bg-sky-500 text-black/70">
								Fish
							</Chip>
						)}
						{Number(price) < 2 && Number(price) > 0 && (
							<Chip className="bg-pink-300 text-black/70">
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
};

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
