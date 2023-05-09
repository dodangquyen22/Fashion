module.exports = {
    ifeq: function(a, b, options){
      if (a === b) {
        return options.fn(this);
        }
      return options.inverse(this);
    },
    bar: function(){
      return "BAR!";
    },
    total_price: function(products) {
        price = products.reduce((partialSum, a) => partialSum + parseInt(a.price) * a.quantity, 0)
        console.log(price);
        return price.toString();
    },
    increment: function(index) {
      return index + 1;
    },
    formatPrice: function(price) {
      return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
      
    },
    multiple: function(a, b) {
      return a * b;
    },
    productCount: function(cart) {
      let sum = 0;
      cart.forEach(e => {
        sum += e.quantity;
      });
      return sum;
    }
}