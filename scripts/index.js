// Initialize page by getting any orders in localStorage
// and creating nodes from orders

var init = () => {
  var initOrders = Orders.get();
  initOrders.forEach(order => {
    createNode(order);
  });

  console.log(`Initialized ${initOrders.length} saved orders`);

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