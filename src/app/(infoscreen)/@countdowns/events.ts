import { Temporal } from 'temporal-polyfill';

export interface IEvent {
	name: string;
	ends: Temporal.PlainDate;
}

/**
 * You can add events to the countdown slide. Copy the template below and paste it to the correct place.
 * The events will not be sorted in any other way. Also make sure the events have unique names.
 * When adding new events please delete old ones.
 *
 *  ```
 * 	{
 *		name: 'NAME OF THE EVENT HERE',
 *		ends: new Temporal.PlainDate(YEAR, MONTH, DAY),
 *  },
 * ```
 *
 */
export const EVENTS: IEvent[] = [
	{
		name: 'Lehmä 🐄',
		ends: new Temporal.PlainDate(2026, 5, 9),
	},
	{
		name: 'tistiS',
		ends: new Temporal.PlainDate(2026, 5, 14),
	},
	{
		name: 'Orientaatioviikko',
		ends: new Temporal.PlainDate(2026, 8, 24),
	},
	{
		name: 'KJYR 26',
		ends: new Temporal.PlainDate(2026, 10, 23),
	},
	{
		name: 'ATK-YTP tURKU',
		ends: new Temporal.PlainDate(2026, 10, 14),
	},
	{
		name: 'Vujut 38v',
		ends: new Temporal.PlainDate(2026, 11, 7),
	},
	{
		name: 'ATK-YTP Helsinki',
		ends: new Temporal.PlainDate(2027, 10, 20),
	},
	{
		name: 'ATK-YTP Oulu',
		ends: new Temporal.PlainDate(2028, 10, 18),
	},
] as const;
