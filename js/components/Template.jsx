import React from 'react';

import { Header } from './Header.jsx';
import { WelcomeScreen } from './WelcomeScreen.jsx';
import { Footer } from './Footer.jsx';

export const Template = () => {
    return (
        <div className="main__wrapper">
            <Header />
            <WelcomeScreen />
            <Footer />
        </div>
    );
}
