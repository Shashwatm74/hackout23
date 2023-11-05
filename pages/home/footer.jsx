import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/components/footer/footer.module.scss";
import "../_app";
function FooterHome() {
    const backToTopRef = useRef(null);
    return (
        <>
            <section className={styles.footer}>
                <div className={styles.name}>
                    <h1>
                        Title.ai
                    </h1>
                    <p>
                        A one line tag line a bit longer hehe
                    </p>
                    <p>
                        Lorem ipsum dolor sit ame
                    </p>
                </div>
                <div className={styles.midsec}>
                    <div className={styles.home}>
                        <h1>
                            Home
                        </h1>
                        <p>Blog</p>
                        <p>Travel</p>
                        <p>Stay</p>
                        <p>Bookings</p>
                    </div>
                    <div className={styles.policy}>
                        <h1>
                            Our Policies
                        </h1>
                        <p>Privacy Policy</p>
                        <p>Terms and Condition</p>
                        <p>Cancellation Policies</p>
                    </div>
                    <div className={styles.info}>
                        <h1>
                            Information
                        </h1>
                        <p>Office Address</p>
                        <p>Contact</p>
                        <p>Deals</p>
                    </div>
                </div>
                <div className={styles.address}>
                    <div className={styles.teamm}>
                        <h1>Team</h1>
                        <p>Harshit Singh</p>
                        <p>Shashwat Mishra</p>
                        <p>Sinchan Shetty</p>
                        <p>Kunal Mukherjee</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FooterHome;
