(function () {
  class dataService {
    constructor ($http, $q) {
      this.$http = $http
      this.$q = $q
      this.apiRoot = 'http://localhost:5000/api/'
    }

    initData (...endpoints) {
      // pass items api endpoint for GET request, then set scope variables to responses
       return this.$q
        .all(this.setupData(...endpoints)) // get array of promises
        .then(responses => responses) // return array from endpoints passed
    }

    dataRequests (request, path, postData) {
      // set request options
      const reqOptions = {
        method: request,
        url: `${this.apiRoot}` + path
      }
      // if recipe is being added, add data for POST data
      if (postData) {
        reqOptions.data = postData
      }
      return this.$http(reqOptions).then(response => response.data)
    }

    // setup promises for recipes and details pages
    setupData (...requests) {
      const promises = []
      requests.forEach(request => {
        promises.push(this.dataRequests('GET', request))
      })
      return promises
    }
  }
  angular
    .module('app')
    .service('dataService', dataService)
})()
