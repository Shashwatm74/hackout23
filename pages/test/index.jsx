import React, { useState, useEffect, useRef } from "react";
import "../_app";
import supabase from "@/lib/db/supabase";
import { toArray } from "gsap";
import styles from '@/styles/components/testpage/test.module.scss';
function Test() {
    const [fetchError, setFetchError] = useState(null);
    const [flights, setFlights] = useState(null);

    useEffect(() => {
        const fetchFlights = async () => {
            const { data, error } = await supabase
                .from("flights_ai")
                .select()
            if (error) {
                setFetchError('Could not fetch flights')
                setFlights(null)
                console.log(error)
            }
            if (data) {
                console.log(data)
                setFlights(data)
                setFetchError(null)
            }
        }
        fetchFlights()
    }, [])

    return (
        <>
            <div className={styles.di}>
                {fetchError && (<p>{fetchError}</p>)}
                {flights && (
                    <div>
                        {flights.map(flight => (
                            <p>{flight.fl_id}</p>
                        ))}
                    </div>
                )}
            </div>

        </>
    );
}

export default Test;
