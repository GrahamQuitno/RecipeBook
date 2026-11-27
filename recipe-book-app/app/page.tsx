import styles from "./page.module.css";
import Link from "next/link";
import { type RecipeEntry } from "./data/recipes";
import RecipeBrowser from "./recipe-browser.tsx";
import { getAllRecipesFromSupabase } from "./data/supabase-recipes";

export const instant = false;

export default async function Home() {
  const recipeEntries: RecipeEntry[] = await getAllRecipesFromSupabase();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>The Recipe Book</p>
        <h1 className={styles.heading}>Recipes</h1>
      </header>

      <RecipeBrowser recipeEntries={recipeEntries}/>
    </main>
  );
}
