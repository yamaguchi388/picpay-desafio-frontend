export const masks = {
  currency(inputValue: string): string {
    const value = inputValue
      .replace(/\D/g, "")
      .replace(/\b0+/g, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".");

    return "R$ " + value;
  },
};
