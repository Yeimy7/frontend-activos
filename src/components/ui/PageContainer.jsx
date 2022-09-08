import React, { useContext } from "react";
import sidebarContext from "../../context/sidebar/sidebarContext";

export const PageContainer = ({ children }) => {
  //Obtener el state de sidebar
  const sidebarsContext = useContext(sidebarContext);
  const { extended } = sidebarsContext;
  return (
    <section
      className={`page-section ${!extended ? "page-section-close" : ""}`}
    >
      <div className="page-content">{children}</div>
    </section>
  );
};
