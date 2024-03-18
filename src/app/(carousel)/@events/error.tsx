'use client';

const EventsError = () => {
	return (
		<div className="flex min-h-full min-w-full flex-col items-center gap-y-4">
			<h2 className="mb-4 text-4xl font-bold">Events</h2>
			<h3 className="text-2xl font-bold">{'Error loading events :('}</h3>
		</div>
	);
};

export default EventsError;
