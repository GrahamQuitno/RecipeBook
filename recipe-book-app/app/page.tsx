import styles from "./page.module.css";
import Link from "next/link";
import { type RecipeEntry } from "./data/recipes";
import RecipeBrowser from "./recipe-browser.tsx";
import { getAllRecipesFromSupabase } from "./data/supabase-recipes";
import { auth0 } from "../utils/auth0/server";

export const instant = false;

export default async function Home() {
  const recipeEntries: RecipeEntry[] = await getAllRecipesFromSupabase();
  
  const session = await auth0.getSession();
  const isSignedIn = Boolean(session?.user);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>The Recipe Book</p>
        <h1 className={styles.heading}>Recipes</h1>
      </header>

      <RecipeBrowser recipeEntries={recipeEntries}/>

      <footer>
        {
          isSignedIn ? <a href="/auth/logout">Sign Out</a>
          : <a href="/auth/login">Owner Sign In</a>
        }
      </footer>
    </main>
  );
}
