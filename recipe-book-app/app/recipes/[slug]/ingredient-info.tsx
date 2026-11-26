"use client";
import { useState } from "react";
import { ingredientToString } from "../../data/recipes.ts";
import { type Recipe } from "../../data/recipes.ts";
import styles from "./ingredient-info.module.css";

type ChildProps = {
  currentRecipe: Recipe;
};

export default function IngredientInfo({ currentRecipe }: ChildProps) {
  const [scale, setScale] = useState(1);

  return (
    <>
      <div className={styles.scalerBox}>
        <label htmlFor="scaler">Scale Ingredients:</label>
        <input
          className={styles.scalerInput}
          id="scaler"
          type="number"
          value={scale}
          onChange={(event) => setScale(Number(event.target.value))}
        />
        <span className={styles.multiplier}>×</span>
      </div>

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
