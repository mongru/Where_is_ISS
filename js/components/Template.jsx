import React from 'react';
import ReactDOM from 'react-dom';

import {Header} from './Header.jsx';
import {WelcomeScreen} from './WelcomeScreen.jsx';
import {Footer} from './Footer.jsx';

export class Template extends React.Component {
    render() {
        return (
            <div className="main__wrapper">
                <Header />
                <WelcomeScreen />
                <Footer />
            </div>
        );
    }
}
