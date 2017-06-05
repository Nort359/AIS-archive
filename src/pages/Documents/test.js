/**
 * Created by Nort3 on 04.06.2017.
 */
import React, { Component, PropTypes } from 'react';

class Test extends Component {

    render() {
        return (
            <div>
                <iframe
                    src="http://docs.google.com/viewer?url=prosvirkin-maksim-vasil_evich__8459249Просвиркин М.В. Отчёт по преддипломной практике.docx&amp;embedded=true"
                    frameborder="1"
                    width={ '100%' }
                    height={ '100%' }
                ></iframe>
            </div>
        );
    }

}

Test.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

Test.path = '/documents/test';

export default Test;
