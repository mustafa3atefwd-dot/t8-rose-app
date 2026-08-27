const FormatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  export default FormatPrice
  