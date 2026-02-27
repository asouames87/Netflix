import { useState } from 'react';

function CartButton() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const cartCount = cartItems.length;


  const removeFromCart = (movieId) => {
    setCartItems(cartItems.filter(item => item.id !== movieId));
  };

  const toggleShow = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative flex">
      <button 
        onClick={toggleShow}
        className="relative hover:text-gray-300 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {showCart && cartItems.length > 0 && (
        <div className="absolute right-0 mt-8 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-50">
          <h3 className="font-bold mb-2 text-white">Votre panier</h3>
          <ul className="space-y-2">
            {cartItems.map(item => (
              <li 
                key={item.id} 
                className="flex justify-between items-center p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                onDoubleClick={() => removeFromCart(item.id)}
              >
                <div className="flex items-center space-x-2">
                  <img 
                    src={item.poster} 
                    alt={item.title}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span className="text-sm text-gray-200">{item.title}</span>
                </div>
                <span className="text-sm text-primary font-bold">{item.price}€</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-2 border-t border-gray-700">
            <div className="flex justify-between text-white font-bold">
              <span>Total</span>
              <span className="text-primary">
                {cartItems.reduce((total, item) => total + (item.price || 0), 0)}€
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartButton;