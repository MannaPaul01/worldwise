import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
    const [isLoadingPosition, setIsLoading] = useState(false);
    const [geolocationPosition, setPosition] = useState(defaultPosition);
    const [error, setError] = useState(null);

    function getPosition() {
        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");

        setIsLoading(true);
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

    return { isLoadingPosition, geolocationPosition, error, getPosition };
}