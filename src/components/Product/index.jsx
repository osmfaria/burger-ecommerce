import "./style.css";
import { Button } from "../Button";

export const Product = ({ product: { id, name, category, price, img }, handleClick }) => {
    
    const priceCurrency = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

    return (
    <div className="card">
      <div className="img__box">
        <img className="product__img" src={img} alt="imagem produto" />
      </div>

      <div className="info_box">
        <h2>{name}</h2>
        <h3>{category}</h3>
        <span>{priceCurrency}</span>
        <Button dataId={id} handleClick={handleClick}>Adicionar</Button>
      </div>
    </div>
  );
};
