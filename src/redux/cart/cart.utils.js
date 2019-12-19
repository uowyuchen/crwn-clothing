// 1.比较要添加进来的cartItemToAdd在本来的cartItems中有没有
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // 2.如果existingCartItem是true，就说明购物车🛒里已经有要添加的东西
  // 注意：这里是比较上图👆的粉色的部分！！！！！！
  const existingCartItem = cartItems.find(cartItem => {
    return cartItem.id === cartItemToAdd.id;
  });
  // 3.existingCartItem是true，就需要改变粉色框中的quantity！！！！！！
  if (existingCartItem) {
    // 3.1如果添加进来的东西在购物车中本来就有
    //注意：cartItems是购物车🛒这个数组，里面的元素是cartItem这个object
    //注意：第一个return返回的是一个新的array
    //     第二个return返回的是一个object，在第一个return返回的array中
    //     如：[{ ... }]
    return cartItems.map(cartItem => {
      return cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  // 4.existingCartItem是false,说明添加进来的东西在本来的购物车🛒中没有
  // 那么就返回一个array，里面放本来的购物车中的所有的东西...cartItems,和
  // 新加进来的那个item（其是一个object），以及初始的数量1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
