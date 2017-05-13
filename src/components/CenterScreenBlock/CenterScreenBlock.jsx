import React from 'react';

import './CenterScreenBlock.scss';

class CenterScreenBlock extends React.Component {

    render() {
        return (
            <main>
                <div className='center-screen-block__table' style={ { backgroundImage: `url(${this.props.bgImage})` } }>
                    <div className='center-screen-block__row'>
                        <div className='center-screen-block__cell'>
                            <div className='center-screen-block__center'>
                                { this.props.children }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

}

CenterScreenBlock.propTypes = {
    bgImage: React.PropTypes.string,
    children: React.PropTypes.any.isRequired
};

export default CenterScreenBlock;
