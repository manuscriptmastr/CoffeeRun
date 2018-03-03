var dom = (Orders) => {

var form = document.querySelector('[data-coffee-order="form"]');
var list = document.querySelector('[data-coffee-order="list"]');

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

  var node = li;

  list.appendChild(node);

  input.addEventListener('click', e => {
    e.preventDefault();
    Orders.remove(id);
    node.remove();
  });
}

// Validate order before submitting

var validateOrder = obj => {
  var errors = [];
  return errors;
}

// Handle submitted order

var handleFormSubmission = form => {
  var { coffeeOrder, emailAddress, size, flavor, strength } = form;

  var obj = {
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

  var newOrder = Orders.add(obj);
  createNode(newOrder);
}

// Add event listeners to form

form.addEventListener('submit', e => {
  e.preventDefault();
  handleFormSubmission(form);
});

return {
  add: obj => createNode(obj)
}

}