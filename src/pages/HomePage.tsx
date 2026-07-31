import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Header from '../components/Header';
import Meal from '../components/Meal';
import './HomePage.css';

// import type { MealInfo } from '../types/MealInfo';
import type { MealRequest } from '../types/MealRequest';

function HomePage() {
  // const [meals, setMeals] = useState<MealInfo[]>([]);
  const [requestedMeals, setRequestedMeals] = useState<MealRequest[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
      .then((response) => response.json())
      .then((json) => setRequestedMeals(json.meals));

  }, []);

  console.log(requestedMeals[0] && requestedMeals[0].idMeal);

  return (
    <>
      <title>Recipe Finder</title>

      <Header />

      <div className="home-page" >
        This is the HomePage {requestedMeals[0] && requestedMeals[0].idMeal}

        <Grid
          sx={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1rem"
          }}
          container
          spacing={3}
        >
          {requestedMeals.map((meal) => {
            return (
              <Grid key={meal.idMeal}>
                <Meal MealRequest={meal} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default HomePage;