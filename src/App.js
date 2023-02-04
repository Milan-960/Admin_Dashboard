import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import { Dashboard } from "./pages/dashboard";
import { NewUser } from "./pages/add-user";
import { EditUser } from "./pages/edit-user";

import "./styles/styles.css";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-user" element={<NewUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
