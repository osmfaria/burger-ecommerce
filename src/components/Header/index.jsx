import "./style.css"
import { Button } from "../Button"


export const Header = ({search, setSearch, isHome, showProducts, home}) => {

    return (
        <header>
        <h1 className="logo">
          Burguer <span className="logo--side">Kenzie</span>
        </h1>

        <div className="search__box">
          <input
            className="search__input"
            type="text"
            value={search}
            placeholder="Digitar Pesquisa"
            onChange={(event) => {setSearch(event.target.value); showProducts(event)}}
          />
          <Button classBtn={isHome ? "" : "hidden"} onClick={showProducts}>
            Pesquisar
          </Button>
          <Button classBtn={isHome ? "hidden" : ""} onClick={home}>
            Voltar
          </Button>
        </div>
      </header>
    )
}

