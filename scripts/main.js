var form = document.querySelector('[data-coffee-order="form"]');

var dataStore = key => {
  var get = () => {
    var string = localStorage.getItem(key);
    var parsed = JSON.parse(string);
    return parsed;
  }
  
  var set = data => {
    var string = JSON.stringify(data);
    localStorage.setItem(key, string);
    return true;
  }

  return {
    get,
    set
  }
}

var orderStore = dataStore('orders');
var idStore = dataStore('id');

var orderArray = [1,2,3,4];

orderStore.set(orderArray);