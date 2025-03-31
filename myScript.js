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

function popUp () {
    document.querySelector('.product-page').innerHTML += `
        <dialog open>
        Hello World
        </dialog>
        `;
}

function removeFromCart(product) {
    const quantity_to_remove = products_in_cart[product]["quantity"];
    document.getElementById('total').innerText -= quantity_to_remove;

    const cost_to_remove = products_in_cart[product]["total"];
    const newTotal = total.toFixed(2) - cost_to_remove.toFixed(2);
    document.getElementById('cart-total').innerText = newTotal.toFixed(2);

    var name = product.replace(/\s/g, '');
    delete products_in_cart[product];
    const element = document.getElementById(`${name}_cart`);
    element.remove();
}

function addToCart(product, price) {
    var name = product.replace(/\s/g, '');
    let flag = false;
    total += parseFloat(price);
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

    if (flag) { 
        document.getElementById('cart-items').innerHTML += `
        <div id='${name}_cart' style="display: flex;">
            <div style="display:flex, flex-direction: column; width: 400px; padding-right: 30px;">
                <h3>
                ${product}</h3> <h3> <span style="color: hsl(14, 86%, 42%)" id='${name}_quantity'>${products_in_cart[product].quantity}x</span>&ensp; <span style="color: hsl(14, 25%, 72%); padding-right: 5px;
                ">@ $${price}</span> <span style="color: hsl(12, 20%, 44%)" id='${name}_total'>$${products_in_cart[product].total.toFixed(2)}</span>
                </h3>
            </div>
            <div style="display: flex; align-items: center;">
                <img style="border: 2px solid hsl(14, 25%, 72%); border-radius: 25px; height: 15px; padding: 1px;" onclick="removeFromCart('${product}')" src="./assets/images/icon-remove-item.svg"/>
            </div>
        </div>
        `;
        document.getElementById('cart-total').innerText = total.toFixed(2);
    } else {
        document.querySelector(`#${name}_quantity`).innerText = `${products_in_cart[product]["quantity"]}x`;
        document.querySelector(`#${name}_total`).innerText = `$${products_in_cart[product]["total"].toFixed(2)}`;
        document.getElementById('cart-total').innerText = total.toFixed(2);
    }

}