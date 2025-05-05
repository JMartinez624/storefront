const products_in_cart = {};
let total = 0;

function addToCart(product, price) {
    const name = product.replace(/\s/g, '');
    
    if (!products_in_cart[product]) {
        products_in_cart[product] = {
            quantity: 1,
            total: parseFloat(price)
        };
    } else {
        products_in_cart[product].quantity += 1;
        products_in_cart[product].total += parseFloat(price);
    }

    total += parseFloat(price);
    updateCartUI(product, price);
    updateButtonUI(product, price);
    updateCartSummary();
}

function increaseItem(product, price) {
    products_in_cart[product].quantity += 1;
    products_in_cart[product].total += parseFloat(price);
    total += parseFloat(price);

    updateButtonUI(product, price);
    updateCartUI(product, price);
    updateCartSummary();
}

function decreaseItem(product, price) {
    if (!products_in_cart[product]) return;

    products_in_cart[product].quantity -= 1;
    products_in_cart[product].total -= parseFloat(price);
    total -= parseFloat(price);

    if (products_in_cart[product].quantity <= 0) {
        removeFromCart(product);
    } else {
        updateButtonUI(product, price);
        updateCartUI(product, price);
        updateCartSummary();
    }
}

function removeFromCart(product) {
    const name = product.replace(/\s/g, '');
    
    if (!products_in_cart[product]) return;

    total -= products_in_cart[product].total;
    delete products_in_cart[product];

    const cartItem = document.getElementById(`${name}_cart`);
    if (cartItem) cartItem.remove();

    const totalItems = Object.values(products_in_cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('total').innerText = totalItems;

    updateCartSummary();

    // Reset button to Add to Cart
    const button = document.getElementById(`add-${name}`);
    button.style.backgroundColor = "";
    button.innerHTML = `
        <span onclick="addToCart('${product}', '${price}')">
            <img src="./assets/images/icon-add-to-cart.svg"/>
            <span id="add-text">Add to Cart</span>
        </span>`;
}

function updateButtonUI(product, price) {
    const name = product.replace(/\s/g, '');
    const qty = products_in_cart[product].quantity;
    console.log(name);

    document.getElementById(`add-${name}`).style.backgroundColor = "hsl(14, 86%, 42%)";
    document.getElementById(`add-${name}`).innerHTML = `
        <div style="display: flex; justify-content: space-between; color: white;">
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-left: 5px;"
                src="./assets/images/icon-decrement-quantity.svg"
                onclick="decreaseItem('${product}', ${price})"/>
            ${qty}
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-right: 5px;"
                src="./assets/images/icon-increment-quantity.svg"
                onclick="increaseItem('${product}', ${price})"/>
        </div>`;
}

function updateCartUI(product, price) {
    const name = product.replace(/\s/g, '');
    const cartItem = document.getElementById(`${name}_cart`);

    if (!cartItem) {
        document.getElementById('cart-items').innerHTML += `
        <div id='${name}_cart' style="display: flex;">
            <div style="display: flex; flex-direction: column; width: 400px; padding-right: 30px;">
                <h3>${product}</h3>
                <h3>
                    <span style="color: hsl(14, 86%, 42%)" id='${name}_quantity'>${products_in_cart[product].quantity}x</span>&ensp;
                    <span style="color: hsl(14, 25%, 72%); padding-right: 5px;">@ $${price}</span>
                    <span style="color: hsl(12, 20%, 44%)" id='${name}_total'>$${products_in_cart[product].total.toFixed(2)}</span>
                </h3>
            </div>
            <div style="display: flex; align-items: center;">
                <img style="border: 2px solid hsl(14, 25%, 72%); border-radius: 25px; height: 15px; padding: 1px;"
                     onclick="removeFromCart('${product}')"
                     src="./assets/images/icon-remove-item.svg"/>
            </div>
        </div>`;
    } else {
        document.querySelector(`#${name}_quantity`).innerText = `${products_in_cart[product].quantity}x`;
        document.querySelector(`#${name}_total`).innerText = `$${products_in_cart[product].total.toFixed(2)}`;
    }
}

function updateCartSummary() {
    const totalItems = Object.values(products_in_cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('total').innerText = totalItems;
    document.getElementById('cart-total').innerText = total.toFixed(2);
}
