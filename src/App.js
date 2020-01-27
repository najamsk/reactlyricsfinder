import React from 'react';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import './App.css';

function App() {
    return (
        <Router>
            <React.Fragment>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Index} />
                    </Switch>
                </div>
            </React.Fragment>
        </Router>
  );
}

export default App;
