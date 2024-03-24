'use client';

import Link from 'next/link';

const ErrorPage = ({ error }: { error: Error }) => {
	console.error(error);

	return (
		<div className="flex min-h-screen min-w-full justify-evenly">
			<div className="flex flex-col items-center justify-center gap-y-8">
				<h1 className="text-4xl font-bold text-red-500">
					VIRHE TAPAHTUI
				</h1>
				<Link className="rounded-lg border p-4" href={'/'}>
					<button>Reload</button>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
