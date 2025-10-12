# RECIPES!

### test api

GET /

returns - `"{ message: 'Recipe API is running!' }"`

### test get recipes

GET /api/recipes

returns all recipes in db
eg -

```sh
[{
  "_id":"68eb97c9201f13a081af6d58",
  "title":"Pasta Aglio e Olio",
  "description":"Classic Italian pasta with garlic and olive oil",
  "ingredients":[
    "Spaghetti",
    "Garlic",
    "Olive Oil", 
    "Chili Flakes"
  ],
  "steps":[
    "Boil pasta",
    "Fry garlic in oil",
    "Mix everything"
  ],
  "likes":0,
  "createdAt":"2025-10-12T11:58:01.980Z",
  "__v":0
}]
```

### test post recipe

POST /api/recipes

```sh
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Pasta Aglio e Olio",
    "description": "Classic Italian pasta with garlic and olive oil",
    "ingredients": ["Spaghetti", "Garlic", "Olive Oil", "Chili Flakes"],
    "steps": ["Boil pasta", "Fry garlic in oil", "Mix everything"]
  }'
```
