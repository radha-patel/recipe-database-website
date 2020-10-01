import Head from 'next/head';
import styles from '../styles/Home.module.css';
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from 'react';
import Link from 'next/link'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MediaCard from '../components/MediaCard';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const defaultEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
const value = "";

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
  const [ checked1, setChecked1] = useState(true);
  const [ checked2, setChecked2] = useState(true);

  async function handleOnSubmitSearch(e) {
    e.preventDefault();
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    setMeals(data.meals);
  }

  function handleOnSearchChange(e) {
    setSearchValue(e.target.value);
  }

  async function handleChange1(event) {
    event.preventDefault();
    setChecked1(event.target.checked);
    if (!checked1) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setMeals(data.meals)
    } else {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setMeals(data.meals)
    }
  };

  async function handleChange2(event) {
    event.preventDefault();
    setChecked2(event.target.checked);
    if (!checked2) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=American`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setMeals(data.meals)
    } else {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setMeals(data.meals)
    }
  };

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
          <Button type="submit">Search</Button>
        </form>

        <div className={styles.checkbox}>
        <FormControlLabel
          control={
            <Checkbox
              checked1={checked1}
              onChange={handleChange1}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Indian"/>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked2}
                onChange={handleChange2}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
          label="American"/>
        </div>
        
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
