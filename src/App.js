import React, { Component } from 'react';
import './App.css';
import Head from './Head/Head';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Jobs from './Jobs/Jobs';
import Cities from './Cities/Cities';
import Other from './Other/Other';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter basename="/">
          <div>
            <Head />
            <Switch>
              <Route path="/" component={Jobs} exact/>
              <Route path="/city" component={Cities} exact/>
              <Route path="/other" component={Other}/>
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
