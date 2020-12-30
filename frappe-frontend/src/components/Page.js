import { useHistory } from "react-router-dom";

const Page = ({ children, activeTab, setActiveTab }) => {
  let history = useHistory();
  const handleTabClick = (url) => {
    setActiveTab(url);
    history.push(url);
  };
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-brand">Frappe</div>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              <li
                className={
                  "nav-item pointer" + (activeTab === "/" ? " active" : "")
                }
                onClick={() => handleTabClick("/")}
              >
                <div className="nav-link">
                  Home <span className="sr-only">(current)</span>
                </div>
              </li>
              <li
                className={
                  "nav-item pointer" +
                  (activeTab.startsWith("/product") ? " active" : "")
                }
                onClick={() => handleTabClick("/product")}
              >
                <div className="nav-link">Product</div>
              </li>
              <li
                className={
                  "nav-item pointer" +
                  (activeTab.startsWith("/location") ? " active" : "")
                }
                onClick={() => handleTabClick("/location")}
              >
                <div className="nav-link">Location</div>
              </li>
              <li
                className={
                  "nav-item pointer" +
                  (activeTab.startsWith("/movement") ? " active" : "")
                }
                onClick={() => handleTabClick("/movement")}
              >
                <div className="nav-link">Movements</div>
              </li>
              <li
                className={
                  "nav-item pointer" +
                  (activeTab.startsWith("/report") ? " active" : "")
                }
                onClick={() => handleTabClick("/report")}
              >
                <div className="nav-link">Report</div>
              </li>
            </ul>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
};

export default Page;
