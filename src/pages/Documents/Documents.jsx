import React from 'react';

import SideBar from '../../components/SideBar/SideBar';
import Folder from '../../components/Folder/Folder';
import Document from '../../components/Document/Document';

import './Documents.scss';

class Documents extends React.Component {

    render() {
        return (
            <div>
                <h2 className='documents__header'>Мои документы</h2>
                <Folder>
                    <Document/>
                </Folder>
                <SideBar />
            </div>
        );
    }

}

Documents.path = '/documents';

export default Documents;
