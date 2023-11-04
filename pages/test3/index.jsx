import React, { useState, useEffect } from "react";
import supabase from "@/lib/db/supabase";
import styles from "@/styles/components/testpage/test.module.scss";

function Test3() {
    const [fetchError, setFetchError] = useState(null);
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
        <section className={styles.wrapper}>
            <div className={styles.container}>
                {fetchError && <p>{fetchError}</p>}
                <div className={styles.flight_list}>
                    {trains.map(train => (
                        <div key={train.trn_no} className={styles.flight_items}>
                            <p>Train No.: {train.trn_no}</p>
                            <p>Departure: {train.dept}</p>
                            <p>Arrival: {train.arr}</p>
                            <p>Source: {train.source}</p>
                            <p>Destination: {train.destination}</p>
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
    );
}

export default Test3;
