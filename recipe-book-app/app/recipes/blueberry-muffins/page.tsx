// app/recipes/blueberry-muffins/page.tsx
import styles from "./page.module.css";

const tags = [
  "Breakfast",
  "Baking"
];

const ingredients = [
  "2 cups all-purpose flour",
  "¾ cup sugar",
  "2 teaspoons baking powder",
  "½ teaspoon salt",
  "½ cup butter, melted",
  "2 eggs",
  "½ cup milk",
  "1 cup blueberries",
];

const instructions = [
  "Heat the oven to 375°F (190°C). Line a muffin tin with paper liners.",
  "In a large bowl, whisk together the flour, sugar, baking powder, and salt.",
  "In another bowl, mix the melted butter, eggs, and milk. Add the wet ingredients to the dry ingredients and stir until just combined.",
  "Gently fold in the blueberries. Divide the batter among the muffin cups.",
  "Bake for 20–25 minutes, until the tops are golden and a toothpick comes out clean.",
];

export default function BlueberryMuffinsPage() {
  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <header className={styles.header}>
          <a className={styles.backLink} href="/">
            ← All recipes
          </a>

          <p className={styles.eyebrow}>The Recipe Book</p>
          <h1 className={styles.title}>Blueberry Muffins</h1>

          <ul className={styles.tags}>
            {tags.map(tag => (
              <li className={styles.tag} key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Ingredients
          </h2>
          <ul className={styles.ingredientList}>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Instructions
          </h2>
          <ol className={styles.instructionList}>
            {instructions.map((instruction) => (
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