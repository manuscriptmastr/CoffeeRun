// Initialize page by getting any orders in localStorage
// and creating nodes from orders

var init = () => {
  var Orders = orders();
  var initOrders = Orders.get();
  var Dom = dom(Orders);
  initOrders.forEach(order => {
    Dom.add(order);
  });

  console.log(`Initialized ${initOrders.length} saved orders`);
}

init();