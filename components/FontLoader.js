import * as Font from "expo-font";

// Define the fonts you want to load
const fonts = {
  "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  // Add other fonts if needed
};

// Function to load the fonts
export async function loadFonts() {
  await Font.loadAsync(fonts);
}

// Export the loaded fonts
export const loadedFonts = fonts;
