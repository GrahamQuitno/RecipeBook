import "server-only";
import { createSupabaseServerClient } from "../../utils/supabase/server.ts";
import type { RecipeEntry } from "./recipes.ts";

export async function getRecipesFromSupabase() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("recipes")
    .select(`
      slug,
      title,
      ingredients (
        sort_order,
        amount,
        unit,
        name,
        preparation
      ),
      instructions (
        sort_order,
        instruction
      ),
      recipe_tags (
        tags (
          name
        )
      )
    `)
    .order("slug")
    .order("sort_order", { referencedTable: "ingredients", ascending: true })
    .order("sort_order", { referencedTable: "instructions", ascending: true });

  if (error) {
    throw new Error(`Could not load recipes: ${error.message}`);
  }

  if (data === null || data === undefined) {
    return [];
  }

  return data.map((row): RecipeEntry => [
    row.slug,
    {
      title: row.title,
      tags: row.recipe_tags.flatMap((link) =>
        link.tags ? [link.tags.name] : []
      ),
      ingredients: row.ingredients.map((ingredient) => ({
        amount: ingredient.amount,
        ...(ingredient.unit === null ? {} : { unit: ingredient.unit }),
        name: ingredient.name,
        ...(ingredient.preparation === null
          ? {}
          : { preparation: ingredient.preparation }),
      })),
      instructions: row.instructions.map((step) => step.instruction),
    },
  ]);
}
