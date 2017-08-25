import React from 'react';
import Invoice from './invoice.jsx';

export default class App extends React.Component {
    render () {
        return (
          <form>
              <div className="container">
                  <h1>Invoice</h1>
                  <Invoice />
              </div>
          </form>
        );
    }
}
