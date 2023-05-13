module.exports = {
    ifeq: function(a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    bar: function() {
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
        if(!price) {
            price = 0
        }
        if (typeof price == "string") {
            price = parseInt(price);
        }
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    sortable: function(field, sort) {
        let sortType = 'default';
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