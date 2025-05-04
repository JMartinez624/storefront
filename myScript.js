const products_in_cart = {};
let total = 0;
console.log(products_in_cart);
let zero = true;


function increaseItem(product, price) {
    var name = product.replace(/\s/g, '');
    let flag = false;

    if (products_in_cart[product] == null){
        products_in_cart[product]["quantity"] += 1;
        products_in_cart[product]["total"] += parseFloat(price);
        flag = true;


        total += parseFloat(price);

        var value = document.getElementById('total').innerText;
        value++;
        document.getElementById('total').innerText = value;
    } else {
        products_in_cart[product]["quantity"] += 1;
        products_in_cart[product]["total"] += parseFloat(price);
    }

    document.getElementById(`add-${name}`).innerHTML = `
        <div style="display: flex; justify-content: space-between; color: white;">
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-left: 5px;" src="./assets/images/icon-decrement-quantity.svg" onclick="decreaseItem('${product}', ${price})"/>
            ${products_in_cart[product]["quantity"]}
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-right: 5px;" src="./assets/images/icon-increment-quantity.svg" onclick="increaseItem('${product}', ${price})"/>
        </div>
    `;


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
                <img id="tru" style="border: 2px solid hsl(14, 25%, 72%); border-radius: 25px; height: 15px; padding: 1px;" onclick="removeFromCart('${product}')" src="./assets/images/icon-remove-item.svg"/>
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

function decreaseItem(product, price) {
    // console.log(products_in_cart);
    var name = product.replace(/\s/g, '');
    console.log(products_in_cart[product]);

    if (products_in_cart[product] != null){
        products_in_cart[product]["quantity"] -= 1;
        products_in_cart[product]["total"] -= parseFloat(price);
        document.getElementById(`add-${name}`).innerHTML = `
        <div style="display: flex; justify-content: space-between; color: white;">
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-left: 5px;" src="./assets/images/icon-decrement-quantity.svg" onclick="decreaseItem('${product}', ${price})"/>
            ${products_in_cart[product]["quantity"]}
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-right: 5px;" src="./assets/images/icon-increment-quantity.svg" onclick="increaseItem('${product}', ${price})"/>
        </div>
        `;
    
        total -= parseFloat(price);
    
        var value = document.getElementById('total').innerText;
        value--;
        document.getElementById('total').innerText = value; 
        if (products_in_cart[product]["quantity"] == 0) {
            console.log("heelo");
            delete products_in_cart[product];
            console.log(products_in_cart);
        }
    } else {
        console.log('here');
        document.getElementById(`add-${name}`).innerHTML = `
        <span onclick="addToCart('Waffle with Berries', '6.50')"><img src="./assets/images/icon-add-to-cart.svg"/> <span id="add-text">Add to Cart</span></span>
        `;
    }
    
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
    total = total.toFixed(2) - cost_to_remove.toFixed(2);
    document.getElementById('cart-total').innerText = total.toFixed(2);

    var name = product.replace(/\s/g, '');
    delete products_in_cart[product];
    const element = document.getElementById(`${name}_cart`);
    element.remove();
}

function addToCart(product, price) {
    var name = product.replace(/\s/g, '');
    let flag = false;
    // total += parseFloat(price);


    if (products_in_cart[product] == null){
        products_in_cart[product] = {};
        products_in_cart[product]["quantity"] = 1;
        products_in_cart[product]["total"] = parseFloat(price);
        flag = true;

        document.getElementById(`add-${name}`).style.backgroundColor = "hsl(14, 86%, 42%)";
        document.getElementById(`add-${name}`).innerHTML = `
        <div style="display: flex; justify-content: space-between; color: white;">
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-left: 5px;" src="./assets/images/icon-decrement-quantity.svg" onclick="decreaseItem('${product}', ${price})"/>
            ${products_in_cart[product]["quantity"]}
            <img style="border: 2px solid white; border-radius: 25px; width: 10px; padding: 2px; margin-right: 5px;" src="./assets/images/icon-increment-quantity.svg" onclick="increaseItem('${product}', ${price})"/>
        </div>
        `;

        total += parseFloat(price);

        var value = document.getElementById('total').innerText;
        value++;
        document.getElementById('total').innerText = value;
    } 
    // else {
    //     products_in_cart[product]["quantity"] += 1;
    //     products_in_cart[product]["total"] += parseFloat(price);
    // }


    // var value = document.getElementById('total').innerText;
    // value++;
    // document.getElementById('total').innerText = value;

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
                <img id="tru" style="border: 2px solid hsl(14, 25%, 72%); border-radius: 25px; height: 15px; padding: 1px;" onclick="removeFromCart('${product}')" src="./assets/images/icon-remove-item.svg"/>
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