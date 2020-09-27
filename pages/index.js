import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from "isomorphic-unfetch"

const defaultEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s`

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
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
        <ul className={styles.grid}>
          {meals.map(result => {
            const { idMeal, strMeal } = result;
            return (
              <li key={idMeal} className={styles.card}>
                <a href="#">

                  <h3>{ strMeal }</h3>
                </a>
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
