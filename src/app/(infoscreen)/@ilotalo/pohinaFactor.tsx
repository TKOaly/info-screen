import Chip from '@/components/Chip';
import I18n from '@/components/I18n/I18n';
import { getPohinaFactor } from '@/server/pohinaFactor';
import { differenceInMinutes, isWithinInterval, setHours } from 'date-fns';

const PohinaFactor = async () => {
	const { pohinaFactor, lastActivity } = await getPohinaFactor();

	const differenceMin = differenceInMinutes(new Date(), lastActivity);
	const differenceHours = Math.floor(differenceMin / 60);
	const differenceDays = Math.floor(differenceMin / 60 / 24);

	const differenceText =
		differenceMin < 60
			? `Aktiivisuutta havaittu ${differenceMin} min sitten // Activity detected ${differenceMin} min ago`
			: differenceHours < 24
				? `Aktiivisuutta havaittu ${differenceHours} h sitten // Activity detected ${differenceHours} h ago`
				: `Aktiivisuutta havaittu ${differenceDays} pv sitten // Activity detected ${differenceDays} d ago`;

	return (
		!isWithinInterval(new Date(), {
			start: setHours(new Date(), 7),
			end: setHours(new Date(), 18),
		}) && (
			<>
				<h3 className="p-2 text-2xl font-bold">
					<I18n>Pöhinäkerroin // Pöhinäfactor</I18n>
				</h3>
				<hr className="w-full" />
				<div className="p-4 pb-0">
					<div className="flex gap-2">
						{pohinaFactor !== undefined && (
							<Chip className="bg-org-matlu-secondary text-grey-100">
								<I18n>
									{`Pöhinäkerroin: ${pohinaFactor.toString()} // Pöhinäfactor: ${pohinaFactor.toString()}`}
								</I18n>
							</Chip>
						)}
						{lastActivity && (
							<Chip className="bg-org-matlu-secondary text-grey-100">
								<I18n>{differenceText}</I18n>
							</Chip>
						)}
					</div>
				</div>
			</>
		)
	);
};

export default PohinaFactor;
