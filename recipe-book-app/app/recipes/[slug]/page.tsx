import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { recipes } from "/app/data/recipes.ts"

export const instant = false;

export function generateStaticParams() {
  return [
    { slug: "blueberry-muffins" },
    { slug: "lemon-pasta" },
    { slug: "tomato-soup" },
  ];
}

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const currentRecipe = recipes[slug];

  if (!currentRecipe) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/">← All recipes</Link>
          <p className={styles.eyebrow}>The Recipe Book</p>
          <h1 className={styles.title}>{currentRecipe.title}</h1>
          <ul className={styles.tags}>
            {currentRecipe.tags.map(tag => (
              <li className={styles.tag} key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Ingredients
          </h2>
          <ul className={styles.ingredientList}>
            {currentRecipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Instructions
          </h2>
          <ol className={styles.instructionList}>
            {currentRecipe.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </section>

        <div className={styles.photoPlaceholder}>
          Photo coming soon
        </div>
      </article>
    </main>
  );
}
