var form = document.querySelector('[data-coffee-order="form"]');
var list = document.querySelector('[data-coffee-order="list"]');

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

// Validate order before submitting

var validateOrder = obj => {
  var errors = [];
  return errors;
}

// Generate new id and store in idStore

var generateId = () => {
  var id = parseInt(idStore.get()) || 0;
  id++;
  idStore.set(id);
  return id;
}

// Create node from object

var createNode = obj => {
  var id = obj.id;
  var name = `order-${id}`;
  
  var li = document.createElement('div');
  li.classList.add('form-check');
  li.dataset.id = id;

  var input = document.createElement('input');
  input.classList.add('form-check-input');
  input.type = 'checkbox';
  input.id = name;
  input.name = name;

  var label = document.createElement('label');
  label.classList.add('form-check-label');
  label.setAttribute('for', name);

  var text = document.createTextNode(obj.coffeeOrder);

  label.appendChild(text);
  li.appendChild(input);
  li.appendChild(label);
  list.appendChild(li);

  input.addEventListener('click', e => {
    e.preventDefault();
    removeOrder(id);
  });
}

// Create order by 1) turning order into DOM node w/ event listener and id,
// 2) appending to orders div, 3) saving new localStorage object with all orders,
// and 4) saving current id in localStorage.

var createOrder = obj => {
  var orders = orderStore.get();
  orders.push(obj);
  orderStore.set(orders);
  createNode(obj);
}

var removeOrder = id => {
  var orders = orderStore.get();
  var newOrders = orders.filter(order => order.id !== id);
  orderStore.set(newOrders);

  var node = list.querySelector(`[data-id="${id}"`);
  node.remove();
}

var handleFormSubmission = form => {
  var id = generateId();

  var { coffeeOrder, emailAddress, size, flavor, strength } = form;

  var obj = {
    id,
    coffeeOrder: coffeeOrder.value,
    emailAddress: emailAddress.value,
    size: size.value,
    flavor: flavor.value,
    strength: strength.value
  };

  var errors = validateOrder(obj);

  if (errors.length) {
    console.log('There are errors with your order');
    return;
  }

  createOrder(obj);
}

// Initialize page by getting any orders in localStorage
// and creating nodes from orders

var init = () => {
  var initOrders = orderStore.get();

  initOrders.forEach(order => {
    createNode(order);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    handleFormSubmission(form);
  });

  form.addEventListener('reset', e => {
    e.preventDefault();
    form.reset();
  });
}

init();