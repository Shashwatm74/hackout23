import React, { useState, useEffect } from "react";
import supabase from "@/lib/db/supabase";
import styles from "@/styles/components/testpage/test.module.scss";

function Test() {
    const [fetchError, setFetchError] = useState(null);
    const [flights, setFlights] = useState([]);

    const [hotels, setHotels] = useState([]);

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
        const fetchHotels = async () => {
            try {
                const { data, error } = await supabase
                    .from('hotels')
                    .select();
                if (error) {
                    throw new Error('Could not fetch flights');
                }
                setHotels(data || []);
                setFetchError(null);
            } catch (error) {
                console.error(error);
                setFetchError(error.message)
                setHotels([])
            }
        };
        fetchHotels();
    }, []);

    // useEffect(() => {
    //     const fetchHotels = async () => {
    //         try {
    //             const { data, error } = await supabase
    //                 .from('hotels')
    //                 .select();
    //             if (error) {
    //                 throw new Error('Could not fetch flights');
    //             }
    //             setHotels(data || []);
    //             setFetchError(null);
    //         } catch (error) {
    //             console.error(error);
    //             setFetchError(error.message)
    //             setHotels([])
    //         }
    //     };
    //     fetchHotels();
    // }, []);

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                {fetchError && <p>{fetchError}</p>}
                <div className={styles.flight_list}>
                    {flights.map(flight => (
                        <div key={flight.fl_id} className={styles.flight_items}>
                            <p>Flight No.: {flight.fl_id}</p>
                            <p>Time: {flight.time}</p>
                            <p>Source: {flight.source}</p>
                            <p>Destination: {flight.destination}</p>
                            <p>Price: {flight.price}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.container}>
                {fetchError && <p>{fetchError}</p>}
                <div className={styles.flight_list}>
                    {hotels.map(hotel => (
                        <div key={hotel.hotel_id} className={styles.flight_items}>
                            <p>Hotel No.: {hotel.hotel_id}</p>
                            <p>Check_in: {hotel.check_in}</p>
                            <p>Check_out: {hotel.check_out}</p>
                            <p>Latitude: {hotel.latitude}</p>
                            <p>Longitude: {hotel.longitude}</p>
                            <p>Price: {hotel.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Test;
