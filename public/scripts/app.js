(function () {
  const app = angular.module('app', ['ngRoute'])


  app.service('dataService', dataService)
  app.controller('RecipesController', RecipesController)
  app.controller('RecipeDetailController', RecipeDetailController)
})()
