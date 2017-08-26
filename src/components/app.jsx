import React from 'react';
import Invoice from './invoice.jsx';

export default class App extends React.Component {
    render () {
        return (
          <form>
              <div className="container">
                  <h3>Invoice</h3>
                  <Invoice />
              </div>
          </form>
        );
    }
}
