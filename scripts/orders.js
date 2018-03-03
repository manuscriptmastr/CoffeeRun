var orders = () => {

// Datastore function factory

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

// Create localStorage datastores with factory function

var orderStore = dataStore('orders');
var idStore = dataStore('id');

// Generate new id and store in idStore

var generateId = () => {
  var id = parseInt(idStore.get()) || 0;
  id++;
  idStore.set(id);
  return id;
}

var getOrders = () => {
  return orderStore.get();
}

// Accept order object and save to localStorage

var createOrder = obj => {
  var id = generateId();
  obj.id = id;
  var orders = orderStore.get();
  orders.push(obj);
  orderStore.set(orders);

  console.log('Added new order: ' + obj.id);
  return obj;
}

// Accept order object id and delete from localStorage

var removeOrder = id => {
  var orders = orderStore.get();
  var newOrders = orders.filter(order => order.id !== id);
  orderStore.set(newOrders);

  console.log('Removed order: ' + id);
  return true;
}

return {
  get: () => getOrders(),
  add: obj => createOrder(obj),
  remove: id => removeOrder(id)
}

}