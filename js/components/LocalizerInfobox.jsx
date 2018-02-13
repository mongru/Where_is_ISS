import React from 'react';
import ReactDOM from 'react-dom';

import FontAwesome from 'react-fontawesome';

export const LocalizerInfobox = ({ message, name }) => {
    return (
        <div className="localizer__infobox">
            {message}
            <span className="localizer__infobox--icon">
                <FontAwesome name={name} size='2x'/>
            </span>
        </div>
    );

}
