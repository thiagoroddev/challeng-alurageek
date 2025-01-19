const baseUrl = "http://localhost:3000/produtos";

/**
 * Função para buscar os produtos do servidor fake.
 * @returns {Promise<Array>} Lista de produtos.
 */
async function fetchProdutos() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const produtos = await response.json();
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

/**
 * Função para adicionar um novo produto ao servidor fake.
 * @param {Object} produto Objeto com os dados do produto.
 * @returns {Promise<Object>} Produto adicionado.
 */
async function addProduto(produto) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar produto: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
}

/**
 * Função para remover um produto do servidor fake.
 * @param {number} id ID do produto a ser removido.
 * @returns {Promise<void>}
 */
async function deleteProduto(id) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao remover produto: ${response.status}`);
    }
  } catch (error) {
    console.error("Erro ao remover produto:", error);
    throw error;
  }
}

// Exportar as funções
export { fetchProdutos, addProduto, deleteProduto };

