import React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import DevTools from './utils/DevTools';

import { getUserFromSession } from './actions';
import { getDepartment } from './pages/AdminPanel/AddDepartment/actions';
import { getPosition } from './pages/AdminPanel/AddPosition/actions';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.props.getUserSession();
        this.props.getDepartmentDB();
        this.props.getPositionDB();
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

export default connect(
    state => ({
        userData: state.userData,
        department: state.department,
        position: state.position
    }),
    dispatch => ({
        getUserSession: () => {
            dispatch(getUserFromSession());
        },
        getDepartmentDB: () => {
            dispatch(getDepartment());
        },
        getPositionDB: () => {
            dispatch(getPosition());
        }
    })
)(App);
