import { useState } from "react";
import { Route, useLocation } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";
import Welcome from "./pages/Welcome";
import ProductList from "./pages/ProductList";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import LocationList from "./pages/LocationList";
import NewLocation from "./pages/NewLocation";
import EditLocation from "./pages/EditLocation";
import ProductMovementList from "./pages/ProductMovementList";
import NewMovement from "./pages/NewMovement";
import EditMovement from "./pages/EditMovement";
import NotFound from "./pages/NotFound";
import Report from "./pages/Report";

function App() {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(pathname);
  return (
    <Page activeTab={activeTab} setActiveTab={setActiveTab}>
      <Route exact path={"/"} component={Welcome} />

      <Route exact path={"/product"} component={ProductList} />

      <Route path={"/product/new"} component={NewProduct} />

      <Route path={"/product/edit/:id"} component={EditProduct} />

      <Route exact path={"/location"} component={LocationList} />

      <Route path={"/location/new"} component={NewLocation} />

      <Route path={"/location/edit/:id"} component={EditLocation} />

      <Route exact path={"/movement"} component={ProductMovementList} />

      <Route path={"/movement/new"} component={NewMovement} />

      <Route path={"/movement/edit/:id"} component={EditMovement} />

      <Route exact path={"/report"} component={Report} />

      <Route path={"/notfound"} component={NotFound} />
    </Page>
  );
}

export default App;
