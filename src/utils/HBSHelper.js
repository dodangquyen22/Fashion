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
    },
    increment: function(index) {
      return index + 1;
    },
    formatPrice: function(price) {
      return price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    },
    sortable: function(field, sort) {
      let sortType ='default';
      if (field === sort.column) sortType = sort.type;
      const icons = {
        default: 'fa-solid fa-sort',
        asc: 'fa-solid fa-sort-down',
        desc: 'fa-solid fa-sort-up'
      }

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
      }

      
      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
    }
}