export async function fetchStockList() {
  const baseURL = import.meta.env.VITE_BRAPI_API_URL || "/api/brapi";
  const url = `${baseURL}/quote/list`;

  try {
    const response = await fetch(url, {
      headers: import.meta.env.VITE_BRAPI_API_KEY
        ? {
            Authorization: `Bearer ${import.meta.env.VITE_BRAPI_API_KEY}`,
          }
        : {},
    });

    if (!response.ok) throw new Error("Erro na requisição");

    const data = await response.json();
    return data.stocks || [];
  } catch (error) {
    console.error("Erro ao buscar lista de ações:", error);
    return [];
  }
}
