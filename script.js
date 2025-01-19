import { fetchProdutos, addProduto, deleteProduto } from './js/fake-api.js';



// Seleção de elementos
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productImageInput = document.getElementById('product-image');
const addProductButton = document.getElementById('add-product');
const clearFieldsButton = document.getElementById('clear-fields');
const meusProdutosSection = document.querySelector('.container-card');

// Função para criar um card de produto
function createProductCard(name, price, imageUrl, id) {
    // Criar elementos do card
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Imagem de ${name}`;

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-container--info';

    const productName = document.createElement('p');
    productName.textContent = name;

    const cardValue = document.createElement('div');
    cardValue.className = 'card-container--value';

    const productPrice = document.createElement('p');
    productPrice.textContent = `Preço: $${price}`;

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-symbols-outlined';
    deleteIcon.textContent = 'delete'; // Ícone do Google
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.addEventListener('click', async () => {
        try {
          await deleteProduto(id); // Remove o produto pelo ID
          card.remove();
        } catch (error) {
          console.error("Erro ao remover produto:", error);
        }
      });

    // Montar o card
    cardValue.appendChild(productPrice);
    cardValue.appendChild(deleteIcon);
    cardInfo.appendChild(productName);
    cardInfo.appendChild(cardValue);
    card.appendChild(img);
    card.appendChild(cardInfo);


    // Adicionar o card à seção
    meusProdutosSection.appendChild(card);
}

// Evento para adicionar produto
addProductButton.addEventListener('click', async () => {
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const imageUrl = productImageInput.value.trim();
  
    if (name && price && imageUrl) {
      const novoProduto = { nome: name, preco: price, image: imageUrl };
  
      try {
        const produtoAdicionado = await addProduto(novoProduto);
        createProductCard(produtoAdicionado.nome, produtoAdicionado.preco, produtoAdicionado.image);
        productNameInput.value = '';
        productPriceInput.value = '';
        productImageInput.value = '';
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });

// Evento para limpar campos
clearFieldsButton.addEventListener('click', () => {
    productNameInput.value = '';
    productPriceInput.value = '';
    productImageInput.value = '';
});

// exibir produtos
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const produtos = await fetchProdutos();
    produtos.forEach(produto => {
      createProductCard(produto.nome, produto.preco, produto.image, produto.id);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
});