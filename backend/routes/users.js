import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/user.js'
import { authenticateToken } from "../utils/middleware.js"

const router = express.Router()

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  const { username, name, password } = req.body

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// POST /api/users/save/:recipeId
router.post('/save/:recipeId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const recipeId = req.params.recipeId

    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ error: 'Recipe already saved' })
    }

    user.savedRecipes.push(recipeId)
    await user.save()

    res.status(200).json({ message: 'Recipe saved', savedRecipes: user.savedRecipes })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET all saved recipes for the user
router.get('/saved', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedRecipes')
    res.json(user.savedRecipes)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
