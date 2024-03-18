'use client';

import Link from 'next/link';
import { TwitterTweetEmbed } from 'react-twitter-embed';

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
			<div className="flex scale-150 items-center justify-center px-16">
				<TwitterTweetEmbed
					placeholder="Loading tweet..."
					options={{
						theme: 'dark',
						width: '800',
						align: 'center',
						lang: 'fi',
						dnt: true,
					}}
					tweetId={'1231157901760307200'}
				/>
			</div>
		</div>
	);
};

export default ErrorPage;
