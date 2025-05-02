import { useState } from "react";
import { useGeolocation } from "./useGeolocation";

export default function App() {
  const { isLoading, error, lat, lng, setIsLoading } = useGeolocation();
  const [countClicks, setCountClicks] = useState(0);

  function handleIsLoading() {
    setIsLoading(true);
    setCountClicks((count) => count + 1);
  }

  return (
    <div>
      <button onClick={handleIsLoading} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
