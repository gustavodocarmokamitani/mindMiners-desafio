export function formatToBRL(value: number | string) {
  if (!value) return "";
  const numberValue = typeof value === "string" ? Number(value) : value;
  return (numberValue / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
