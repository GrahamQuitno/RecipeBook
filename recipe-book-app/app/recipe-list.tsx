"use client";

import { useState } from "react";
import Link from "next/link";
import { recipes } from "./data/recipes";
import styles from "./page.module.css";

export default function RecipeList() {
  const [query, setQuery] = useState("");

  // Process the search query, creating a list of the words in it
  const query_words = query.trim().toLowerCase().split(/\s+/).filter((word) => Boolean(word));

  // Only keep the recipes such that every word in the query is contained in the recipe title
  // A problem with this currently is that there's no limit on the number of query words that map to the same title word
  // For example, "muffin muffin muffin" will still bring up the blueberry muffin recipe
  // Need to look into how other search features handle this situation
  const matchingRecipes = Object.entries(recipes).filter(([, recipe]) =>
    query_words.every((word) => recipe.title.toLowerCase().includes(word))
  );

  return (
    <>
      <div className={styles.search}>
        <label className={styles.searchLabel} htmlFor="recipe-search">
          Search by title
        </label>
        <input
          className={styles.searchInput}
          id="recipe-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. blueberry muffins"
        />
      </div>

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
        <p className={styles.emptyMessage}>No recipes match that title.</p>
      )}
    </>
  );
}