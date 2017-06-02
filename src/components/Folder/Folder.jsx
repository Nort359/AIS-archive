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
        const contentStyle = document.querySelector(`#${id} .folder__content`).style;
        const arrow = document.querySelector(`#${id} .folder__icon_arrow`);
        const folder = document.querySelector(`#${id} .folder__icon_folder`);
        const isShowContent = !this.state.isShowContent;
        const display = isShowContent ? 'block' : 'none';
        const arrowType = isShowContent ? 'glyphicon-menu-down' : 'glyphicon-menu-right';
        const folderType = isShowContent ? 'glyphicon-folder-open' : 'glyphicon-folder-close';
        const color = isShowContent ? '#00b5ff' : '#2B2B2B';

        arrow.classList.remove('glyphicon-menu-right');
        arrow.classList.remove('glyphicon-menu-down');

        folder.classList.remove('glyphicon-folder-close');
        folder.classList.remove('glyphicon-folder-open');

        arrow.classList.add(arrowType);
        folder.classList.add(folderType);

        arrow.style.color = color;
        folder.style.color = color;

        contentStyle.display = display;

        Animation.toggleAnimateElement(this.state.isShowContent, contentStyle, 'showScale', 'hideScale', '500ms');

        this.setState({ isShowContent });

    }

    render() {
        return (
            <div className='folder__container' id={ this.props.folderId }>
                <div className='folder'>
                    <div className='folder__caption' onClick={ event => this.openFolder(event, this.props.folderId) }>
                        <i className='folder__icon folder__icon_arrow glyphicon glyphicon-menu-right'></i>
                        <i className='folder__icon folder__icon_folder glyphicon glyphicon-folder-close'></i>
                        { this.props.caption }
                    </div>
                </div>
                <div className='folder__content'>
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
