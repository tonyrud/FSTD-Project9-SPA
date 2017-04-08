class dataService {
  constructor ($http, $rootScope) {
    this.$http = $http
    this.apiRoot = 'http://localhost:5000/api/'
  }

  dataRequests (request, path, postData) {
    // set request options
    const reqOptions = {
      method: request,
      url: `${this.apiRoot}` + path
    }
    // if recipe is being added, setup post options
    if (postData) {
      reqOptions.data = postData
    }
    // debugger
    return this.$http(reqOptions).then(response => response.data)
  }

  setRecipes () {
    return this.dataRequests('GET', 'recipes').then(data => data)
  }

  setCategories () {
    return this.dataRequests('GET', 'categories').then(data => data)
  }

  setItems () {
    return this.dataRequests('GET', 'foodItems').then(data => data)
  }
}

