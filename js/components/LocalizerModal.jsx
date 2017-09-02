import React from 'react';
import ReactDOM from 'react-dom';

import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

import {Localizer} from './Localizer.jsx';

export class LocalizerModal extends React.Component {
    render() {
        return (
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg" style={{
                marginTop: "24vh"
            }}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Aktualna lokalizacja stacji ISS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Localizer/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
