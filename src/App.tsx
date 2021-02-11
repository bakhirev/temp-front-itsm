import React from 'react';
import MainPage from "./pages/MainPage/index";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/">
                    <MainPage/>
                </Route>
                <Route path="/about">
                    <MainPage/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
