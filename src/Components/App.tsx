import * as React from 'react';
import Button from '@material-ui/core/Button';
import SimpleCard from './Card/Card';
//import Card from './Card/Card';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

export default class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <div className="container">
                    <h1>Hello World</h1>
                    <Button variant="contained" color="primary">
                        Hello World
                    </Button>
                    <SimpleCard title="Node 1">
                        <h1>Yay!</h1>
                    </SimpleCard>
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
