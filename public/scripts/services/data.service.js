class dataService {
  constructor ($http, $rootScope) {
    this.$http = $http
    this.apiRoot = 'http://localhost:5000/'
  }

  getRecipes () {
    const endpoint = 'api/recipes'
    this.dataService.getData(endpoint).then(data => {
      this.recipes = data
      console.log(data)
    })
  }

  getData (apiPath) {
    return this.$http.get(this.apiRoot + apiPath).then(response => response.data)
  }
}

