import "server-only";
import { createSupabaseServerClient } from "../../utils/supabase/server.ts";
import { type Recipe, type RecipeEntry } from "./recipes.ts";

function getTagNames(relation: unknown): string[] {
  const rows: unknown[] = Array.isArray(relation)
    ? relation
    : relation == null
      ? []
      : [relation];

  return rows.flatMap((row) => {
    if (typeof row !== "object" || row === null || !("name" in row)) {
      return [];
    }

    return typeof row.name === "string" ? [row.name] : [];
  });
}

export async function getAllRecipesFromSupabase(): Promise<RecipeEntry[]> {
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
      tags: row.recipe_tags.flatMap((link) => getTagNames(link.tags)),
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

export async function getRecipeFromSupabase(slug: string): Promise<Recipe |  null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("recipes")
    .select(`
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
    .eq("slug", slug)
    .order("sort_order", { referencedTable: "ingredients", ascending: true })
    .order("sort_order", { referencedTable: "instructions", ascending: true })
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load recipe: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return {
    title: data.title,
    tags: data.recipe_tags.flatMap((link) => getTagNames(link.tags)),
    ingredients: data.ingredients.map((ingredient) => ({
      amount: ingredient.amount,
      ...(ingredient.unit === null ? {} : { unit: ingredient.unit }),
      name: ingredient.name,
      ...(ingredient.preparation === null
        ? {}
        : { preparation: ingredient.preparation }),
    })),
    instructions: data.instructions.map((step) => step.instruction),
  };
}
