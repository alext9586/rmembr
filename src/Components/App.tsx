import * as React from 'react';
import SimpleCard from './SimpleCard/SimpleCard';
import AddNodeContainer from './AddNode/AddNodeContainer';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

export default class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <div className="container">
                    <SimpleCard title="Example Card">
                        The quick brown fox jumps over the lazy dog.
                    </SimpleCard>

                    <AddNodeContainer />

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
