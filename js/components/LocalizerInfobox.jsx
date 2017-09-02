import React from 'react';
import ReactDOM from 'react-dom';

import FontAwesome from 'react-fontawesome';


export class LocalizerInfobox extends React.Component {
    render() {
        return (
            <div className="localizer__infobox">
                {this.props.message}
                <span className="localizer__infobox--icon">
                    <FontAwesome name={this.props.name} size='2x'/>
                </span>
            </div>
        );
    }
}
