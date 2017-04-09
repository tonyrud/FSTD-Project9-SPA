(function () {
  class RecipeDetailController {
    constructor (dataService, $location, $routeParams) {
      // inject services and modules
      this.$routeParams = $routeParams
      this.dataService = dataService
      this.$location = $location
      this.errors = []
      // create empty arrays for recipe ingredients and steps
      this.recipeSave = {
        ingredients: [],
        steps: []
      }
      // set buttons
      this.ingredientBtn = 'an'
      this.stepBtn = 'a'
      this.selectedRecipeData()
      // initialize data
      this.dataService.initData('categories', 'foodItems')
        .then(responses => {
          this.categories = responses[0]
          this.foodItems = responses[1]
        })
    }

    // initialize recipe data
    selectedRecipeData () {
      // set title
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

    // clicks to change ingredients and steps for recipe
    changeItem (item, index) {
      // if index passed, delete recipe
      if (index >= 0) {
        item.splice(index, 1)
        return
      }
      // add new object to repeat
      item.push({})
    }
  }
  angular
    .module('app')
    .controller('RecipeDetailController', RecipeDetailController)
})()
