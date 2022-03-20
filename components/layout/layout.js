import { Fragment } from "react/cjs/react.production.min";
import Mainheader from "./main-header";

function Layout(props) {
  return (
    <Fragment>
      <Mainheader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
