import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Header from '../components/Header';
import Meal from '../components/Meal';
import './HomePage.css';

// import type { MealInfo } from '../types/MealInfo';
import type { MealRequest } from '../types/MealRequest';

import dayjs from 'dayjs';
import { md5 } from 'js-md5';

function HomePage() {
  const [requestedMeals, setRequestedMeals] = useState<MealRequest[] | null>(null);

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
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areas[areaIndex + offset].strArea}`);
        const data = await response.json();
        areaStats = data.meals;
        offset++;
      }

      console.log(areaStats);
      setRequestedMeals(areaStats);
    }

    testFunc();
  }, []);

  return (
    <>
      <title>Recipe Finder</title>

      <Header />

      <div className="home-page" >
        <div className="search-container">
          <input className="search-input" placeholder="Search for your next meal" />
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