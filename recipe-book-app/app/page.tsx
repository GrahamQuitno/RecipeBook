import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { recipes, type RecipeEntry } from "./data/recipes";
import RecipeBrowser from "/app/recipe-browser.tsx";

export default function Home() {

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>The Recipe Book</p>
        <h1 className={styles.heading}>Recipes</h1>
      </header>

      <RecipeBrowser/>
    </main>
  );
}
