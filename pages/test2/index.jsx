import React, { useState, useEffect } from "react";
import supabase from "@/lib/db/supabase";
import styles from "@/styles/components/testpage/test.module.scss";

function Test() {
    const [fetchError, setFetchError] = useState(null);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const { data, error } = await supabase
                    .from('hotels')
                    .select();
                if (error) {
                    throw new Error('Could not fetch hotels');
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

    return (
        <section className={styles.wrapper}>

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
                            <div className={styles.flex}>
                                <p className={styles.prize}>Price: {hotel.price}</p>
                                <button className={styles.btn}>+</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Test;
