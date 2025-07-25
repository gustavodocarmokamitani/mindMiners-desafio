export async function fetchStockList() {
  const url = `/api/brapi/quote/list`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro na requisição");

    const data = await response.json();
    return data.stocks || [];
  } catch (error) {
    console.error("Erro ao buscar lista de ações:", error);
    return [];
  }
}
