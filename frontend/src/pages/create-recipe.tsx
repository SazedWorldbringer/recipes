import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/api"
import { Layout } from "@/components/layout"

export default function CreateRecipe() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [steps, setSteps] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/recipes", {
        title,
        description,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        steps: steps.split("\n"),
        imageUrl,
      })
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create recipe")
    }
  }

  return (
    <Layout>
      <main className="flex justify-center px-4 py-10">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ingredients (comma-separated)</label>
                <Textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Steps (one per line)</label>
                <Textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full">
                Post Recipe
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </Layout>
  )
}
