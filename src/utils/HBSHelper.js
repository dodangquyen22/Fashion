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
        price = products.reduce((partialSum, a) => partialSum + parseInt(a.price), 0)
        console.log(price);
        return price.toString();
    }
}