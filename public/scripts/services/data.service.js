class dataService {
  constructor ($http, $rootScope) {
    this.$http = $http
    this.apiRoot = 'http://localhost:5000/api/'
  }

  dataRequests (request, path, postData) {
    const reqOptions = {
      method: request,
      url: `${this.apiRoot}` + path
    }
    if (request === 'DELETE') {
      console.log('delete method')
    }
    if (postData) {
      reqOptions.data = postData
      debugger
      this.$http(reqOptions).then(response => {
        debugger
        response.data
      })
    }
    return this.$http(reqOptions).then(response => response.data)
  }
}

