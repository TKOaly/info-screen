import Image from 'next/image';
import Link from 'next/link';
import Logo404 from '../../public/404.svg';

export default function NotFound() {
	return (
		<div className="flex min-h-screen min-w-full justify-evenly">
			<div className="flex flex-col items-center justify-center gap-y-8">
				<h1 className="text-6xl font-semibold text-[#fff500]">
					SALAINEN SYÖTE
				</h1>
				<Link href={'/'}>
					<button className="rounded-lg border p-4">Reload</button>
				</Link>
			</div>
			<div className="flex items-center justify-center">
				<Image
					className="animate-spin-slow"
					width={400}
					height={400}
					src={Logo404}
					alt="NOT-found"
				/>
			</div>
		</div>
	);
}
