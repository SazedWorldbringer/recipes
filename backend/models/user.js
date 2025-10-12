import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true },
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
})

const User = mongoose.model('User', userSchema)
export default User
