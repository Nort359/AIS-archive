import React from 'react';

import { Image } from 'react-bootstrap';

class ScreenWithDescription extends React.Component {

    render() {
        return (
            <div>
                <p className='help__text_above-picture'>
                    { this.props.textAbove }
                </p>
                <Image className='help__picture' src={ this.props.imagePath } thumbnail />
                <p className='help__text_signature-picture'>
                    { this.props.textSignature }
                </p>
                <p className='help__text_under-picture'>
                    { this.props.textUnder }
                </p>
                <hr/>
            </div>
        );
    }

}

ScreenWithDescription.propTypes = {
    textAbove: React.PropTypes.string,
    imagePath: React.PropTypes.string,
    textSignature: React.PropTypes.string,
    textUnder: React.PropTypes.string.isRequired
};

export default ScreenWithDescription;
