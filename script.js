let order = [];
let totalAmount = 0;
let orderHistory = []; // Array to store completed orders

// Function to add an item to the order or update its quantity
function addItem(name, price) {
    const existingItem = order.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * price;
    } else {
        order.push({ name, price, quantity: 1, totalPrice: price });
    }

    renderOrder();
    updateTotal();
}

// Function to render the order list
function renderOrder() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    order.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - $${item.totalPrice.toFixed(2)}`;
        orderList.appendChild(listItem);
    });
}

// Function to update the total amount
function updateTotal() {
    totalAmount = order.reduce((sum, item) => sum + item.totalPrice, 0);
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
}

// Function to clear the current order
function clearOrder() {
    order = [];
    totalAmount = 0;
    renderOrder();
    updateTotal();
}

// Function to complete the order and show the receipt
function completeOrder() {
    if (order.length === 0) {
        alert("No items in the order.");
        return;
    }

    // Save the completed order to order history
    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();

    orderHistory.push({
        items: [...order],
        total: totalAmount,
        time: `${formattedDate} ${formattedTime}`
    });

    // Generate receipt content
    let receiptContent = `
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <ul>`;
    order.forEach(item => {
        receiptContent += `<li>${item.name} x ${item.quantity} - $${item.totalPrice.toFixed(2)}</li>`;
    });
    receiptContent += `</ul>
        <p><strong>Total: $${totalAmount.toFixed(2)}</strong></p>
        <p>Thank you for dining with us!</p>`;

    document.getElementById('receipt-details').innerHTML = receiptContent;

    // Show the receipt modal
    document.getElementById('receipt-modal').style.display = 'block';

    // Clear the order after displaying the receipt
    clearOrder();
}

// Function to close the receipt modal
function closeReceipt() {
    document.getElementById('receipt-modal').style.display = 'none';
}

// Function to toggle between POS view and order history view
function toggleOrderHistory() {
    const posSection = document.getElementById('menu-section');
    const orderSection = document.getElementById('order-section');
    const historySection = document.getElementById('order-history-section');

    posSection.style.display = 'none';
    orderSection.style.display = 'none';
    historySection.style.display = 'block';

    renderOrderHistory();
}

// Function to show the POS view
function showPOSView() {
    const posSection = document.getElementById('menu-section');
    const orderSection = document.getElementById('order-section');
    const historySection = document.getElementById('order-history-section');

    posSection.style.display = 'block';
    orderSection.style.display = 'block';
    historySection.style.display = 'none';
}

// Function to render the order history
function renderOrderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    orderHistory.forEach((order, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Order ${index + 1}</strong> - ${order.time}<ul>`;

        order.items.forEach(item => {
            listItem.innerHTML += `<li>${item.name} x ${item.quantity} - $${item.totalPrice.toFixed(2)}</li>`;
        });

        listItem.innerHTML += `</ul><strong>Total: $${order.total.toFixed(2)}</strong>`;
        historyList.appendChild(listItem);
    });
}
function completeOrder() {
    if (order.length === 0) {
        alert("No items in the order.");
        return;
    }

    // Save the completed order to order history
    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();

    orderHistory.push({
        items: [...order],
        total: totalAmount,
        time: `${formattedDate} ${formattedTime}`
    });

    // Generate receipt content
    let receiptContent = `
        <html>
        <head>
            <title>Receipt - IBRAHIM'S CAFE</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                h2 { margin-bottom: 10px; }
                p, ul, li { font-size: 18px; }
                ul { list-style: none; padding: 0; }
                .total { font-weight: bold; font-size: 20px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h2>IBRAHIM'S CAFE Receipt</h2>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <ul>`;

    order.forEach(item => {
        receiptContent += `<li>${item.name} x ${item.quantity} - $${item.totalPrice.toFixed(2)}</li>`;
    });

    receiptContent += `</ul>
            <p class="total">Total: $${totalAmount.toFixed(2)}</p>
            <p>Thank you for dining with us!</p>
        </body>
        </html>`;

    // Open the receipt content in a new window/tab
    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();

    // Clear the order after showing the receipt
    clearOrder();
}
// Function to decrease the quantity of an item
function decreaseQuantity(name) {
    const item = order.find(item => item.name === name);

    if (item) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;

        if (item.quantity <= 0) {
            // Remove item from the order if quantity is zero
            order = order.filter(orderItem => orderItem.name !== name);
        }

        renderOrder();
        updateTotal();
    }
}
// Function to increase the quantity of an item
function increaseQuantity(name) {
    const item = order.find(item => item.name === name);

    if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;

        renderOrder();
        updateTotal();
    }
}

// Function to decrease the quantity of an item
function decreaseQuantity(name) {
    const item = order.find(item => item.name === name);

    if (item) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;

        if (item.quantity <= 0) {
            order = order.filter(orderItem => orderItem.name !== name); // Remove item if quantity is 0
        }

        renderOrder();
        updateTotal();
    }
}

// Updated renderOrder function to include digital display with increment and decrement buttons
function renderOrder() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    order.forEach(item => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            ${item.name} - $${item.totalPrice.toFixed(2)}
            <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
        `;

        orderList.appendChild(listItem);
    });
}

// script.js

function filterItems() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;

    const items = document.querySelectorAll('.menu-items .item');
    items.forEach(item => {
        const itemName = item.querySelector('.item-info p').textContent.toLowerCase();
        const itemCategory = item.dataset.category;

        const matchesSearch = itemName.includes(searchInput);
        const matchesCategory = categoryFilter === 'all' || itemCategory === categoryFilter;

        // Show or hide item based on search and category filter
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
// JavaScript to validate login credentials
function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example hardcoded credentials (you can replace this with server-side validation)
    const validUsername = "ibrahim";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {

        // Redirect to POS view
        window.location.href = "pos.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}
// Define a mapping of barcodes to items
const barcodeToItemMap = {
    "12345": { name: "Burger", price: 5 },
    "67890": { name: "Fries", price: 3 },
    "11111": { name: "Pizza", price: 8 },
    "22222": { name: "Soda", price: 2 },
};

// Handle barcode input
function handleBarcode(event) {
    if (event.key === "Enter") {
        const barcode = event.target.value.trim();

        if (barcodeToItemMap[barcode]) {
            const item = barcodeToItemMap[barcode];
            addItem(item.name, item.price);
        } else {
            alert("Invalid barcode! Please try again.");
        }

        // Clear the input field after scanning
        event.target.value = "";
    }
}






