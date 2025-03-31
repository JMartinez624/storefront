var cart = [];
const products_in_cart = {};
let total = 0;

function increaseItem(product, price) {
    products_in_cart[product]["quantity"] += 1;
    products_in_cart[product]["total"] += parseFloat(price);
}

function decreaseItem(product, price) {
    products_in_cart[product]["quantity"] -= 1;
    products_in_cart[product]["total"] -= parseFloat(price);
}

function addToCart(product, price) {
    var name = product.replace(/\s/g, '');
    let flag = false;
    if (products_in_cart[product] == null){
        products_in_cart[product] = {};
        products_in_cart[product]["quantity"] = 1;
        products_in_cart[product]["total"] = parseFloat(price);
        flag = true;
    } else {
        products_in_cart[product]["quantity"] += 1;
        products_in_cart[product]["total"] += parseFloat(price);
    }
    var value = document.getElementById('total').innerText;
    value++;
    document.getElementById('total').innerText = value;
    cart.push(product);

    if (flag) { 
        document.getElementById('cart-items').innerHTML += `
        <h3>
        ${product} <span class='cart_quantity' id='${name}_quantity'>${products_in_cart[product].quantity}</span>x @ $${price} <span id='${name}_total'>$${products_in_cart[product].total}</span>
        </h3>
        `;
    } else {
        var v = document.getElementById(`${name}_quantity`).innerText;
        v++;
        document.querySelector(`#${name}_quantity`).innerText = v;

        document.querySelector(`#${name}_total`).innerText = `$${products_in_cart[product]["total"]}`;
    }
   
    console.log(products_in_cart);
}