import Link from "next/link";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div>
          <Link href="/">
            <Image
              src="/helping-hands-logo.svg"
              alt="Helping Hands logo"
              width=""
              height=""
            />
          </Link>{" "}
          | <Link href="/om-oss">Om oss</Link> |{" "}
          <Link href="/vare-prosjekter">Våre prosjekter</Link>
          <Link href="/fadderordning">Fadderordning</Link>
          <Link href="/hvordan-hjelpe">Hvordan hjelpe</Link>
          <Link href="/kontakt">Kontakt</Link>
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
