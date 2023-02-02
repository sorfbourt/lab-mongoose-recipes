const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const recipe = {
                    title: "Green Chicken Curry",
                    level: "Easy Peasy",
                    ingredients: ["Chicken", "Curry", "Coconut Milk", "Chili"],
                    cuisine: "Thai",
                    dishType: "main_course",
                    image:
                      "https://images.immediate.co.uk/production/volatile/sites/30/2010/09/Thai-green-curry-bb9f6ae.jpg?quality=90&webp=true&resize=300,272",
                    duration: 60,
                    creator: "Krystina",
                  }
const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
 

    const createRecipe = async () => {
      try{
          const createRecipe = await Recipe.create(recipe);
          console.log("added a recipe to the database", recipe.title);
          return createRecipe
      }
      catch (err){
        console.log("Error for createRecipe: ", err);
      }  
    }

    createRecipe()

    const createRecipeArray = async () => {
      try{
          const createRecipeArr = await Recipe.insertMany(data);
          data.forEach((rec) => {
                console.log(rec.title);
                return createRecipeArr
              });
      }
      catch (err){
        console.log("Error for createRecipeArray: ", err);
      }  
    }

    createRecipeArray()


    const updateRecipe = async () => {
      try{
          const editedRecipe = await Recipe.findOneAndUpdate(
                { title: "Rigatoni alla Genovese" },
                { duration: 100 },
                { new: true }
              )
          console.log("The recipe was updated: ", editedRecipe);
          return editedRecipe
      }
      catch (err){
        console.log("Error for updateRecipe: ", err);
      }  
    }

    updateRecipe()


  })





  // .then((recipeDB) => {
  //   console.log("It worked", recipeDB);
  //   return Recipe.deleteOne({ title: "Carrot Cake" })
      
  // }).then((toDelete) => {
  //   console.log("carrot cake was delete", toDelete);
  // })
  // .finally(()=>{
  //   mongoose.connection.close(()=>{
  //     console.log("closing the connection")
  //   })
  // })


  // })


  .catch((error) => {
    console.error("Error connecting to the database", error);
  });