import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/components/homepage/Home.module.scss";
import "../_app";
function HomePage() {
  const backToTopRef = useRef(null);
  return (
    <>
      <Head>
        <title>Itenary.iq </title>
        <meta name="description" content="Conference on Linear Algebra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section data-scroll-section className={styles.home}>
        <div className={styles.sectionWrapper}>


          <div className={styles.title}>
            <h1>Itenary.iq</h1>
            <p>You travel, We care!</p>
          </div>

          {/* <div className={styles.homeImage}>
            <Image src={logo} alt="logo" layout="responsive" />
          </div> */}

          <div className={styles.btnContainer}>
            <button
              className={styles.btn}
              onClick={() =>
                document.getElementById("about").scrollIntoView()
              }
            >
              <span className={styles.span_arrow}>&gt;</span>
            </button>

          </div>
        </div>
      </section >
    </>
  );
}

export default HomePage;
