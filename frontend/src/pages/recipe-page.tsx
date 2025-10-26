import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api, setToken } from "@/api"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Layout } from "@/components/layout"

interface Recipe {
  _id: string
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  imageUrl?: string
  likes: number
  likedBy: string[]
  user: {
    username: string
    name?: string
  }
}

export default function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useUser()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`)
        setRecipe(res.data)
        setLikes(res.data.likes)
        if (user) setLiked(res.data.likedBy.includes(user.username))
      } catch (err) {
        console.error("Failed to fetch recipe", err)
      }
    }

    fetchRecipe()
  }, [id, user])

  const handleLike = async () => {
    if (!user) return
    try {
      setToken(user.token)
      await api.put(`/recipes/${id}/like`)
      setLiked(true)
      setLikes((l) => l + 1)
    } catch (err) {
      console.error("Failed to like recipe", err)
    }
  }

  if (!recipe) return <p className="p-6 text-center">Loading recipe...</p>

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6">
          <img
            src={recipe.imageUrl || "/placeholder.svg"}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        <p className="text-muted-foreground mb-4">
          by {recipe.user.name || recipe.user.username}
        </p>
        <p className="mb-4">{recipe.description}</p>

        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Steps</h2>
        <ol className="list-decimal list-inside mb-4">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>

        <div className="flex items-center gap-4">
          <Button onClick={handleLike} variant="outline">
            <Heart className="mr-2 h-4 w-4" fill={liked ? "red" : "none"} />
            {liked ? "Liked" : "Like"} ({likes})
          </Button>
        </div>
      </div>
    </Layout>
  )
}
