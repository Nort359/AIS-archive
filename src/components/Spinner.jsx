import React from 'react';

import './Spinner.scss';

export default class Name extends React.Component {

    render() {
        return (
            <div className='mk-spinner-wrap'>
                <div className='mk-spinner-ring'></div>
            </div>
        );
    }

}
