import "./style.css";
import { useState, useEffect } from "react";
import { Button } from "../Button";

export const Cart = ({ currentSale, setCurrentSale, removeProductCart }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    function calculateTotal() {
      const total =
        currentSale &&
        currentSale.reduce(
          (total, { price, quantity }) => total + price * quantity,
          0
        );
      const formatTotal = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      setCartTotal(formatTotal);
    }

    calculateTotal();
  }, [currentSale]);

  function editQuantity(event) {
    const productId = Number(event.target.dataset.id);
    const productQuantity = Number(event.target.value);

    const updateSale = currentSale.map((product) => {
      if (product.id === productId)
        return { ...product, quantity: Math.floor(productQuantity) };
      else return product;
    });

    setCurrentSale(updateSale);
  }

  function removeAllProducts() {
    setCurrentSale([]);
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h2>Cart</h2>
      </div>

      {currentSale.length > 0 ? (
        <div className="products__cart">
          <div className="products__section">
            {currentSale &&
              currentSale.map(({ name, category, img, id, quantity }) => (
                <div key={id} className="cart__card">
                  <div className="cart__img">
                    <img src={img} alt="product" />
                  </div>
                  <div className="cart__info">
                    <h2>{name}</h2>
                    <h3>{category}</h3>
                  </div>
                  <span
                    data-id={id}
                    onClick={removeProductCart}
                    className="delete__item"
                  >
                    Remove
                  </span>
                  <span className="quantity__label">Qty: </span>
                  <input
                    className="item__quantity"
                    value={quantity}
                    type="number"
                    min="1"
                    max="5"
                    step="1"
                    data-id={id}
                    onChange={(event) => editQuantity(event)}
                  />
                </div>
              ))}
          </div>
          <div className="separator"></div>
          <div className="total__box">
            <div className="total__info">
              <p>Total</p>
              <span className="total__price">{cartTotal}</span>
            </div>
            <Button onClick={removeAllProducts}>Remove all</Button>
          </div>
        </div>

      ) : (

        <div className="empty__cart">
          <h2>Your cart is empty</h2>
          <span>Add items</span>
        </div>
      )}

    </div>
  );
};
