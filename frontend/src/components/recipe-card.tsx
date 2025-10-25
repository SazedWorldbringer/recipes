import { useMemo, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card.tsx"
import { Button } from "./ui/button"
import { Heart, Bookmark } from "lucide-react"
import { cn } from "../lib/utils"
import { api } from "../api"
import { useUser } from "../context/UserContext"

export interface RecipeCardProps {
  id: string
  title: string
  author: string
  description: string
  imageUrl?: string
  initialLikes?: number
  initiallySaved?: boolean
}

export function RecipeCard({
  id,
  title,
  author,
  description,
  imageUrl,
  initialLikes = 0,
  initiallySaved = false,
}: RecipeCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(initiallySaved)
  const [likes, setLikes] = useState(initialLikes)
  const { user } = useUser()

  const imgSrc = useMemo(() => imageUrl || "/plated-home-cooked-meal.jpg", [imageUrl])

  const toggleLike = async () => {
    if (!user) return
    try {
      await api.put(`/recipes/${id}/like`)
      setLiked(prev => !prev)
      setLikes(prev => (liked ? prev - 1 : prev + 1))
    } catch (err) {
      console.error(err)
    }
  }

  const toggleSave = async () => {
    if (!user) return
    try {
      await api.post(`/users/save/${id}`)
      setSaved(prev => !prev)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-muted">
          <img
            src={imgSrc}
            alt={`Photo of ${title}`}
            className="object-cover w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <p className="mt-1 text-sm text-gray-500">by {author}</p>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className={cn("gap-2", liked ? "text-primary" : "text-gray-400")}
          >
            <Heart className={cn("h-4 w-4", liked ? "fill-primary" : "fill-transparent")} />
            <span className="text-sm">{likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSave}
            className={cn("gap-2", saved ? "text-primary" : "text-gray-400")}
          >
            <Bookmark className={cn("h-4 w-4", saved ? "fill-primary" : "fill-transparent")} />
            <span className="text-sm">{saved ? "Saved" : "Save"}</span>
          </Button>
        </div>
        <span className="text-xs text-gray-400">ID: {id}</span>
      </CardFooter>
    </Card>
  )
}
