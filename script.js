// Função para salvar os itens no LocalStorage
function saveToLocalStorage(inventory) {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Função para obter os itens do LocalStorage
function getFromLocalStorage() {
    const inventory = localStorage.getItem('inventory');
    return inventory ? JSON.parse(inventory) : [];
}

// Função para renderizar os itens no DOM
function renderInventory() {
    const inventory = getFromLocalStorage();
    const inventoryList = document.getElementById('inventory');
    inventoryList.innerHTML = ''; // Limpa a lista antes de renderizar novamente

    if (inventory.length === 0) {
        inventoryList.innerHTML = '<li>Não há itens no inventário.</li>';
    } else {
        inventory.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - ${item.quantity}
                <button class="update-btn" onclick="editItem(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Excluir</button>
            `;
            inventoryList.appendChild(li);
        });
    }
}

// Função para adicionar um novo item ao inventário
function addItem() {
    const name = document.getElementById('item-name').value;
    const quantity = document.getElementById('item-quantity').value;

    if (name && quantity && !isNaN(quantity) && quantity > 0) {
        const inventory = getFromLocalStorage();
        inventory.push({ name, quantity: parseInt(quantity) });
        saveToLocalStorage(inventory);
        renderInventory();
        document.getElementById('item-name').value = '';
        document.getElementById('item-quantity').value = '';
    } else {
        alert('Por favor, preencha o nome e a quantidade do item corretamente!');
    }
}

// Função para excluir um item
function deleteItem(index) {
    const inventory = getFromLocalStorage();
    inventory.splice(index, 1);
    saveToLocalStorage(inventory);
    renderInventory();
}

// Função para editar um item
function editItem(index) {
    const inventory = getFromLocalStorage();
    const item = inventory[index];

    const newName = prompt('Digite o novo nome do item:', item.name);
    const newQuantity = prompt('Digite a nova quantidade:', item.quantity);

    if (newName && newQuantity) {
        item.name = newName;
        item.quantity = parseInt(newQuantity);
        saveToLocalStorage(inventory);
        renderInventory();
    }
}

// Inicializa a renderização do inventário
renderInventory();
