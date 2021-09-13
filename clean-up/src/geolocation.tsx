import React, { useEffect, useState } from 'react';
import { v4 } from 'public-ip';

export const Geolocation = () => {
	const [location, setLocation] = useState({
		longitude: '',
		latitude: '',
	});

	const [error, setError] = useState<React.ReactNode>();

	const handleSuccess = (data: { latitude: string; longitude: string }) => setLocation(data);
	const handleError = (error: any) => {
		setError(<div>{error.message}</div>);
	};

	const handleGetLocation = async (
		onSuccess: (data: { latitude: string; longitude: string }) => void,
		onError: (error: any) => void,
	) => {
		const data = navigator.geolocation.getCurrentPosition(position => {
			const coords = {
				latitude: position.coords.latitude.toString(),
				longitude: position.coords.longitude.toString(),
			};
			onSuccess(coords);
		}, onError);
	};

	useEffect(() => {}, []);

	// navig;

	return (
		<div>
			<button onClick={() => handleGetLocation(handleSuccess, handleError)}>Get location</button>

			<LocationContainer location={location} error={error} />
		</div>
	);
};

export default Geolocation;

function LocationContainer({
	location,
	error,
}: {
	location: { latitude: string; longitude: string };
	error: React.ReactNode;
}) {
	return (
		<div>
			<div>
				{location.latitude}
				<br />
				{location.longitude}
			</div>

			{error}
		</div>
	);
}
