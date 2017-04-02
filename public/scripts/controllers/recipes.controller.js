class RecipesController {
  constructor ($http, $rootScope, dataService) {
    this.$http = $http
    this.dataService = dataService
    this.setRecipes()
    this.setCategories()
  }

  setRecipes () {
    this.dataService.getData('api/recipes')
      .then(data => {
        console.table(data)
        this.recipes = data
      })
  }

  setCategories () {
    this.dataService.getData('api/categories')
      .then(data => {
        this.categories = data
      })
  }
}

