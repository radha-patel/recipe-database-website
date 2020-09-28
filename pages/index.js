import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from "isomorphic-unfetch"
import { useState, useEffect } from 'react';
import Link from 'next/link'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MediaCard from '../components/MediaCard'

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
  // console.log('data', data);
  const initialMeals = data.meals;
  const [ searchValue, setSearchValue ] = useState(''); 
  const [ meals, setMeals ] = useState(initialMeals);

  // useEffect(() => {

  // }, [meals])

  async function handleOnSubmitSearch(e) {
    e.preventDefault();
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    setMeals(data.meals);

    // setMeals(data);
    /*const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');
    const value = fieldQuery.value || '';
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    
    /*getServerSideProps()*/
    /*getServerSideProps( value );

    return(<h1>Testing</h1>)*/
  }

  function handleOnSearchChange(e) {
    setSearchValue(e.target.value);
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

        <form className={styles.search} onChange={handleOnSearchChange} onSubmit={handleOnSubmitSearch}>
          <TextField id="standard-basic" label="Standard" />
          <Button>Search</Button>
        </form>

        <ul className={styles.grid}>
          {meals.map(result => {
            const { idMeal, strMeal, strMealThumb } = result;
            return (
              <li key={idMeal} className={styles.card}>
                <MediaCard thumbnail={strMealThumb} label={strMeal}/>
              </li>
            )
          })}
        </ul>
      </main>
    </div> 
  )
}
