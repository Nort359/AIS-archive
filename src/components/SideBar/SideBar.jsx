import React, { Component, PropTypes } from 'react';

import './SideBar.scss';

import Animation from '../../classes/Animation';

class SideBar extends Component {

    constructor(props) {
        super(props);

        this.isOpenSideBar = this.props.isOpen;

        this.openSideBar = this.openSideBar.bind(this);
    }

    openSideBar() {
        const sideBar = document.querySelector('.sidebar').style;
        const captions = document.getElementsByClassName('sidebar__caption');

        Animation.toggleAnimateElement(this.isOpenSideBar, sideBar, 'slideRightSideBar', 'slideLeftSideBar', '500ms');

        let delay = this.isOpenSideBar ? 0 : 150;

        Array.prototype.forEach.call(captions, caption => {
            Animation.toggleAnimateElement(this.isOpenSideBar, caption.style, 'slideLeftSideBarElement', 'slideRightSideBarElement', '300ms', `${delay}ms`);
            delay += this.isOpenSideBar ? 0 : 150;
        });

        this.isOpenSideBar = !this.isOpenSideBar;
    }

    render() {
        return (
            <div className={ 'sidebar' }>
                <div className='sidebar__hamburger_container'>
                    <i
                        className='sidebar__hamburger_icon glyphicon glyphicon-menu-hamburger'
                        onClick={ this.props.onOpenSideBar }
                    ></i>
                </div>
                { this.props.children }
            </div>
        );
    }

}

SideBar.propTypes = {
    children: PropTypes.any.isRequired,
    isOpen: PropTypes.bool,
    onOpenSideBar: PropTypes.func.isRejected
};

export default SideBar;
