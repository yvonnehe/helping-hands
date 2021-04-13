import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <nav>
        <div>
          | <Link href="/">Home</Link> | <Link href="/om-oss">Om oss</Link> |{" "}
          <Link href="/vare-prosjekter">Våre prosjekter</Link>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Layout;
