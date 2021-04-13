import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div>
          | <Link href="/">Home</Link> | <Link href="/om-oss">Om oss</Link> |{" "}
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
      </footer>
    </>
  );
};

export default Layout;
