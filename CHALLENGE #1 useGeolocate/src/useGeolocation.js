import { useState, useEffect } from "react";

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const { lat, lng } = position;

  useEffect(
    function () {
      if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");

      // setIsLoading(true);
      if (isLoading) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            setIsLoading(false);
          },
          (error) => {
            setError(error.message);
            setIsLoading(false);
          }
        );
      }
    },
    [isLoading]
  );
  return { isLoading, error, lat, lng, setIsLoading };
}
