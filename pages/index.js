import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from "isomorphic-unfetch"
import { useState, useEffect } from 'react';
import Link from 'next/link'

const defaultEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
const value = "";

/*
export async function getServerSideProps({ value = ""}) {
  const res
  if (value) {
    res = await fetch(defaultEndpoint)
  } else {
    res = await fetch(`${defaultEndpoint}=${value}`)
  }
  const data = await res.json();
  return {
    props: {
      data
    }
  }
} */

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  console.log('data', data);
  const { meals = [] } = data;

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');
    const value = fieldQuery.value || '';
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    
    /*getServerSideProps()*/
    /*getServerSideProps( value );*/
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Recipies Galore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Recipies Galore
        </h1>
        <p className={styles.description}>
          Need ideas? Well look no further.
        </p>

        <form className={styles.search} onSubmit={handleOnSubmitSearch}>
          <input name="query" type="search"/>
          <button>Search</button>
        </form>

        <ul className={styles.grid}>
          {meals.map(result => {
            const { idMeal, strMeal, strMealThumb } = result;
            return (
              <li key={idMeal} className={styles.card}>
                <Link href="/food/[strMeal]" as={`/food/${strMeal}`}>
                  <a href="#">
                    <img className={styles.food_picture} src={strMealThumb} alt={`${strMeal} Thumbnail`}/>
                    <h3 className={styles.food_label}>{ strMeal }</h3>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
