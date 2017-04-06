class RecipesController {
  constructor ($http, $rootScope, dataService, $location) {
    this.$http = $http
    this.dataService = dataService
    this.$location = $location
    this.setRecipes()
    this.setCategories()
  }

  addRecipe () {
    this.$location.path('/add')
  }

  setRecipes () {
    this.dataService.dataRequests('GET', 'recipes')
      .then(data => {
        console.log(data)
        this.recipes = data
      })
  }

  setCategories () {
    this.dataService.dataRequests('GET', 'categories')
      .then(data => {
        this.dataService.categories = data
        this.categories = data
      })
  }
}

