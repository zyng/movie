import React, { Component } from 'react';


class HelpForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        text: '',

        valid_firstName: true,
        valid_lastName: true,
        valid_email: true,
        valid_subject: true,
        valid_text: true,

        acceptable: false,
    }
    subjects = ['problem with account', 'problem with adding movie', 'problem with collection', 'problem with finding movie', 'deleted history', 'other']
    messages = {
        firstName: 'first name',
        lastName: 'last name',
        email: 'address email',
        subject: 'subject',
        text: 'message'
    }
    errorMessage = {
        required: 'required',
        inputMinChar: 'minimum 3 characters',
        textMinChar: 'minimum 10 characters',
        email: 'invalid email format'
    }

    active = (e, input) => {
        const placeholder = input ? input.previousSibling : e.target.previousSibling;
        const value = input ? input.value : e.target.value;

        if (!value && placeholder.classList.contains('active')) {
            placeholder.classList.remove('active')
        } else {
            placeholder.classList.add('active');
        }
    }

    activeInput = (e) => {
        const input = e.target.nextSibling;
        input.focus();
    }

    handleChange = (e) => {
        const input = e.target;
        const name = input.name;
        const value = input.value;

        let verify = this.checkInputs(input);

        this.setState({
            [name]: value,
            [`valid_${name}`]: verify
        });
    }

    checkInputs = (input) => {
        let verify;
        const value = input.value;
        const name = input.name;
        const valueLength = value.length;

        if (((name === 'firstName' || name === 'lastName') && valueLength >= 3) || (name === 'subject' && value) || (name === 'text' && valueLength >= 10) || (name === 'email' && this.validateEmail(value))) {
            verify = true;
            input.classList.remove('error');
            input.classList.add('success');
        }
        else {
            verify = false
            input.classList.remove('success');
            input.classList.add('error');
        }

        return verify
    }

    validateEmail(email) {
        var regExEmail = /\S+@\S+\.\S+/;
        return regExEmail.test(email);
    }

    checkValidation = () => {
        let firstName, lastName, email, subject, text, acceptable;
        firstName = lastName = email = subject = text = acceptable = false;

        if (this.state.firstName.length >= 3)
            firstName = true;
        if (this.state.lastName.length >= 3)
            lastName = true;
        if (this.state.subject)
            subject = true
        if (this.state.text.length >= 10)
            text = true
        if (this.validateEmail(this.state.email))
            email = true;

        if (firstName && lastName && email && subject && text)
            acceptable = true

        return { firstName, lastName, email, subject, text, acceptable }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const validation = this.checkValidation();
        const inputs = [...document.querySelectorAll('.help-form input, .help-form textarea, .help-form select')]

        if (validation.acceptable) {
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                text: '',
                acceptable: true,
                valid_firstName: true,
                valid_lastName: true,
                valid_email: true,
                valid_subject: true,
                valid_text: true

            });
            // inputs.forEach(input => { input.value = ''; this.active(e, input); input.className = '' });
            document.querySelector('form.help-form').classList.add('fadeOut');
            setTimeout(() => {
                this.props.formAccepted();
            }, 1000);

        } else {
            this.setState({
                valid_firstName: validation.firstName,
                valid_lastName: validation.lastName,
                valid_email: validation.email,
                valid_subject: validation.subject,
                valid_text: validation.text
            });
            inputs.forEach(input => this.checkInputs(input))
        }
    }

    render() {
        const { valid_firstName, valid_email, valid_lastName, valid_subject, valid_text } = this.state;
        const subjects = this.subjects.map((subject, index) => <option key={index} value={index}>{subject}</option>)

        return (
            <form action="" className="help-form animated" noValidate>

                <div className="help-form__personal-data">
                    <label htmlFor="" className="personal-data__user_name">
                        <span onClick={(e) => this.activeInput(e)}>{valid_firstName ? this.messages.firstName : this.errorMessage.inputMinChar}</span>
                        <input name="firstName" type="text" onChange={(e) => this.handleChange(e)} onFocus={(e) => this.active(e)} onBlur={(e) => this.active(e)} />
                    </label>


                    <label htmlFor="" className="personal-data__user_name">
                        <span onClick={(e) => this.activeInput(e)}>{valid_lastName ? this.messages.lastName : this.errorMessage.inputMinChar}</span>
                        <input name="lastName" type="text" onChange={(e) => this.handleChange(e)} onFocus={(e) => this.active(e)} onBlur={(e) => this.active(e)} />
                    </label>
                </div>


                <label htmlFor="">
                    <span onClick={(e) => this.activeInput(e)}>{valid_email ? this.messages.email : this.errorMessage.email}</span>
                    <input name="email" type="email" onChange={(e) => this.handleChange(e)} onFocus={(e) => this.active(e)} onBlur={(e) => this.active(e)} />
                </label>

                <label htmlFor="">
                    <span onClick={(e) => this.activeInput(e)}>{valid_subject ? this.messages.subject : this.errorMessage.required}</span>
                    <select name="subject" defaultValue="" onChange={(e) => this.handleChange(e)} onFocus={(e) => this.active(e)} onBlur={(e) => this.active(e)}>
                        <option value="" disabled></option>
                        {subjects}
                    </select>
                </label>

                <label htmlFor="">
                    <span onClick={(e) => this.activeInput(e)}>{valid_text ? this.messages.text : this.errorMessage.textMinChar}</span>
                    <textarea name="text" cols="30" rows="10" onChange={(e) => this.handleChange(e)} onFocus={(e) => this.active(e)} onBlur={(e) => this.active(e)}></textarea>
                </label>

                <button type="submit" className="sendMessage" onClick={(e) => this.handleSubmit(e)}>Send <i className="fa fa-location-arrow"></i></button>
            </form>
        );
    }
}

export default HelpForm;