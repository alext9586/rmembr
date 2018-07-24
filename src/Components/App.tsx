import * as React from 'react';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import MainContainer from './Main/MainContainer';

export default class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <div className="container">
                    <MainContainer />

                    {/* <Router>
                        <div>
                            <Route exact path="/" component={IndexPageContainer} />
                            <Route path="/admin" component={AdminPageContainer} />
                            <Route path="/arrivals" component={ArrivalsPageContainer} />
                            <Route path="/about" component={AboutPageContainer} />
                        </div>
                    </Router> */}
                </div>
            </div>
        );
    }
}
