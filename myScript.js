const products_in_cart = {};
let total = 0;
let appliedDiscount = 0; 


const productImages = {
    "Waffle with Berries": "./assets/images/image-waffle-thumbnail.jpg",
    "Vanilla Bean Creme Brulee": "./assets/images/image-creme-brulee-thumbnail.jpg",
    "Macaron Mix of Five": "./assets/images/image-macaron-thumbnail.jpg",
    "Classic Tiramisu": "./assets/images/image-tiramisu-thumbnail.jpg",
    "Pistachio Baklava": "./assets/images/image-baklava-thumbnail.jpg",
    "Lemon Meringue Pie": "./assets/images/image-meringue-thumbnail.jpg",
    "Red Velvet Cake": "./assets/images/image-cake-thumbnail.jpg",
    "Salted Caramel Brownie": "./assets/images/image-brownie-thumbnail.jpg",
    "Vanilla Panna Cotta": "./assets/images/image-panna-cotta-thumbnail.jpg"
};

function startNewOrder() {
    const modal = document.getElementById('order-confirmation-modal');
    modal.style.display = 'none';

    document.getElementById('cart-items').innerHTML = "";

    for (const product in products_in_cart) {
        delete products_in_cart[product];
    }

    const allButtons = document.querySelectorAll('.add-to-cart');
    allButtons.forEach(button => {
        const name = button.id.replace('add-', ''); // get product name id
        const productName = Object.keys(productImages).find(key => key.replace(/\s/g, '') === name);

        const price = document.querySelector(`.food-name:contains("${productName}")`)?.nextElementSibling?.textContent?.replace('$','') || '';

        button.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg"/>
            <span id="add-text">Add to Cart</span>`;
        button.onclick = () => addToCart(productName, price);
        button.style.backgroundColor = "";
    });

    updateCartSummary();
}



function addToCart(product, price) {    
    if (!products_in_cart[product]) {
        products_in_cart[product] = {
            quantity: 1,
            total: parseFloat(price)
        };
    } else {
        products_in_cart[product].quantity += 1;
        products_in_cart[product].total += parseFloat(price);
    }

    updateCartUI(product, price);
    updateButtonUI(product, price);
    updateCartSummary();
}

function increaseItem(product, price) {
    products_in_cart[product].quantity += 1;
    products_in_cart[product].total += parseFloat(price);

    updateButtonUI(product, price);
    updateCartUI(product, price);
    updateCartSummary();
}

function decreaseItem(product, price) {
    const name = product.replace(/\s/g, '');

    if (!products_in_cart[product]) return;

    products_in_cart[product].quantity -= 1;
    products_in_cart[product].total -= parseFloat(price);

    if (products_in_cart[product].quantity <= 0) {
        const cartItem = document.getElementById(`${name}_cart`);
        if (cartItem) cartItem.remove();

        delete products_in_cart[product];

        const button = document.getElementById(`add-${name}`);
        button.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg"/>
            <span id="add-text">Add to Cart</span>`;
        button.onclick = () => addToCart(product, price);
        button.style.backgroundColor = "";

        updateCartSummary();
    } else {
        updateButtonUI(product, price);
        updateCartUI(product, price);
        updateCartSummary();
    }
}

function removeFromCart(product, price) {
    const name = product.replace(/\s/g, '');
    
    if (!products_in_cart[product]) return;

    total -= products_in_cart[product].total;
    delete products_in_cart[product];

    const cartItem = document.getElementById(`${name}_cart`);
    if (cartItem) cartItem.remove();

    const totalItems = Object.values(products_in_cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('total').innerText = totalItems;
    document.getElementById('cart-total').innerText = total.toFixed(2);

    updateCartSummary();

    const button = document.getElementById(`add-${name}`);
    button.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg"/>
            <span id="add-text">Add to Cart</span>`;
    button.onclick = () => addToCart(product, price);
    button.style.backgroundColor = "";
}

function updateButtonUI(product, price) {
    const name = product.replace(/\s/g, '');
    const qty = products_in_cart[product].quantity;

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
    const cartItemsDiv = document.getElementById('cart-items');


    if (!cartItem) {
        cartItemsDiv.insertAdjacentHTML('beforeend',`
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
                     onclick="removeFromCart('${product}', '${price}')"
                     src="./assets/images/icon-remove-item.svg"/>
            </div>
        </div>`);

    } else {
        document.querySelector(`#${name}_quantity`).innerText = `${products_in_cart[product].quantity}x`;
        document.querySelector(`#${name}_total`).innerText = `$${products_in_cart[product].total.toFixed(2)}`;
    }
}

function getProductPrice(productName) {
    const allFoodNames = document.querySelectorAll('.food-name');
    for (let foodName of allFoodNames) {
        if (foodName.textContent.trim() === productName) {
            const priceElement = foodName.nextElementSibling;
            return priceElement.textContent.trim().replace('$', '');
        }
    }
    return '0.00'; 
}


function startNewOrder() {
    const modal = document.getElementById('order-confirmation-modal');
    modal.style.display = 'none';

    for (const product in products_in_cart) {
        delete products_in_cart[product];
    }

    total = 0;

    const allButtons = document.querySelectorAll('.add-to-cart');
    allButtons.forEach(button => {
        const name = button.id.replace('add-', '');
        const productName = Object.keys(productImages).find(key => key.replace(/\s/g, '') === name);

        const price = getProductPrice(productName);  

        button.innerHTML = `
            <span onclick="addToCart('${productName}', '${price}')">
                <img src="./assets/images/icon-add-to-cart.svg"/>
                <span id="add-text">Add to Cart</span>
            </span>`;
        button.style.backgroundColor = "";
    });

    document.getElementById('cart-items').innerHTML = "";

    updateCartSummary();
}



function updateCartSummary() {
    console.log("Cart items for summary:", products_in_cart);

    const totalItems = Object.values(products_in_cart).reduce((sum, item) => sum + item.quantity, 0);
    const rawTotal = Object.values(products_in_cart).reduce((sum, item) => sum + item.total, 0);

    let discountedTotal = rawTotal;
    if (appliedDiscount > 0) {
        discountedTotal = rawTotal * (1 - appliedDiscount / 100);
    }

    document.getElementById('total').innerText = totalItems;
    document.getElementById('cart-total').innerText = discountedTotal.toFixed(2);

    const cartItemsDiv = document.getElementById('cart-items');
    const orderBox = document.querySelector('.order-box');
    const carbonNeutral = document.getElementById('carbon-neutral');
    const confirmButton = document.getElementById('confirm-button');

    if (totalItems === 0) {
        cartItemsDiv.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <img src="assets/images/illustration-empty-cart.svg" style="width: 150px; margin-bottom: 10px;" />
                <p style="color: hsl(12, 20%, 44%); font-size: 14px;">Your added items will appear here</p>
            </div>`;

        orderBox.style.display = 'none';
        carbonNeutral.style.display = 'none';
        confirmButton.style.display = 'none';
    } else {
        const emptyState = cartItemsDiv.querySelector('img[src="assets/images/illustration-empty-cart.svg"]');
        if (emptyState) {
            cartItemsDiv.innerHTML = "";
        }

        orderBox.style.display = 'block';
        carbonNeutral.style.display = 'block';
        confirmButton.style.display = 'block';
    }
}



updateCartSummary();

document.getElementById('confirm-button').addEventListener('click', () => {
    const modal = document.getElementById('order-confirmation-modal');
    const orderItemsList = document.getElementById('order-items-list');
    const orderModalTotal = document.getElementById('order-modal-total');

    orderItemsList.innerHTML = "";

    for (const product in products_in_cart) {
        console.log(product);
        const item = products_in_cart[product];

        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.marginBottom = '10px';

        const img = document.createElement('img');
        img.src = productImages[product] || '';
        img.alt = product;
        img.style.width = '40px';
        img.style.height = '40px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        img.style.marginRight = '10px';

        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <strong>${product}</strong><br>
            <span style="color: hsl(14, 25%, 72%); font-size: 12px;">${item.quantity}x @ $${(item.total / item.quantity).toFixed(2)}</span>
        `;

        const leftDiv = document.createElement('div');
        leftDiv.style.display = 'flex';
        leftDiv.style.alignItems = 'center';
        leftDiv.appendChild(img);
        leftDiv.appendChild(infoDiv);

        const totalDiv = document.createElement('div');
        totalDiv.textContent = `$${item.total.toFixed(2)}`;
        totalDiv.style.fontWeight = 'bold';

        itemDiv.appendChild(leftDiv);
        itemDiv.appendChild(totalDiv);

        orderItemsList.appendChild(itemDiv);
    }

    const rawTotal = Object.values(products_in_cart).reduce((sum, item) => sum + item.total, 0);
    const discountedTotal = appliedDiscount > 0 ? rawTotal * (1 - appliedDiscount / 100) : rawTotal;
    orderModalTotal.textContent = `$${discountedTotal.toFixed(2)}`;
    modal.style.display = 'flex';
});

document.getElementById('toggle-darkmode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('apply-discount').addEventListener('click', () => {
    const code = document.getElementById('discount-code').value.trim().toUpperCase();
    const message = document.getElementById('discount-message');

    if (code === 'SAVE10') {
        appliedDiscount = 10;
        message.textContent = "✅ 10% discount applied!";
    } else if (code === 'SAVE20') {
        appliedDiscount = 20;
        message.textContent = "✅ 20% discount applied!";
    } else {
        appliedDiscount = 0;
        message.textContent = "❌ Invalid discount code.";
    }

    updateCartSummary(); // re-calculate total
});
