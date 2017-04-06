class RecipeDetailController {
  constructor ($http, $rootScope, $scope, dataService, $location, $routeParams) {
    // inject services and modules
    this.$http = $http
    this.$routeParams = $routeParams
    this.dataService = dataService
    this.$scope = $scope
    this.$location = $location
    // initialize items
    this.setItems()
    this.setCategories()
    this.init()
    this.recipeSave = {
      // name: '',
      ingredients: [],
      steps: []
    }
  }

  init () {
    this.ingredientBtn = 'an'
    this.stepBtn = 'a'
    if (this.$location.url() === '/add') {
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

  setItems () {
    this.dataService.dataRequests('GET', 'foodItems')
      .then(data => {
        this.foodItems = data
      })
  }

  setCategories () {
    this.dataService.dataRequests('GET', 'categories')
      .then(data => {
        this.categories = data
      })
  }

  createRecipe () {
    if (this.$location.url() === '/add') {
      this.dataService.dataRequests('POST', 'recipes', this.recipeSave)
      // return
    }
  }

  changeIngredient (index) {
    this.ingredientBtn = 'another'
    if (index >= 0) {
      console.log('delete', index)
      this.recipeSave.ingredients.splice(index, 1)
      return
    }
    this.recipeSave.ingredients.push({})
  }

  changeStep (index) {
    this.stepBtn = 'another'
    if (index >= 0) {
      console.log('delete', index)
      this.recipeSave.steps.splice(index, 1)
      return
    }
    this.recipeSave.steps.push({})
  }
}
