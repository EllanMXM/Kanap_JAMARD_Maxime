const getCart = () => {
    try {
      let cart = JSON.parse(localStorage.getItem('cart'));
  
      if (cart != null && Object.keys(cart).length) {
        return cart;
      }
  
      return {};
    } catch (error) {
      return {};
    }
  }