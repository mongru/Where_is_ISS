import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/main.scss';

import {Template} from './components/Template.jsx';


class App extends React.Component {
    render() {
        return (
                <Template />
            );
    }
}

document.addEventListener('DOMContentLoaded', function() {

    console.log('Halo Kosmos z app.jsx');

    ReactDOM.render ((
        <App />
    ), document.getElementById('root')
    );
});
