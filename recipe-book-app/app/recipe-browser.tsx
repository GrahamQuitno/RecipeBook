"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Search from "./search.tsx";
import { useState } from "react";
import { type RecipeEntry } from "./data/recipes";

type RecipeBrowserProps = {
  recipeEntries: RecipeEntry[];
};

function filterRecipes(recipeList: RecipeEntry[]) {
  setMatchingRecipes(recipeList);
}

export default function RecipeBrowser({ recipeEntries }: RecipeBrowserProps) {
  const [matchingRecipes, setMatchingRecipes] = useState<RecipeEntry[]>(
    recipeEntries
  );

  return (
    <>
      <div className={styles.searchAndList}>
        <Search recipeEntries={recipeEntries} filterRecipes={filterRecipes}/>

        {matchingRecipes.length > 0 ? (
          <ul className={styles.recipeList}>
            {matchingRecipes.map(([id, recipe]) => (
              <li key={id}>
                <Link className={styles.recipeLink} href={`/recipes/${id}`}>
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
        ) : (
          <p>No recipes match those filters.</p>
        )}
      </div>
    </>
  );
}
