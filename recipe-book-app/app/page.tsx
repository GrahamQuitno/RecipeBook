import styles from "./page.module.css";
import Link from "next/link";
import { recipes } from "/app/data/recipes.ts"
import RecipeList from "/app/recipe-list.tsx"

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>The Recipe Book</p>
          <h1 className={styles.heading}>Recipes</h1>
        </header>

        <RecipeList />
      </div>
    </main>
  );
}
