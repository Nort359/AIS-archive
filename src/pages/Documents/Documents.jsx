import React from 'react';

import SideBar from '../../components/SideBar/SideBar';

class Documents extends React.Component {

    render() {
        return (
            <div className='container-fluid'>
                <div className="row-fluid">
                    <SideBar />
                </div>
            </div>
        );
    }

}

Documents.path = '/documents';

export default Documents;
