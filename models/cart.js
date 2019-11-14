module.exports = function cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var itemStored = this.items[id];
        if(!itemStored) {
            itemStored = this.items[id] = {item: item, qty: 0, price: 0};
        }
        itemStored.qty++;
        itemStored.price = itemStored.item.price * itemStored.qty;
        this.totalQuantity++;
        this.totalPrice += itemStored.item.price;
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};