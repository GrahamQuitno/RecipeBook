import styles from "./page.module.css";
import Link from "next/link";
import { recipes } from "/app/data/recipes.ts"

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>The Recipe Book</p>
          <h1 className={styles.heading}>Recipes</h1>
        </header>

        <ul className={styles.recipeList}>
          {Object.entries(recipes).map(([id,recipe]) => (
            <li key={id}>
              <Link className={styles.recipeLink} href={"recipes/"+id}>
                <article className={styles.recipeCard}>
                  <div className={styles.photoPlaceholder}>
                    Photo coming soon
                  </div>

                  <div className={styles.recipeInfo}>
                    <h2 className={styles.recipeTitle}>{recipe.title}</h2>
                    <ul className={styles.tags}>
                      {recipe.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
