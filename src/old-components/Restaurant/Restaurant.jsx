import {
	Box,
	Chip,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

const Restaurant = ({ restaurant }) => {
	if (restaurant.error) {
		return (
			<div>
				<h5 className="text-base font-semibold">{restaurant.name}</h5>
				<p className="text-sm font-semibold text-red-500">
					Error loading Unicafe data
				</p>
				<pre className="text-base opacity-50">{restaurant.error}</pre>
			</div>
		);
	}

	return (
		<div>
			<Typography variant="h5">Unicafe {restaurant.name}</Typography>
			{restaurant.lunchHours && (
				<Typography variant="subtitle1">
					Lunch {restaurant.lunchHours}
				</Typography>
			)}
			<List sx={{ width: 'max-content', marginInline: 'auto' }}>
				{parseFoodlisting(restaurant.groups)}
			</List>
		</div>
	);
};

// prop is object "restaurant"
Restaurant.propTypes = {
	restaurant: PropTypes.object,
};

const parseFoodlisting = (foodlist) => {
	const keys = Object.keys(foodlist);
	return keys.map((key) => {
		const foodItems = foodlist[key];
		return (
			<React.Fragment key={`${key}`}>
				<ListSubheader>{key}</ListSubheader>
				{mapFooditems(foodItems, key !== 'tiedoitus')}
			</React.Fragment>
		);
	});
};

const mapFooditems = (foodItems, displayMeta) =>
	foodItems.map(({ name, prices, meta }) => (
		<ListItem key={`${name}`}>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<ListItemText primary={name} />
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '6px',
						maxWidth: '40ch',
					}}
				>
					{displayMeta && (
						<>
							{prices?.student && (
								<Chip
									color="primary"
									label={`${prices.student}€`}
								/>
							)}
							{meta.climateChoice && (
								<Chip color="success" label="Climate choice" />
							)}
							{toChips(meta.diet, { color: 'secondary' })}
							{toChips(meta.allergies)}
						</>
					)}
				</Box>
			</Box>
		</ListItem>
	));

const toChips = (array, chipProps) => {
	if (array.length === 0) return null;

	return (
		<>
			{array.map((chip) => (
				<Chip key={chip} label={chip} {...chipProps} />
			))}
		</>
	);
};

export default Restaurant;
