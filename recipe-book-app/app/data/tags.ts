import { recipes } from "./recipes.ts";

const tagSet: Set<string> = new Set<string>();

// Create a set of al the tags in all the recipes
Object.values(recipes).forEach(recipe => {
  recipe.tags.forEach(tag => {
    tagSet.add(tag);
  });
});

// Turn the set into an array
export const allTags = [...tagSet].sort();