import { Component, useEffect, useState } from 'react';

type HocComponentProps = React.Component;

const HocComponent = (Component: React.FC) => (props: any) => {
	// so here we pass our own
	return <Component className="test" {...props} />;
};

// now jsut create some component

// this is not ennaced
export const SomeComponent = (props: any) => {
	console.log({ props });
	return <div {...props}>hello</div>;
};

// this is enhanced  // and it still gets its own props, passeds to it
export const EnhancedSomeComponent = HocComponent(SomeComponent);

// just create compoennt that accepts a compoennt, returns it
// a but different way
const withInnerWidth = (Component: React.FC) => {
	// here we just define that we return a new function - compoennt
	return (props: any) => {
		const [innerWidth, setInnerWidth] = useState(window.innerWidth);
		const handleResize = () => {
			setInnerWidth(window.innerWidth);
		};

		useEffect(() => {
			window.addEventListener('resize', handleResize);

			return () => window.removeEventListener('resize', handleResize);
		}, []);

		return <Component {...props} innerWidth={innerWidth} />;
	};
};

const SomeInnerWidthComponent = (props: any) => <div>{props.innerWidth}</div>;

export const EnhancedSomeInnerWidthComponent = withInnerWidth(SomeInnerWidthComponent);
