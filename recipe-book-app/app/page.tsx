import styles from "./page.module.css";
import Link from "next/link";

/* Some hard coded recipes as a placeholder for now */
const recipes = [
  {
    id: "lemon-pasta",
    title: "Lemon Herb Pasta",
    tags: ["Pasta", "Vegetarian"],
  },
  {
    id: "tomato-soup",
    title: "Roasted Tomato Soup",
    tags: ["Soup", "Vegetarian"],
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>The Recipe Book</p>
          <h1 className={styles.heading}>Recipes</h1>
        </header>

        <ul className={styles.recipeList}>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link className={styles.recipeLink} href={"recipes/"+recipe.id}>
                <article className={styles.recipeCard}>
                  <div className={styles.photoPlaceholder}>
                    Photo coming soon
                  </div>

                  <div className={styles.recipeInfo}>
                    <h2 className={styles.recipeTitle}>{recipe.title}</h2>

                    <ul
                      className={styles.tags}
                    >
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
