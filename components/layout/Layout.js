import Link from "next/link";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div className="navbar">
          <Link href="/">
            <Image
              src="/helping-hands-logo.svg"
              alt="Helping Hands logo"
              width="300px"
              height="80px"
              className="navbar__logo"
            />
          </Link>{" "}
          <div className="navbar__links">
            <Link className="navbar__link" href="/om-oss">
              Om oss
            </Link>
            <Link className="navbar__link" href="/vare-prosjekter">
              Våre prosjekter
            </Link>
            <Link className="navbar__link" href="/fadderordning">
              Fadderordning
            </Link>
            <Link className="navbar__link" href="/hvordan-hjelpe">
              Hvordan hjelpe
            </Link>
            <Link className="navbar__link" href="/kontakt">
              Kontakt
            </Link>
          </div>
        </div>
      </nav>
      {children}

      <footer>
        <div className="footerdiv">
          <div>
            <a
              className="iconlink"
              href="https://www.facebook.com/helpinghandsno"
            >
              <img className="icon" src="fb_white.svg" alt="Facebook icon" />
            </a>
            <a
              className="iconlink"
              href="https://www.instagram.com/helpinghandsno/"
            >
              <img className="icon" src="ig_white.svg" alt="Instagram icon" />
            </a>
          </div>
          <Link className="kontaktlink" href="/kontakt">
            Kontakt
          </Link>
          <p>© Yvonne Helland 2021</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
