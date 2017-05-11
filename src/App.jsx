import React from 'react';

import Header from './components/Header/Header';
import DevTools from './utils/DevTools';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Header />
                { this.props.children }
                <DevTools/>
            </div>
        );
    }

}

App.path = '/';

export default App;
