import React, { Component } from 'react';
import HelpForm from '../Support/HelpForm';
import Confirmation from './Confirmation';
import '../../css/modal_animation.css';

class ModalHelp extends Component {

    state = {
        formAccepted: false,
    }

    closeModal = () => {
        const form = document.querySelector('.form-section');

        form.classList.remove('bounceIn');
        form.classList.add('bounceOut');

        setTimeout(() => {
            form.parentNode.style.display = "none";
            this.props.closeModal();
        }, 750);
    }

    accepted = () => {
        this.setState({ formAccepted: true });
    }

    render() {
        return (

            <div className="form-container">
                <section className="form-section animated bounceIn">
                    <span className="closeForm" onClick={this.closeModal}></span>
                    <h2 className="form-section__title">{this.state.formAccepted ? 'Thank You for contacting us' : 'Send us a message'}</h2>

                    {this.state.formAccepted ? <Confirmation children="Thank you, email has beed sent." /> : <HelpForm formAccepted={this.accepted} />}

                </section>
            </div >

        );
    }
}

export default ModalHelp;