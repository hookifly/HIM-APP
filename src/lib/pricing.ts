export function getPrice(country: string) {
  switch (country) {
    case "US":
      return {
        amount: 4.99,
        currency: "$",
        code: "USD",
      };

    case "GB":
      return {
        amount: 3.99,
        currency: "£",
        code: "GBP",
      };

    case "DE":
    case "FR":
    case "IT":
      return {
        amount: 4.49,
        currency: "€",
        code: "EUR",
      };

    default:
      return {
        amount: 299,
        currency: "₹",
        code: "INR",
      };
  }
}