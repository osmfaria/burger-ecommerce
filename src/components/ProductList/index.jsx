import "./style.css";
import { Product } from "../Product";

export const ProductList = ({ products, handleClick }) => {
  return (
    <div className="showcase">
      {products && products.map(product => (
          <Product handleClick={handleClick} key={product.id} product={product}/>
      ))}
    </div>
  );
};
