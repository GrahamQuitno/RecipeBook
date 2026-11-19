import { recipes } from "./recipes";

export const allIngredients = Array.from(
  new Set(
    Object.values(recipes).flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.name)
    )
  )
).sort((a, b) => a.localeCompare(b));