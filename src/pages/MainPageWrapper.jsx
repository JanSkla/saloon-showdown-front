import { useState } from "react";

const { Outlet } = require("react-router-dom")

const MainPageWrapper = () => {
  const [name, setName] = useState();

  return <Outlet context={[name, setName]}/>
}

export default MainPageWrapper;