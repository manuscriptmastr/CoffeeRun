// Initialize page by getting any orders from api
// and creating nodes from orders

var init = () => {
  var Orders = orders();
  Orders.get().then(data => {
    var initOrders = Object.values(data);
    var Dom = dom(Orders);
    initOrders.forEach(order => {
      Dom.add(order);
    });

    console.log(`Initialized ${initOrders.length} saved orders`);
  });
};

init();