import { ReactElement, useEffect, useState } from 'react';

export const FunctionAsChild = ({ children }: any) => children();

export const PassMeAString = ({ children }: { children: (name: string) => ReactElement }) =>
	children('Something');

interface FetchProps {
	children: (name: any[]) => JSX.Element;
	url: string;
}

export const Fetch = ({ children, url }: FetchProps) => {
	const [people, setPeople] = useState<any[]>([]);

	useEffect(() => {
		fetch(url)
			.then(d => d.json())
			.then(({ results }) => setPeople(results));
	}, []);

	return children(people);
};

export const List = ({ data }: { data: any[] }) => {
	return (
		<div>
			{data.map((p: any) => (
				<div key={p.name}>{p.name}</div>
			))}
		</div>
	);
};
