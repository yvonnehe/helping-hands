import Link from "next/link";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div class="navbar">
          <Link class="navbar__logo" href="/">
            <Image
              src="/helping-hands-logo.svg"
              alt="Helping Hands logo"
              width="370px"
              height="105px"
            />
          </Link>{" "}
          <div class="navbar__links">
            <Link href="/om-oss">Om oss</Link>
            <Link href="/vare-prosjekter">Våre prosjekter</Link>
            <Link href="/fadderordning">Fadderordning</Link>
            <Link href="/hvordan-hjelpe">Hvordan hjelpe</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>
      </nav>
      {children}

      <footer>
        <div class="footerdiv">
          <div>
            <img class="icon" src="fb_white.svg" alt="Facebook icon" />
            <img class="icon" src="ig_white.svg" alt="Instagram icon" />
          </div>
          <Link href="/kontakt">Kontakt</Link>
          <p>© Yvonne Helland 2021</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
