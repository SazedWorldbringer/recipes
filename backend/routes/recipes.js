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
router.put('/:id', async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE remove recipe
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
