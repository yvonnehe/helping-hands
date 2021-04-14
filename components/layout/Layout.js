import Link from "next/link";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div class="navbar">
          <Link class="navbar__link" href="/">
            <Image
              src="/helping-hands-logo.svg"
              alt="Helping Hands logo"
              width=""
              height=""
            />
          </Link>{" "}
          |{" "}
          <Link class="navbar__link" href="/om-oss">
            Om oss
          </Link>{" "}
          |{" "}
          <Link class="navbar__link" href="/vare-prosjekter">
            Våre prosjekter
          </Link>
          <Link class="navbar__link" href="/fadderordning">
            Fadderordning
          </Link>
          <Link class="navbar__link" href="/hvordan-hjelpe">
            Hvordan hjelpe
          </Link>
          <Link class="navbar__link" href="/kontakt">
            Kontakt
          </Link>
        </div>
      </nav>
      {children}

      <footer>
        <img src="fb_white.svg" alt="Facebook icon" />
        <img src="ig_white.svg" alt="Instagram icon" />
        <Link href="/kontakt">Kontakt</Link>
        <p>© Yvonne Helland 2021</p>
      </footer>
    </>
  );
};

export default Layout;
