import React, { useState, useEffect } from "react";
import supabase from "@/lib/db/supabase";

function Test() {
    const [fetchError, setFetchError] = useState(null);
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const { data, error } = await supabase
                    .from('flights_ai')
                    .select();

                if (error) {
                    throw new Error('Could not fetch flights');
                }

                setFlights(data || []);
                setFetchError(null);
            } catch (error) {
                console.error(error);
                setFetchError(error.message);
                setFlights([]);
            }
        };

        fetchFlights();
    }, []);

    return (
        <div>
            {fetchError && <p>{fetchError}</p>}
            <div className="flight-list">
                {flights.map(flight => (
                    <div key={flight.fl_id} className="flight-item">
                        <p>Flight No.: {flight.fl_id}</p>
                        <p>Time: {flight.time}</p>
                        <p>Source: {flight.source}</p>
                        <p>Destination: {flight.destination}</p>
                        <p>Price: {flight.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Test;
