import React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import DevTools from './utils/DevTools';

import { getUserFromSession } from './actions';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.props.getUserSession();
    }

    render() {

        return (
            <div>
                <Header />
                { this.props.children }
                /*<DevTools/>*/
            </div>
        );
    }

}

App.path = '/';

export default connect(
    state => ({
        userData: state.userData
    }),
    dispatch => ({
        getUserSession: () => {
            dispatch(getUserFromSession());
        }
    })
)(App);
