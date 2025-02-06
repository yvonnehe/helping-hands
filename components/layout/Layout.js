// import { AnalyticsWrapper } from '../Analytics';
import Link from "next/link";
import Image from "next/image";
import { Navbar, Nav, NavLink } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar bg="inherit" expand="lg" className="justify-content-between">
        <div className="container-fluid">
        <a 
            href="#main-content" 
            className="skip-to-main"
          >
            Hopp til hovedinnhold
        </a>
        <div className="navbar__logodiv">
          <Nav.Link href="/" className="nav-link next-img-fix">
            <Image
              src="/helping-hands-logo.svg"
              alt="Helping Hands logo"
              width="300"
              height="80"
              className="navbar__logo"
            />
            {/* <img
              src="/helping-hands-logo.svg"
              alt="Helping Hands logo"
              width="300px"
              height="80px"
              className="navbar__logo"
            /> */}
          </Nav.Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link className="navbar__link" href="/om-oss">
              Om oss
            </Nav.Link>
            <Nav.Link className="navbar__link" href="/vare-prosjekter">
              Våre prosjekter
            </Nav.Link>
            <Nav.Link className="navbar__link" href="/fadderordning">
              Fadderordning
            </Nav.Link>
            <Nav.Link className="navbar__link" href="/hvordan-hjelpe">
              Hvordan hjelpe
            </Nav.Link>
            <Nav.Link className="navbar__link" href="/kontakt">
              Kontakt
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>
      <main id="main-content" tabIndex="-1">
        {children}
        {/* <AnalyticsWrapper /> */}
      </main>
      <footer>
        <div className="footerdiv--color">
        <div className="container-fluid">
        <div className="footerdiv footerdiv2">
          <div>
            <div className="juks-margin">
              <Link className="kontaktlink footer-heading" href="/kontakt">
                Kontakt oss
              </Link>
            </div>
            <p className="footer-p">info@helpinghands.no</p>
            <p className="footer-p">Org.nr: 915922058</p>
          </div>
          <div>
            <p className="footer-p footer-heading">Gi nå</p>
            <p className="footer-p">Kontonummer: 1503 75 77968</p>
            <p className="footer-p">Vipps: 13947</p>
          </div>
          <div>
            <p className="footer-p footer-heading">Følg oss</p>
            <div>
              <a
                className="iconlink"
                href="https://www.facebook.com/helpinghandsno"
              >
                <img className="icon" src="fb_white.svg" alt="Facebook icon" />
                Facebook
              </a>
            </div>
            <div>
              <a
                className="iconlink"
                href="https://www.instagram.com/helpinghandsno/"
              >
                <img className="icon" src="ig_white.svg" alt="Instagram icon" />
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div className="footerdiv">
          <div className="innsamlingskontrollen-div">
            <img className="innsamlingskontrollen-img" src="ik-stempel-hvit-alpha.png" alt="Innsamlingskontrollen" />
            <p>Medlem av Innsamlingskontrollen</p>
          </div>
          <p className="copyright">© Yvonne Helland 2021</p>
        </div>
        </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
