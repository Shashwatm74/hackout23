import React, { useState, useEffect } from "react";
import styles from "styles/components/dashboard/dashboard.module.scss";
import supabase from "@/lib/db/supabase";
import Image from 'next/image';
import { useAuth } from "@/lib/hooks/AuthHook";

function Dashboard() {
    const [whereto, setWhereto] = useState("");
    const [wherefrom, setWherefrom] = useState("");
    const [ddmmyyyy, setDdmmyyyy] = useState("");
    const [ddmmyyyy2, setDdmmyyyy2] = useState("");
    const [numOfTravelers, setNumOfTravelers] = useState("");
    const [budget, setBudget] = useState("");
    const [selectedValue, setSelectedValue] = useState(""); //
    const [selectValue, setSelectValue] = useState("0");
    const [selectValue1, setSelectValue1] = useState("0");

    const [fetchError, setFetchError] = useState(null);
    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [trains, setTrains] = useState([]);
    const [flights1, setFlights1] = useState([]);
    const [hotels1, setHotels1] = useState([]);
    const [trains1, setTrains1] = useState([]);
    let whereFrom;
    let dateOfDept;
    let whereTo;
    let dateOfArr;
    let numOfTrav;
    let money;
    let travel;
    let travelPref;
    let hotelPref;

    let moneyToTravel;
    let moneyToStay;
    let moneyToFood;
    let savedMoney;



    const handleFormSubmit = () => {
        whereFrom = wherefrom;
        dateOfDept = ddmmyyyy;
        whereTo = whereto;
        dateOfArr = ddmmyyyy2;
        numOfTrav = numOfTravelers;
        money = budget;
        travel = selectedValue;
        travelPref = selectValue;
        hotelPref = selectValue1;
        console.log(whereTo, whereFrom, dateOfDept, dateOfArr, numOfTrav, money, travel, travelPref, hotelPref);
        if (travelPref == '0' && hotelPref == '0') {
            moneyToTravel = money / 2;
            moneyToStay = (money - moneyToTravel) / 2;
            moneyToFood = (money - moneyToStay - moneyToTravel);
        }
        if (travelPref == '0' && hotelPref == '1') {
            moneyToTravel = money / 2;
            moneyToStay = (money - moneyToTravel) / 4;
            moneyToFood = 0.5 * (money - moneyToStay - moneyToTravel);
            savedMoney = (money - moneyToFood - moneyToStay - moneyToTravel);
        }
        if (travelPref == '1' && hotelPref == '0') {
            moneyToStay = money / 2;
            moneyToTravel = (money - moneyToStay) / 4;
            moneyToFood = 0.5 * (money - moneyToStay - moneyToTravel);
            savedMoney = (money - moneyToFood - moneyToStay - moneyToTravel);
        }
        if (travelPref == '1' && hotelPref == '1') {
            moneyToTravel = money / 2;
            moneyToStay = (money - moneyToTravel) / 2;
            moneyToFood = (money - moneyToStay - moneyToTravel);
        }
        console.log(moneyToFood, moneyToStay, moneyToTravel);
        if (travel === 'option1') {
            console.log('flight')
        } else if (travel === 'option2') {
            console.log('trains')
        }
    };

    const fetchBudFlights = async () => {
        try {
            const { data, error } = await supabase
                .from('flights_ai')
                .select()
                // .eq('destination', whereTo)
                // .and
                // .eq('source', whereFrom)
                // .and
                .lte('price', moneyToTravel)
            if (error) {
                throw new Error('Could not fetch flights');
            }

            setFlights1(data || []);
            console.log(data)
            setFetchError(null);
            console.log(data);
        } catch (error) {
            console.error(error);
            setFetchError(error.message);
            setFlights1([]);
        }
    };



    const fetchBudHotels = async () => {
        try {
            const { data, error } = await supabase
                .from('hotels')
                .select()
                .lte('price', moneyToStay)

            if (error) {
                throw new Error('Could not fetch hotels');

            }
            setHotels1(data || []);
            setFetchError(null);
            console.log(data)
        } catch (error) {
            console.error(error);
            setFetchError(error.message);
            setHotels1([]);
        }
    };


    const fetchBudTrains = async () => {
        try {
            const { data, error } = await supabase
                .from('train_ai')
                .select()
                .lte('price', moneyToTravel)
            if (error) {
                throw new Error('Could not fetch trains');
            }
            setTrains1(data || []);
            setFetchError(null);
        } catch (error) {
            console.error(error);
            setFetchError(error.message);
            setTrains1([]);
        }
    };



    const handleShowSubmit = () => {
        console.log(moneyToFood, moneyToStay, moneyToTravel);
        if (travel === 'option1') {
            fetchBudFlights();
        } else if (travel === 'option2') {
            fetchBudTrains();
        }
        fetchBudHotels();

    };

    if (travel === 'option1') {
        useEffect(() => {
            fetchBudFlights();
        }, [travel]);
    } else if (travel === 'option2') {
        useEffect(() => {
            fetchBudTrains();
        }, [travel]);
    }
    useEffect(() => {
        fetchBudHotels();
    }, []);





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
                const { data, error } = await supabase.from('hotels').select();
                if (error) {
                    throw new Error('Could not fetch hotels');

                }
                setHotels(data || []);
                setFetchError(null);
            } catch (error) {
                console.error(error);
                setFetchError(error.message);
                setHotels([]);
            }
        };

        fetchHotels();
    }, []);

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
                        <div className="styles.holder"><input type="text" placeholder="Where to" onChange={(e) => setWhereto(e.target.value)} /></div>
                        <div className={styles.icon2}>=</div>
                        <div className="styles.holder"><input type="text" placeholder="Where from" onChange={(e) => setWherefrom(e.target.value)} /></div>
                    </div>
                    <div className={styles.date}>
                        <div className={styles.icon3}>ico</div>
                        <div>Date</div>
                        <div><input type="date" placeholder="from" onChange={(e) => setDdmmyyyy(e.target.value)} /></div>
                        <div>-</div>
                        <div><input type="date" name="till" onChange={(e) => setDdmmyyyy2(e.target.value)} /></div>
                    </div>
                    <div className={styles.ppl}>
                        <div className={styles.icon4}>ico</div>
                        <div>No. of travelers</div>
                        <div><input type="number" placeholder="num" onChange={(e) => setNumOfTravelers(e.target.value)} /></div>
                    </div>
                    <div className={styles.money}>
                        <div className={styles.icon5}>ico</div>
                        <div>Budget</div>
                        <div><input type="number" placeholder="num" onChange={(e) => setBudget(e.target.value)} /></div>
                    </div>
                    <div className={styles.travel}>
                        <div className={styles.icon6}>ico</div>
                        <div>Travel</div>
                        <div><input type="radio" name="1" checked={selectedValue === "option1"} onChange={() => setSelectedValue("option1")} />Flight</div>
                        <div><input type="radio" name="2" checked={selectedValue === "option2"} onChange={() => setSelectedValue("option2")} />Train</div>
                    </div>
                    <h1 className={styles.title2}>Preference</h1>
                    <h1 className={styles.preftrav}>Travel:</h1>
                    <div className={styles.menu1}>
                        <select onChange={(e) => setSelectValue(e.target.value)}>
                            <option value="0">luxurious</option>
                            <option value="1">Attractive</option>
                            <option value="2">Economic</option>
                        </select>
                    </div>
                    <h1 className={styles.prefhot}>Hotel:</h1>
                    <div className={styles.menu2}>
                        <select onChange={(e) => setSelectValue1(e.target.value)}>
                            <option value="0">luxurious</option>
                            <option value="1">Attractive</option>
                            <option value="2">Economic</option>
                        </select>
                    </div>
                    <button className={styles.submit} onClick={handleFormSubmit}>Submit</button>
                    <button className={styles.show} onClick={handleShowSubmit}>Show</button>
                    <h1 className={styles.recc}>Recommendation</h1>
                    {/* <div className={styles.card1}></div> */}
                </section>
                <h1 className={styles.headingFli}>Flights</h1>
                <section className={styles.wrapper}>
                    <div className={styles.container}>
                        {fetchError && <p>{fetchError}</p>}
                        <div className={styles.flight_list}>
                            {flights1.map(flight1 => (
                                <div key={flight1.fl_id} className={styles.flight_items}>
                                    <div className={styles.flight_pcont}>
                                        <p>Flight No.: {flight1.fl_id}</p>
                                        <p>Time: {flight1.time}</p>
                                        <div className={styles.flex}>
                                            <p className={styles.prize}>Price: {flight1.price}</p>
                                            <button className={styles.btn}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <h1 className={styles.headtr}>Trains</h1>
                <section className={styles.wrapper}>
                    <div className={styles.container}>
                        {fetchError && <p>{fetchError}</p>}
                        <div className={styles.train_list}>
                            {trains1.map(train1 => (
                                <div key={train1.trn_no} className={styles.train_items}>
                                    <div className={styles.train}>
                                        <p>Train No.: {train1.trn_no}</p>
                                        <p>Available Seats: {train1.avl_ss}</p>
                                        <div className={styles.flex}>
                                            <p className={styles.prize}>Price: {train1.price}</p>
                                            <button className={styles.btn}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <h1 className={styles.headhot}>Hotels</h1>
                <section className={styles.free}>
                    <section className={styles.wrapper}>
                        <div className={styles.container}>
                            {fetchError && <p>{fetchError}</p>}
                            <div className={styles.hotel_list}>
                                {hotels1.map(hotel1 => (
                                    <div key={hotel1.hotel_id} className={styles.hotel_items}>
                                        <div className={styles.hotel}>
                                            <p>Hotel No.: {hotel1.hotel_id}</p>
                                            <div className={styles.flex}>
                                                <p className={styles.prize}>Price: {hotel1.price}</p>
                                                <button className={styles.btn}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </section>

                <h1 className={styles.headingFli}>Flights</h1>
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
                <h1 className={styles.headtr}>Trains</h1>
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
                <h1 className={styles.headhot}>Hotels</h1>
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
