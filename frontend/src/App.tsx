import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateRecipe from './pages/create-recipe'
import RecipePage from './pages/recipe-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<CreateRecipe />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
    </Routes>
  )
}

export default App
