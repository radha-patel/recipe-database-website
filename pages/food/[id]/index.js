import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import fetch from "isomorphic-unfetch"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../../../components/Container';

const defaultEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=`

export async function getServerSideProps({ query }) {
    const { id } = query;
    const res = await fetch(`${defaultEndpoint}${id}`);
    const data = await res.json();
    return {
      props: {
        data
      }
    }
  }

export default function Dish({ data }) {
  console.log('data', data);
  const { meals } = data;

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
        <ul>
          {meals.map(result => {
              const { idMeal, strMeal, strInstructions, strMealThumb } = result;
              return (
                <div key={idMeal}>
                  <li key={idMeal} className={styles.profile}>
                    <img className={styles.food_picture} src={strMealThumb} alt={`${strMeal} Thumbnail`}/>
                    <h3 className={styles.food_label}>{ strMeal }</h3>
                  </li>
                  <Container recipe={strInstructions} />
                </div>
              )
            })}
        </ul>
        <p className={styles.back}>
          <Link href="/">
            <a>
              Back to All Dishes.
            </a>
          </Link>
        </p>
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
