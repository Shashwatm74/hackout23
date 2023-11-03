import React, { useState, useEffect, useRef } from "react";
import "../_app";
import supabase from "@/lib/db/supabase";
function Test() {
    const [fetchError, setFetchError] = useState(null);
    const [flights, setFlights] = useState(null);

    useEffect(() => {
        const fetchFlights = async () => {
            const { data, error } = await supabase
                .from('flights_ai')
                .select()

            if (error) {
                setFetchError('Could not fetch flights')
                setFlights(null)
                console.log(error)
            }
            if (data) {
                setFlights(data)
                setFetchError(null)
                console.log(data)
            }
        }
        fetchFlights()
    }, [])
    return (
        <>
            <div>
                <button>call</button>
            </div>
        </>
    );
}

export default Test;
