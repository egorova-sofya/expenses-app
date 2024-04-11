export const beautifyPrice = (price: number) => {
  return `$${parseFloat(Number(price).toFixed(2))}`;
};
