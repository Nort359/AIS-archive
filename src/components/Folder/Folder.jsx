import React from 'react';

import './Folder.scss';

import Animation from '../../classes/Animation';

class Folder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowContent: false
        };

        this.openFolder = this.openFolder.bind(this);
    }

    openFolder() {
        console.log('Is`s DoubleClick baby');
        const contentStyle = document.querySelector('div.folder__content').style;
        const isShowContent = !this.state.isShowContent;
        const display = isShowContent ? 'block' : 'none';

        contentStyle.display = display;

        Animation.toggleAnimateElement(this.state.isShowContent, contentStyle, 'showScale', 'hideScale', '500ms');

        this.setState({ isShowContent });

    }

    render() {
        return (
            <div className='folder__container'>
                <div className='folder' onDoubleClick={ this.openFolder }>
                    <div className='folder__caption'>
                        <i className='folder__icon folder__icon_arrow glyphicon glyphicon-menu-right'></i>
                        <i className='folder__icon folder__icon_folder glyphicon glyphicon-folder-close'></i>
                        Документы по технике безопасности
                    </div>
                </div>
                <div className='folder__content'>
                    { this.props.children }
                </div>
            </div>
        );
    }

}

export default Folder;
