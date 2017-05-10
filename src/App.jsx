import React from 'react';

import Header from './components/Header/Header';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Header />
                { this.props.children }
            </div>
        );
    }

}

App.path = '/';

export default App;
