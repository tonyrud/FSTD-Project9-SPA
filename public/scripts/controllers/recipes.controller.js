(function () {
  class RecipesController {
    constructor (dataService) {
      // inject services and modules
      this.dataService = dataService

      // initialize items
      this.init()
    }

    init () {
      this.dataService.initData('recipes', 'categories')
        .then(responses => {
          this.recipes = responses[0]
          this.categories = responses[1]
        })
    }

    deleteRecipe (id) {
      this.dataService.dataRequests('DELETE', `recipes/${id}`)
          .then(this.init())
    }
  }
  angular
  .module('app')
  .controller('RecipesController', RecipesController)
})()

