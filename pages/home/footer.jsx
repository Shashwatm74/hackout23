import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/components/footer/footer.module.scss";
import "../_app";
import logo from "@/assets/images/logo.png";
function FooterHome() {
    const backToTopRef = useRef(null);
    return (
        <>
            <section className={styles.footer}>
                <div className={styles.name}>
                    <h1>
                        Itenary.iq
                    </h1>
                    <p>
                        You Travel, We Care!
                    </p>
                    <p>
                        Happy Holidays!
                    </p>
                </div>
                <div className={styles.info}>
                </div>
            </section>
        </>
    );
}

export default FooterHome;
