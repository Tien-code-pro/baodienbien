import dynamic from "next/dynamic";

const FooterView = dynamic(() => import("./footer-view"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Footer = () => {
  return <FooterView />;
};

export default Footer;
