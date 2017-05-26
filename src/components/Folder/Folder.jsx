import React, { Component, PropTypes } from 'react';

import './Folder.scss';

import Animation from '../../classes/Animation';

class Folder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowContent: false
        };

        this.openFolder = this.openFolder.bind(this);
    }

    openFolder(event, id) {
        const contentStyle = document.querySelector(`#${id}`).style;
        const isShowContent = !this.state.isShowContent;
        const display = isShowContent ? 'block' : 'none';

        contentStyle.display = display;

        Animation.toggleAnimateElement(this.state.isShowContent, contentStyle, 'showScale', 'hideScale', '500ms');

        this.setState({ isShowContent });

    }

    render() {
        return (
            <div className='folder__container'>
                <div className='folder'>
                    <div className='folder__caption' onClick={ event => this.openFolder(event, this.props.folderId) }>
                        <i className='folder__icon folder__icon_arrow glyphicon glyphicon-menu-right'></i>
                        <i className='folder__icon folder__icon_folder glyphicon glyphicon-folder-close'></i>
                        { this.props.caption }
                    </div>
                </div>
                <div className='folder__content' id={ this.props.folderId }>
                    { this.props.children }
                </div>
            </div>
        );
    }

}

Folder.propTypes = {
    caption: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired
};

export default Folder;
