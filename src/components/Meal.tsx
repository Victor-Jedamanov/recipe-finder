import { NavLink } from 'react-router';
import './Meal.css';

import type { MealRequest } from '../types/MealRequest';

function Meal({ MealRequest }: { MealRequest: MealRequest }) {
  return (
    <div className="meal-block">
      <NavLink className="meal-image-container" to={MealRequest.idMeal}>
        <img className="meal-image" src={MealRequest.strMealThumb} />
      </NavLink>

      <div className="meal-text-container">
        <div className="meal-name">
          {MealRequest.strMeal}
        </div>
        <div className="meal-country">
          {MealRequest.strCountry}
        </div>
      </div>
    </div>
  );
}

export default Meal;