import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const router = express.Router()

// POST /api/login
router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const userFortoken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userFortoken, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })

  res.status(200).send({ token, username: user.username, name: user.name })
})

export default router
