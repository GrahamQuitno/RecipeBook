export type Ingredient = {
  amount: number;
  unit: string;
  name: string;
  preparation?: string;
};

export function ingredientToString(ingredient : Ingredient): string{
  if (ingredient.preparation === undefined) {
    return `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
  }
  return `${ingredient.amount} ${ingredient.unit} ${ingredient.preparation} ${ingredient.name}`;
}

export type Recipe = {
  title: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
};

export type RecipeEntry = [slug: string, recipe: Recipe];

export const recipes: Record<string, Recipe> = {
  "blueberry-muffins": {
    title: "Blueberry Muffins",
    tags: ["Breakfast", "Baking"],
    ingredients: [
      { amount: 2, unit: "cups", name: "all-purpose flour" },
      { amount: 0.75, unit: "cup", name: "sugar" },
      { amount: 2, unit: "teaspoons", name: "baking powder" },
      { amount: 0.5, unit: "teaspoon", name: "salt" },
      { amount: 0.5, unit: "cup", name: "butter", preparation: "melted" },
      { amount: 2, unit: "", name: "eggs" },
      { amount: 0.5, unit: "cup", name: "milk" },
      { amount: 1, unit: "cup", name: "blueberries" },
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
      { amount: 12, unit: "ounces", name: "pasta" },
      { amount: 2, unit: "tablespoons", name: "olive oil" },
      { amount: 2, unit: "cloves", name: "garlic", preparation: "minced" },
      { amount: 1, unit: "", name: "lemon", preparation: "zested and juiced" },
      { amount: 0.25, unit: "cup", name: "fresh parsley", preparation: "chopped" },
      { amount: 0.5, unit: "teaspoon", name: "salt" },
      { amount: 0.25, unit: "teaspoon", name: "black pepper" },
      { amount: 0.5, unit: "cup", name: "pasta water", preparation: "reserved" },
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
      { amount: 2, unit: "pounds", name: "ripe tomatoes", preparation: "halved" },
      { amount: 1, unit: "small", name: "yellow onion", preparation: "roughly chopped" },
      { amount: 4, unit: "cloves", name: "garlic", preparation: "peeled" },
      { amount: 2, unit: "tablespoons", name: "olive oil" },
      { amount: 2, unit: "cups", name: "vegetable broth" },
      { amount: 0.5, unit: "teaspoon", name: "salt" },
      { amount: 0.25, unit: "teaspoon", name: "black pepper" },
      { amount: 0.25, unit: "cup", name: "heavy cream", preparation: "optional" },
      { amount: 2, unit: "tablespoons", name: "fresh basil", preparation: "chopped" },
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
