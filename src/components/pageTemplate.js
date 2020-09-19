import React from "react";
import { useRouteMatch } from "react-router-dom";

const generatePage = (page) => {
  const component = () => require(`./../pages/${page}`).default;

  // try {
  return React.createElement(component());
  // } catch (err) {
  //   console.log(err);
  //   return React.createElement(() => 404);
  // }
};

function PageTemplate() {
  const {
    params: { page },
  } = useRouteMatch();

  return generatePage(page);
}

export default PageTemplate;
