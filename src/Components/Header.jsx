import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-info">
      <Container className="d-flex p-5 gap-5">
        <Link to="/" className="text-decoration-none fs-3 text-dark fw-bold">
          Users
        </Link>
        <Link
          to="/product"
          className="text-decoration-none fs-3 text-dark fw-bold"
        >
          Product
        </Link>
      </Container>
    </header>
  );
};

export default Header;
