import React, { useState, useEffect, useRef } from "react";
import styles from "styles/components/dashboard/dashboard.module.scss";
import supabase from "@/lib/db/supabase";
import Image from 'next/image';
import { useAuth } from "@/lib/hooks/AuthHook";

function Dashboard() {
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
            <useAuth>
                <section className={styles.dashboard}>
                    <h1 className={styles.title}>Your Trip</h1>
                    <div className={styles.where}>
                        <div className={styles.icon1}>ico</div>
                        <div className="styles.holder"><input type="text" placeholder="Where to" /></div>
                        <div className={styles.icon2}>=</div>
                        <div className="styles.holder"><input type="text" placeholder="Where from" /></div>

                    </div>
                    <div className={styles.date}>
                        <div className={styles.icon3}>ico</div>
                        <div>Date</div>
                        <div><input type="date" placeholder="from" /></div>
                        <div>-</div>
                        <div><input type="date" name="till" /></div>
                    </div>
                    <div className={styles.ppl}>
                        <div className={styles.icon4}>ico</div>
                        <div>No. of travellers</div>
                        <div><input type="number" placeholder="num" /></div>
                    </div>
                    <div className={styles.money}>
                        <div className={styles.icon5}>ico</div>
                        <div>Budget</div>
                        <div><input type="number" placeholder="num" /></div>
                    </div>
                    <div className={styles.travel}>
                        <div className={styles.icon6}>ico</div>
                        <div>Travel</div>
                        <div><input type="radio" name="radio" />Flight</div>
                        <div><input type="radio" name="radio" />Train</div>
                    </div>
                    <div className={styles.food}>
                        <div className={styles.icon7}>ico</div>
                        <div className="styles.holder">Food</div>
                        <div><input type="radio" name="radio" />Veg</div>
                        <div><input type="radio" name="radio" />Non Veg</div>
                    </div>
                    <button className={styles.submit}>Submit</button>
                    {/* <div className={styles.img}></div> */}
                    <h1 className={styles.title2}>Preference</h1>
                    <h1 className={styles.preftrav}>Travel:</h1>
                    <div className={styles.menu1}>
                        <select>
                            <option value="0">luxurious</option>
                            <option value="1">Attractive</option>
                            <option value="2">Economic</option>
                        </select>
                    </div>
                    <h1 className={styles.prefhot}>Hotel:</h1>
                    <div className={styles.menu2}>
                        <select>
                            <option value="0">luxurious</option>
                            <option value="1">Attractive</option>
                            <option value="2">Economic</option>
                        </select>
                    </div>
                    <h1 className={styles.recc}>Recommendation</h1>
                    <div className={styles.card1}></div>
                </section>
                <section className={styles.wrapper}>
                    <div className={styles.container}>
                        {fetchError && <p>{fetchError}</p>}
                        <div className={styles.flight_list}>
                            {flights.map(flight => (
                                <div key={flight.fl_id} className={styles.flight_items}>
                                    <div className={styles.flight_pcont}>
                                        <p>Flight No.: {flight.fl_id}</p>
                                        <p>Time: {flight.time}</p>
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
                        <div className={styles.train_list}>
                            {trains.map(train => (
                                <div key={train.trn_no} className={styles.train_items}>
                                    <div className={styles.train}>
                                        <p>Train No.: {train.trn_no}</p>
                                        <p>Available Seats: {train.avl_ss}</p>
                                        <div className={styles.flex}>
                                            <p className={styles.prize}>Price: {train.price}</p>
                                            <button className={styles.btn}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className={styles.free}>
                    <section className={styles.wrapper}>
                        <div className={styles.container}>
                            {fetchError && <p>{fetchError}</p>}
                            <div className={styles.hotel_list}>
                                {hotels.map(hotel => (
                                    <div key={hotel.hotel_id} className={styles.hotel_items}>
                                        <div className={styles.hotel}>

                                            <p>Hotel No.: {hotel.hotel_id}</p>
                                            <div className={styles.flex}>
                                                <p className={styles.prize}>Price: {hotel.price}</p>
                                                <button className={styles.btn}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </section>


            </useAuth>
        </>
    );
}

export default Dashboard;