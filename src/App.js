import "./reset.css";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { Header } from "./components/Header";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [currentSale, setCurrentSale] = useState([]);
  const [search, setSearch] = useState("");
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios
        .get("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
        .catch((err) => console.log(err));

      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  function showProducts(event) {
    const searchTyped = event.target.value

    if (searchTyped) {
      const filterList = products.filter(
        ({ name, category }) =>
          name.toLowerCase().includes(searchTyped.toLowerCase()) ||
          category.toLowerCase().includes(searchTyped.toLowerCase())
      );

      if (filterList.length > 0) {
        setIsHome(false);
        setFilteredProducts(filterList);
      } else setFilteredProducts([]);
    } else {
      setFilteredProducts(null)
    }
  }

  function removeProductCart(event) {
    const removeId = Number(event.target.dataset.id); 
    const newSales = currentSale.filter(({ id }) => id !== removeId);

    setCurrentSale(newSales);
  }

  function handleClick(event) {
    const btnId = Number(event.target.dataset.id);
    const cartProduct = products.find(({ id }) => id === btnId);

    const checkCart = currentSale.find(({ id }) => id === btnId);

    if (checkCart) {
      const updateCurrentSale = currentSale.map((product) => {
        if (product.id === btnId) {
          if (product.quantity > 5) return { ...product, quantity: 5 };
          return { ...product, quantity: product.quantity + 1 };
        } else return product;
      });

      setCurrentSale(updateCurrentSale);
    } else {
      const newSale = { ...cartProduct, quantity: 1 };

      setCurrentSale([...currentSale, newSale]);
    }
  }

  function home() {
    setFilteredProducts(null);
    setIsHome(true);
    setSearch("")
  }

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        isHome={isHome}
        showProducts={showProducts}
        home={home}
      />

      <div className="main">
        <ProductList
          handleClick={handleClick}
          products={filteredProducts || products}
        />

        <Cart
          removeProductCart={removeProductCart}
          currentSale={currentSale}
          setCurrentSale={setCurrentSale}
        />
      </div>
    </div>
  );
}

export default App;
