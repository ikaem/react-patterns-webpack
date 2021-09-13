import React, { useCallback, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HookedComponent } from './components';
import { ReducedComponent } from './reduced-component';
import Geolocation from './geolocation';
import {
	SomeComponent,
	EnhancedSomeComponent,
	EnhancedSomeInnerWidthComponent,
} from './hoc-component';
import { Fetch, FunctionAsChild, List, PassMeAString } from './function-as-child';

const fakeArr = ['here'];
function App() {
	const [input, setInput] = useState('');
	const [arrData, setArrDate] = useState(fakeArr);
	// const normalFunction = (a: number, b: number) => a + b

	// const curriedFunction = (a: number) => (b: number) => a + b

	// const starter = curriedFunction(3) // holds 3
	// const result = starter(16) // result = 16 + 3

	// console.log(result)

	// const firstFunction = (a: number, b: number) => a + b
	// const secondFunction = (a: number) => a * a

	// const result = secondFunction(firstFunction(2, 3)) // 25
	// console.log(result)

	// const f = (state: any) => {
	// 	const UI = state + 'some other logic'
	// 	return UI
	// }
	// const UI = f({ a: 'some state' })

	const filteredArrData = useMemo(
		() =>
			arrData.filter(d => {
				console.log('filtering...');
				return true;
			}),
		[arrData],
	);

	const someFunction = useCallback(() => {
		console.log('just log the function', arrData); // needs new data
	}, [arrData]);
	// }, [])

	// will call the some funciton only if the arrData has been changed

	useEffect(() => {
		someFunction();
	}, [arrData, someFunction]);

	// useEffect(() => {
	// 	console.log('the someFunction has been re-created...') // keeps going for each change of state of the App component
	// }, [someFunction])

	useEffect(() => {
		// console.log('Rendering App Component')
	});

	return (
		<div className="App">
			<FunctionAsChild>{() => <div>Hello</div>}</FunctionAsChild>
			<PassMeAString>{name => <div>{name}</div>}</PassMeAString>

			<Fetch url="https://swapi.dev/api/people">{(people: any[]) => <List data={people} />}</Fetch>

			{/* <input type="text" onChange={e => setInput(e.target.value)} /> */}
			{/* <HookedComponent me="you" />
			<ReducedComponent />
			<Geolocation /> */}
			{/* <EnhancedSomeComponent />
			<SomeComponent />
			<EnhancedSomeInnerWidthComponent /> */}
			{/*
			<button
				onClick={() => {
					setArrDate(prev => [...prev, ...prev]);
				}}
			>
				Click
			</button> */}
		</div>
	);
}

export default App;
