import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Header from "../components/Header";
import './MealPage.css';

import type { MealInfo } from "../types/MealInfo";

function MealPage() {
  const { idMeal } = useParams();
  const [mealPageInfo, setMealPageInfo] = useState<MealInfo | null>(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((response) => response.json())
      .then((json) => setMealPageInfo(json.meals[0]));
  }, [idMeal]);

  console.log(mealPageInfo);

  return (
    <>
      <title>{mealPageInfo?.strMeal}</title>

      <Header />

      <div className="meal-page">
        <div className="meal-display">
          <img className="meal-image" src={mealPageInfo?.strMealThumb} />
        </div>
      </div>
    </>
  );
}

export default MealPage;