import React, { useState } from 'react';

const LocationPrompt = () => {
  const [location, setLocation] = useState({
    city: '',
    state: '',
	  village: '',
	  suburb: '',
  });
  const [error, setError] = useState('');

  const getLocation = () => {
    if (!navigator.geolocation) {	
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use a reverse geocoding API to get location details
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
			const { state, village, suburb, city } = data.address;
			console.log(data);
          setLocation({ state, city, village, suburb });
        } catch (err) {
          setError('Failed to fetch location details');
        }
      },
      () => {
        setError('Unable to retrieve your location');
      }
    );
  };

  return (
    <div>
      <h1>Get Your Location</h1>
      <button onClick={getLocation}>Enable GPS</button>
      {location.city && (
        <p>
          City: {location.city}, State: {location.state}, Area: {location.suburb}
        </p>
      )}
		  {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LocationPrompt;
