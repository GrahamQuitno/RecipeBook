import { useState } from "react";
import { allTags } from "./data/tags";
import { allIngredients } from "./data/ingredients";
import styles from "./search.module.css";
import { recipes, type RecipeEntry } from "./data/recipes";

function filterByTitleKeywords(recipeEntries: RecipeEntry[], query: string): RecipeEntry[] {
  const keywords = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (keywords.length === 0) {
    return recipeEntries;
  }

  return recipeEntries.filter(([, recipe]) =>
    keywords.every((keyword) =>
      recipe.title.toLowerCase().includes(keyword)
    )
  );
}

function filterByTags(recipeEntries: RecipeEntry[], selectedTags: string[]): RecipeEntry[] {
  if (selectedTags.length === 0) {
    return recipeEntries;
  }
  return recipeEntries.filter(([, recipe]) =>
    selectedTags.every((tag) => recipe.tags.includes(tag))
  );
}

function filterByIncludeIngredients(recipeEntries: RecipeEntry[], includedIngredients: string[]): RecipeEntry[] {
  if (includedIngredients.length === 0) {
    return recipeEntries;
  }
  return recipeEntries.filter(([, recipe]) =>
    includedIngredients.every((ingredient) => recipe.ingredients.some(recipeIngredient => recipeIngredient.name === ingredient))
  );
}

function filterByExcludeIngredients(recipeEntries: RecipeEntry[], excludedIngredients: string[]): RecipeEntry[] {
  if (excludedIngredients.length === 0) {
    return recipeEntries;
  }
  return recipeEntries.filter(([, recipe]) =>
    excludedIngredients.every((ingredient) => recipe.ingredients.every(recipeIngredient => recipeIngredient.name !== ingredient))
  );
}

type ChildProps = {
  filterRecipes: (newRecipes: RecipeEntry[]) => void;
};

export default function Search({ filterRecipes }: ChildProps) {
  const [query, setQuery] = useState("");

  const [tagQuery, setTagQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [includeQuery, setIncludeQuery] = useState("");
  const [excludeQuery, setExcludeQuery] = useState("");
  const [includedIngredients, setIncludedIngredients] = useState<string[]>([]);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);

  const visibleTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(tagQuery.trim().toLowerCase())
  );

  const visibleIncludeIngredients = allIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(includeQuery.trim().toLowerCase())
  );

  const visibleExcludeIngredients = allIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(excludeQuery.trim().toLowerCase())
  );

  const allRecipeEntries: RecipeEntry[] = Object.entries(recipes);
  const matchingByTitle = filterByTitleKeywords(allRecipeEntries, query);
  const matchingByTag = filterByTags(matchingByTitle, selectedTags);
  const matchingByIncludeIngredients = filterByIncludeIngredients(matchingByTag, includedIngredients);
  const matchingByExcludeIngredients = filterByExcludeIngredients(matchingByIncludeIngredients, excludedIngredients);
  const matchingRecipes = matchingByExcludeIngredients;

  return (
    <>
      <form className={styles.searchForm}
        onSubmit={(event) => {
          event.preventDefault();
          filterRecipes(matchingRecipes);
      }}>
        <h2>Search Filters</h2>
        <details>
          <summary>Title Keywords</summary>

          <label htmlFor="recipe-search">Words to find in the recipe title</label>
          <input
            id="recipe-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. blueberry muffins"
          />
        </details>

        <details>
          <summary>Tags</summary>

          <label htmlFor="tag-search">Find tags</label>
          <input
            id="tag-search"
            type="search"
            value={tagQuery}
            onChange={(event) => setTagQuery(event.target.value)}
            placeholder="Search available tags"
          />

          <fieldset>
            <legend>Available tags</legend>
            {visibleTags.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() =>
                    setSelectedTags((currentTags) =>
                      currentTags.includes(tag)
                        ? currentTags.filter((currentTag) => currentTag !== tag)
                        : [...currentTags, tag]
                    )
                  }
                />
                {tag}
              </label>
            ))}
          </fieldset>

          <div>
            <h3>Selected tags</h3>
            {selectedTags.length === 0 ? (
              <p>No tags selected.</p>
            ) : (
              <ul>
                {selectedTags.map((tag) => (
                  <li key={tag}>
                    {tag}{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedTags((currentTags) =>
                          currentTags.filter((currentTag) => currentTag !== tag)
                        )
                      }
                    >
                      <span>×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>

        <details>
          <summary>Ingredients</summary>

          <div>
            <h3>Includes</h3>
            <label htmlFor="include-ingredient-search">Find ingredients to include</label>
            <input
              id="include-ingredient-search"
              type="search"
              value={includeQuery}
              onChange={(event) => setIncludeQuery(event.target.value)}
              placeholder="Search ingredients"
            />

            <fieldset>
              <legend>Select every ingredient the recipe must include</legend>
              {visibleIncludeIngredients.map((ingredient) => (
                <label key={ingredient}>
                  <input
                    type="checkbox"
                    checked={includedIngredients.includes(ingredient)}
                    onChange={() =>
                      setIncludedIngredients((current) =>
                        current.includes(ingredient)
                          ? current.filter((item) => item !== ingredient)
                          : [...current, ingredient]
                      )
                    }
                  />
                  {ingredient}
                </label>
              ))}
              {visibleIncludeIngredients.length === 0 && <p>No matching ingredients.</p>}
            </fieldset>

            <p>
              Selected: {includedIngredients.length > 0
                ? includedIngredients.join(", ")
                : "None"}
            </p>
          </div>

          <div>
            <h3>Excludes</h3>
            <label htmlFor="exclude-ingredient-search">Find ingredients to exclude</label>
            <input
              id="exclude-ingredient-search"
              type="search"
              value={excludeQuery}
              onChange={(event) => setExcludeQuery(event.target.value)}
              placeholder="Search ingredients"
            />

            <fieldset>
              <legend>Exclude a recipe if it contains any selected ingredient</legend>
              {visibleExcludeIngredients.map((ingredient) => (
                <label key={ingredient}>
                  <input
                    type="checkbox"
                    checked={excludedIngredients.includes(ingredient)}
                    onChange={() =>
                      setExcludedIngredients((current) =>
                        current.includes(ingredient)
                          ? current.filter((item) => item !== ingredient)
                          : [...current, ingredient]
                      )
                    }
                  />
                  {ingredient}
                </label>
              ))}
              {visibleExcludeIngredients.length === 0 && <p>No matching ingredients.</p>}
            </fieldset>

            <p>
              Selected: {excludedIngredients.length > 0
                ? excludedIngredients.join(", ")
                : "None"}
            </p>
          </div>
        </details>

        <button type="submit">Search</button>
      </form>
    </>
  );
}