import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import MealPage from './pages/MealPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/:idMeal" element={<MealPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;