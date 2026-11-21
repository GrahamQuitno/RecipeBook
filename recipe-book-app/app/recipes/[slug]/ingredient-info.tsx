"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { ingredientToString } from "/app/data/recipes.ts";
import { type Recipe } from "/app/data/recipes.ts";

type ChildProps = {
  currentRecipe: Recipe;
};

export default function IngredientInfo({ currentRecipe }: ChildProps) {
  const [scale, setScale] = useState(1);

  return (
    <>
      <input 
        type="number"
        value={scale}
        onChange={(event) => setScale(Number(event.target.value))}
      />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Ingredients
        </h2>
        <ul className={styles.ingredientList}>
          {currentRecipe.ingredients.map((ingredient) => (
            <li key={ingredient.name}>{ingredientToString(ingredient, scale)}</li>
          ))}
        </ul>
      </section>
    </>
  );
}