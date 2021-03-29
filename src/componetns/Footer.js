const Footer = () => {
  const date = new Date();
  return (
    <footer className="footer page__section">
      <p className="footer__text page__font page__font_weight_normal">
        &copy; {date.getFullYear()} Mesto Russia
      </p>
    </footer>
  );
};

export default Footer;
