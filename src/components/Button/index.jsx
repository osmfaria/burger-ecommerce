import "./style.css";

export const Button = ({ children, onClick, handleClick, dataId, classBtn }) => {
  return <button data-id={dataId} className={"button__standard " + classBtn} onClick={onClick} onMouseDown={handleClick}>{children}</button>;
};
