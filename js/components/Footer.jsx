import React from 'react';

import FontAwesome from 'react-fontawesome';

export const Footer = () => {
    return (
        <footer>
            <div className="footer__container">
                <span className="footer__container--txt">built with fun by &copy; Monika Grubizna</span>
                <span className="footer__container--icon">
                    <a href="https://github.com/mongru" target="_blank" title="check my github">
                        <FontAwesome name='github'/>
                    </a>
                </span>
            </div>
        </footer>
    );
}
