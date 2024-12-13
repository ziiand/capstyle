import React from "react";
import UserRouter from "./router/UserRouter";

import Header from "./components/user/Header";
import Footer from "./components/user/Footer";

function App() {
  return (
    <>
      <Header />

      <UserRouter />

      <Footer />
    </>
  );
}

export default App;
