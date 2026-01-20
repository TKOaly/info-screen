import { Slide } from '@/components/Carousel';
import I18n from '@/components/I18n/I18n';
import { getKJYRDate } from '@/server/TKOalyEvents';
import { differenceInCalendarDays, isPast } from 'date-fns';

const TjSlide = async () => {
	const KJYRMonth = 10;
	const KJYRDayOfMonth = 25;

	const KJYRDate = await getKJYRDate();

	const today = new Date();
	const getAprroximationKJYRDate = () => {
		let date;
		if (KJYRDate != null)
			date = new Date(KJYRDate);
		else {
			date = new Date(today.getFullYear(), KJYRMonth, KJYRDayOfMonth);
			if(isPast(date))
				date.setFullYear(date.getFullYear() + 1);
		}

		return date;
	};

	const daysToKJYR = differenceInCalendarDays(getAprroximationKJYRDate(), today);

	return (
		<Slide className="bg-grey-900 pt-3">
        <div className="flex size-full min-h-0 flex-col items-center justify-center gap-y-8">
            <div className="flex items-center justify-center">
                <p className="text-9xl font-extrabold text-green-500 tracking-tight text-center">
                    <I18n>KJYR TJ: // DAYS UNTIL KJYR:</I18n>
                </p>
            </div>
            <div className="flex items-center justify-center">
                <p className="text-[12rem] font-extrabold text-red-500 tracking-tight text-center">
                    {daysToKJYR}
                </p>
            </div>
        </div>
    	</Slide>
	);
};

export default TjSlide;
