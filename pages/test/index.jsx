import React, { useState, useEffect } from "react";
import supabase from "@/lib/db/supabase";

function Test() {
    const [fetchError, setFetchError] = useState(null);
    const [flights, setFlights] = useState(null);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const { data, error } = await supabase
                    .from('flights_ai')
                    .select();

                if (error) {
                    throw new Error('Could not fetch flights');
                }

                setFlights(data);
                setFetchError(null);
                console.log(data);
            } catch (error) {
                setFetchError(error.message);
                setFlights(null);
            }
        };

        fetchFlights();
    }, []);

    return (
        <>
            <div>
                {fetchError && <p>{fetchError}</p>}
                {flights && (
                    <ul>
                        {flights.map(flight => (
                            <li key={flight.flight_id}>
                                {flight.source} to {flight.destination} - Price: {flight.price}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </>
    );
}

export default Test;
