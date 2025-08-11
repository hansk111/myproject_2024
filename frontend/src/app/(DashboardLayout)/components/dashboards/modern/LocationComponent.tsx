import React, { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

function LocationComponent() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error: GeolocationPositionError) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation(); // 컴포넌트 마운트 시 위치 정보 가져오기
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Latitude: {location.latitude}</h2>
      <h2>Longitude: {location.longitude}</h2>
    </div>
  );
}

export default LocationComponent;