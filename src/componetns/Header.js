import logo from "../images/logo.svg";

const Header = () => {
  return (
    <header className="header page__section">
      <img className="header__logo" src={logo} alt="Логотип Место." />
    </header>
  );
};

export default Header;
