import { Slide } from '@/components/Carousel';

export const dynamic = 'force-dynamic';

const Airquality = async () => {
	const dashboardUrl = process.env.AIRQUALITY_GRAFANA_DASHBOARD_URL;

	return (
		<Slide fullWidth className="bg-black">
			{dashboardUrl ? (
				<iframe
					className="size-full border-0"
					src={dashboardUrl}
					title="Air quality Grafana dashboard"
				/>
			) : (
				<div className="flex size-full items-center justify-center p-8 text-center">
					<h1 className="text-4xl font-semibold">
						Air quality dashboard URL is not configured
					</h1>
				</div>
			)}
		</Slide>
	);
};

export default Airquality;
