class RecipesController {
  constructor (dataService, $location) {
    // inject services and modules
    this.dataService = dataService
    this.$location = $location
    this.init()
  }

  init () {
    this.dataService.setRecipes().then(response => {
      this.recipes = response
      console.log(this.recipes)
    })
    this.dataService.setCategories().then(response => {
      this.categories = response
    })
  }

  deleteRecipe (id) {
    this.dataService.dataRequests('DELETE', `recipes/${id}`)
        .then(this.init())
  }
}

