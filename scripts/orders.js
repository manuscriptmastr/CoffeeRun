var orders = () => {

// Datastore function factory

var dataStore = url => {
  var get = () => {
    return fetch(url, {
      method: 'GET'
    }).then(data => data.json());
  }
  
  var add = data => {
    return fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(data => data.json());
  }

  var remove = email => {
    return fetch(url + email, {
      method: 'DELETE'
    }).then(success => success.json());
  }

  return {
    get,
    add,
    remove
  }
}

var orderStore = dataStore('https://dc-coffeerun.herokuapp.com/api/coffeeorders/');

return {
  get: () => orderStore.get(),
  add: obj => orderStore.add(obj),
  remove: email => orderStore.remove(email)
}

}