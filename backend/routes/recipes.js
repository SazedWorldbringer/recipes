import express from 'express'

import Recipe from '../models/recipe.js'
import User from '../models/user.js'
import { authenticateToken } from '../utils/middleware.js'

const router = express.Router()

// GET all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 })
  res.json(recipes)
})

// POST create new recipe
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, ingredients, steps } = req.body

  try {
    const recipe = new Recipe({ title, description, ingredients, steps, user: req.user.id })
    const savedRecipe = await recipe.save()

    const user = await User.findById(req.user.id)
    user.postedRecipes.push(savedRecipe._id)
    await user.save()

    res.status(201).json(savedRecipe)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update recipe (like, edit, etc.)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) return res.status(404).json({ error: "Recipe not found" })

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: You do not own this recipe' })
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE remove recipe
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) return res.status(404).json({ error: "Recipe not found" })

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: You do not own this recipe' })
    }

    await Recipe.findByIdAndDelete(req.params.id)

    const user = await User.findById(req.user.id)
    user.postedRecipes = user.postedRecipes.filter(id => id.toString() !== req.params.id)
    await user.save()

    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
