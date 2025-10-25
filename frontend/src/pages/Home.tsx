import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { RecipeCard } from "@/components/recipe-card"
import { api } from "@/api"

interface Recipe {
  _id: string
  title: string
  description: string
  imageUrl?: string
  likes: number
  user: {
    username: string
    name?: string
  }
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get("/recipes")
        setRecipes(res.data)
      } catch (err) {
        console.error("Failed to fetch recipes", err)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-card">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-semibold text-balance">
                Share and discover delicious homemade recipes
              </h1>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Post your favorite dishes, explore what others are cooking, and keep a collection of recipes you love.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
            <h2 className="sr-only">Latest recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((r) => (
                <RecipeCard
                  key={r._id}
                  id={r._id}
                  title={r.title}
                  description={r.description}
                  author={r.user.name || r.user.username}
                  imageUrl={r.imageUrl}
                  initialLikes={r.likes}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
