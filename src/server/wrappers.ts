'use server';

export async function get<Res>(
	url: string,
	config: RequestInit = {}
): Promise<Res> {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...config.headers,
		},
		...config,
	});
	if (!response.ok) {
		throw new Error(`Request failed: ${response.statusText}`);
	}
	if (response.headers.get('Content-Type')?.startsWith('application/json')) {
		const data = response.json();
		return data as Promise<Res>;
	}
	if (response.headers.get('Content-Type')?.startsWith('text/plain')) {
		const data = response.text();
		return data as Promise<Res>;
	}
	throw new Error('Unsupported content type');
}
