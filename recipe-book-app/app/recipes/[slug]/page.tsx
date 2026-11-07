import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const instant = false

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

const recipe = {
  "blueberry-muffins": {
    title: "Blueberry Muffins",
    tags: ["Breakfast", "Baking"],
    ingredients: [
      "2 cups all-purpose flour",
      "¾ cup sugar",
      "2 teaspoons baking powder",
      "½ teaspoon salt",
      "½ cup butter, melted",
      "2 eggs",
      "½ cup milk",
      "1 cup blueberries",
    ],
    instructions: [
      "Heat the oven to 375°F (190°C). Line a muffin tin with paper liners.",
      "In a large bowl, whisk together the flour, sugar, baking powder, and salt.",
      "In another bowl, mix the melted butter, eggs, and milk. Add the wet ingredients to the dry ingredients and stir until just combined.",
      "Gently fold in the blueberries. Divide the batter among the muffin cups.",
      "Bake for 20–25 minutes, until the tops are golden and a toothpick comes out clean.",
    ],
  },
  "lemon-pasta": {
    title: "Lemon Herb Pasta",
    tags: ["Pasta", "Vegetarian"],
    ingredients: [
      "12 ounces pasta",
      "2 tablespoons olive oil",
      "2 cloves garlic, minced",
      "1 lemon, zested and juiced",
      "¼ cup chopped fresh parsley",
      "½ teaspoon salt",
      "¼ teaspoon black pepper",
      "½ cup reserved pasta water",
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Cook the pasta according to the package directions.",
      "While the pasta cooks, warm the olive oil in a large pan over medium heat. Add the garlic and cook for about 30 seconds.",
      "Add the lemon zest, lemon juice, salt, and pepper to the pan.",
      "Add the drained pasta and a splash of reserved pasta water. Toss until the sauce coats the pasta.",
      "Stir in the parsley and serve.",
    ],
  },

  "tomato-soup": {
    title: "Roasted Tomato Soup",
    tags: ["Soup", "Vegetarian"],
    ingredients: [
      "2 pounds ripe tomatoes, halved",
      "1 small yellow onion, roughly chopped",
      "4 cloves garlic, peeled",
      "2 tablespoons olive oil",
      "2 cups vegetable broth",
      "½ teaspoon salt",
      "¼ teaspoon black pepper",
      "¼ cup heavy cream (optional)",
      "2 tablespoons chopped fresh basil",
    ],
    instructions: [
      "Heat the oven to 425°F (220°C). Arrange the tomatoes, onion, and garlic on a baking sheet.",
      "Drizzle the vegetables with olive oil and season with salt and pepper.",
      "Roast for 30–35 minutes, until the tomatoes are soft and lightly browned.",
      "Transfer the roasted vegetables and their juices to a pot. Add the vegetable broth and simmer for 10 minutes.",
      "Blend until smooth. Stir in the cream, if using, and garnish with basil.",
    ],
  }
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const currentRecipe = recipe[slug];

  if (!currentRecipe) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <header className={styles.header}>
          <a className={styles.backLink} href="/">
            ← All recipes
          </a>
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
