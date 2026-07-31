import './Meal.css';

import type { MealRequest } from '../types/MealRequest';

function Meal({ MealRequest }: { MealRequest: MealRequest }) {
  return (
    <div className="meal-block">
      <img className="meal-image" src={MealRequest.strMealThumb}/>
    </div>
  );
}

export default Meal;