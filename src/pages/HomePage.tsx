import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router";
import Grid from '@mui/material/Grid';
import Header from '../components/Header';
import Meal from '../components/Meal';
import SearchIcon from '@mui/icons-material/Search';
import './HomePage.css';

import type { MealInfo } from '../types/MealInfo';
import type { MealRequest } from '../types/MealRequest';

import dayjs from 'dayjs';
import { md5 } from 'js-md5';

function HomePage() {
  const [requestedMeals, setRequestedMeals] = useState<MealRequest[] | null>(null);
  const [searchParams,] = useSearchParams();

  const searchKey = searchParams.get('key') ?? '';

  useEffect(() => {
    async function testFunc() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      const areas = data.meals;

      const areaIndex = md5.array(dayjs().format('YYMMDD'))[0] % areas.length;

      console.log(areas);

      let areaStats = null;
      let offset = 0;
      while (areaStats == null || areaStats.length < 6) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areas[areaIndex + offset].strCountry}`);
        const data = await response.json();
        areaStats = data.meals;
        offset++;
      }

      console.log(areaStats);
      setRequestedMeals(areaStats);
    }

    async function findMeals() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchKey[0]}`);
      const data = await response.json();
      const mealInfo: MealInfo[] = data.meals;

      const mealRequests: MealRequest[] = mealInfo.map((meal) => {
        const newMeal: MealRequest = {
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          idMeal: meal.idMeal,
          strArea: meal.strArea,
          strCountry: meal.strCountry
        };
        return newMeal;
      })

      console.log(data);
      console.log(mealRequests);

      setRequestedMeals(mealRequests);
    }

    if (searchKey == '') {
      testFunc();
    } else {
      findMeals();
    }
  }, [searchKey]);

  const [inputText, setInputText] = useState('');

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  const navigate = useNavigate();
  function startSearch() {
    if (inputText === '') {
      navigate({
        pathname: '/'
      });
    } else {
      navigate({
        pathname: '/',
        search: `?key=${inputText}&filter=beef`
      })
    }
  }

  function keyPressed(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      startSearch();
    }
  }

  return (
    <>
      <title>Recipe Finder</title>

      <Header />

      <div className="home-page">
        <div className="search-container">
          <div className="search-bar">
            <input
              className="search-input"
              onChange={saveInputText}
              value={inputText}
              onKeyDown={keyPressed}
              placeholder="Search for your next meal"
            />
            <button
              className="search-button"
              onClick={startSearch}
            >
              <SearchIcon className="search-icon" />
            </button>
          </div>

        </div>
        <div className="meal-grid">
          <Grid
            sx={{
              justifyContent: "center",
              alignItems: "center"
            }}
            container
            spacing={3}
          >
            {requestedMeals && requestedMeals.map((meal) => {
              return (
                <Grid key={meal.idMeal}>
                  <Meal MealRequest={meal} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default HomePage;