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
    }, []);

    useEffect(() => {
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

    const [trains, setTrains] = useState([]);

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const { data, error } = await supabase
                    .from('train_ai')
                    .select();
                if (error) {
                    throw new Error('Could not fetch trains');
                }
                setTrains(data || []);
                setFetchError(null);
            } catch (error) {
                console.error(error);
                setFetchError(error.message);
                setTrains([]);
            }
        };
        fetchTrains();
    }, []);

    return (
        <>
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    {fetchError && <p>{fetchError}</p>}
                    <div className={styles.flight_list}>
                        {flights.map(flight => (
                            <div key={flight.fl_id} className={styles.flight_items}>
                                <div className={styles.flight_pcont}>
                                    <p>Flight No.: {flight.fl_id}</p>
                                    <p>Time: {flight.time}</p>
                                    {/* <p>Source: {flight.source}</p>
                            <p>Destination: {flight.destination}</p> */}
                                    <div className={styles.flex}>
                                        <p className={styles.prize}>Price: {flight.price}</p>
                                        <button className={styles.btn}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    {fetchError && <p>{fetchError}</p>}
                    <div className={styles.flight_list}>
                        {trains.map(train => (
                            <div key={train.trn_no} className={styles.flight_items}>
                                <p>Train No.: {train.trn_no}</p>
                                <p>Available Seats: {train.avl_ss}</p>
                                <div className={styles.flex}>
                                    <p className={styles.prize}>Price: {train.price}</p>
                                    <button className={styles.btn}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    {fetchError && <p>{fetchError}</p>}
                    <div className={styles.hotel_list}>
                        {hotels.map(hotel => (
                            <div key={hotel.hotel_id} className={styles.hotel_items}>
                                <p>Hotel No.: {hotel.hotel_id}</p>
                                <div className={styles.flex}>
                                    <p className={styles.prize}>Price: {hotel.price}</p>
                                    <button className={styles.btn}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Test;
