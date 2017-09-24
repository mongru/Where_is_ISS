import React from 'react';
import ReactDOM from 'react-dom';

import FontAwesome from 'react-fontawesome';

import { LocalizerModal } from './LocalizerModal.jsx';


export class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lgShow: false
        }
    }

    render() {

        let lgClose = () => this.setState({lgShow: false});
        const { lgShow } = this.state;

        return (
            <section className="main">
                <div className="main__welcomeScreen">
                    <button className="main__welcomeScreen--btn" onClick={() => this.setState({lgShow: true})}>
                        <span className="main__welcomeScreen--icon">
                            <FontAwesome name='globe' size='2x'/>
                        </span>
                            Check
                    </button>
                    <LocalizerModal show={lgShow} onHide={lgClose}/>
                </div>
            </section>
        );
    }
}
