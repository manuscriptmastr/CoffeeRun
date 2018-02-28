var form = document.querySelector('[data-coffee-order="form"]');

form.addEventListener('submit', e => {
  e.preventDefault();

  var formArray = ['coffee','emailAddress','size','flavor','strength'];

  var formElements = formArray.map(element => {
    var nodes = form.querySelectorAll(`[name="${element}"]`);
    if (nodes.length > 1) {
      var nodeArray = Array.from(nodes).filter(el => {
        return el.selected || el.checked;
      });

      nodes = nodeArray;
    }
    var node = nodes[0];
    return node;
  });

  var order = {};

  formElements.forEach((el, i) => {
    order[formArray[i]] = el.value;
  });

  return order;
});