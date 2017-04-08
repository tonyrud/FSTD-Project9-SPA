class RecipeDetailController {
  constructor (dataService, $location, $routeParams) {
    // inject services and modules
    this.$routeParams = $routeParams
    this.dataService = dataService
    this.$location = $location

    // initialize items
    this.init()
  }

  // initialize controller/view data
  init () {
    this.recipeSave = {
      ingredients: [],
      steps: []
    }
    // set buttons
    this.ingredientBtn = 'an'
    this.stepBtn = 'a'
    // change title if path is add
    this.dataService.setItems().then(response => {
      this.foodItems = response
    })
    this.dataService.setCategories().then(response => {
      this.categories = response
    })
    if (this.$location.url().includes('add')) {
      this.title = 'Add New Recipe'
      return
    }
    const selectedRecipe = this.$routeParams.id
    this.dataService.dataRequests('GET', `recipes/${selectedRecipe}`)
        .then(response => {
          this.title = response.name
          this.recipeSave = response
        })
  }

  // sends post or put method to service, depends on current url path
  createRecipe () {
    let recipeOptions = {
      method: 'POST',
      path: 'recipes'
    }
    // if recipe path is edited, change request method and api endpoint
    if (this.$location.url().includes('/edit')) {
      recipeOptions.method = 'PUT'
      recipeOptions.path = `recipes/${this.$routeParams.id}`
    }
    this.dataService.dataRequests(recipeOptions.method, recipeOptions.path, this.recipeSave)
        .then(this.$location.path('/'))
  }

  // clicks to change ingredient
  changeIngredient (index) {
    this.ingredientBtn = 'another'
    // if index passed, delete recipe
    if (index >= 0) {
      this.recipeSave.ingredients.splice(index, 1)
      return
    }
    // add new object to repeat
    this.recipeSave.ingredients.push({})
  }

  // clicks to change step in recipe
  changeStep (index) {
    this.stepBtn = 'another'
    // if index passed, delete recipe
    if (index >= 0) {
      this.recipeSave.steps.splice(index, 1)
      return
    }
    // add new object to repeat
    this.recipeSave.steps.push({})
  }
}
