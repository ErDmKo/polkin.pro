import ReactDOM from 'react-dom';
import React from 'react';
import { CommentForm, ValidationErros } from './smallfeedback.js';


class BigForm extends CommentForm {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            phone: '',
            email: '',
            comment: '',
            success: false,
            errors: {
                first_name: [],
                phone: [],
                email: [],
                comment: [],
            }
        }
        this.handleStateKey = this.handleStateKey.bind(this);
    }
    handleStateKey(key) {
        return (e) => {
            console.log(key);
            this.setState({
                [key]: e.target.value
            })
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let first_name = this.state.first_name.trim();
        let comment = this.state.comment.trim();
        let phone = this.state.phone.trim();
        let email = this.state.email.trim();
        this.handleCommentSubmit(
            CONFIG.urls.feedback, {
                first_name: first_name,
                email: email,
                comment: comment,
                phone: phone,
            }
        )
    }
    render() {
        if (!this.state.success) {
            return (
                <form onSubmit={this.handleSubmit} className="wpcf7-form">
                    <div className="row-fluid">
                        <div className="span4 field">
                            <span className="wpcf7-form-control-wrap your-name">
                                <input
                                    type="text"
                                    name="your-name"
                                    value={this.state.first_name}
                                    onChange={this.handleStateKey('first_name')}
                                    size="40"
                                    className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                    aria-required="true"
                                    aria-invalid="false"
                                    placeholder="Ваше имя:"/>
                            </span>
                            <ValidationErros errors={this.state.errors.first_name}/>
                        </div>
                        <div
                            className="span4 field">
                            <span
                                className="wpcf7-form-control-wrap your-email">
                                <input
                                    type="email"
                                    name="your-email"
                                    value={this.state.email}
                                    onChange={this.handleStateKey('email')}
                                    size="40"
                                    className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email" 
                                    aria-required="true"
                                    aria-invalid="false"
                                    placeholder="E-mail:"/>
                            </span>
                            <ValidationErros errors={this.state.errors.email}/>
                        </div>
                        <div className="span4 field">
                            <span
                                className="wpcf7-form-control-wrap your-phone">
                                <input
                                    type="tel"
                                    name="your-phone"
                                    value={this.state.phone}
                                    onChange={this.handleStateKey('phone')}
                                    size="40"
                                    className="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validates-as-tel" 
                                    aria-required="true"
                                    aria-invalid="false"
                                    placeholder="Телефон:"/>
                            </span>
                            <ValidationErros errors={this.state.errors.phone}/>
                        </div>
                    </div>
                    <div className="field">
                        <span
                            className="wpcf7-form-control-wrap your-message">
                            <textarea
                                name="your-message"
                                cols="40"
                                value={this.state.comment}
                                onChange={this.handleStateKey('comment')}
                                rows="10"
                                className="wpcf7-form-control wpcf7-textarea" 
                                aria-invalid="false"
                                placeholder="Сообщение:"></textarea>
                        </span>
                        <ValidationErros errors={this.state.errors.comment}/>
                    </div>
                    <p
                        className="submit-wrap">
                        <input
                            type="reset"
                            value="Очистить"
                            className="btn btn-primary"/>
                        <input
                            type="submit"
                            value="Отправить"
                            className="wpcf7-form-control wpcf7-submit btn btn-primary"/>
                    </p>
                </form>
            )
        } else {
            return (
                <div className="form_success">
                    Большое спасибо! Ваше обращение скоро будет рассмотренно
                </div>
            )
        }
    }
}
let contanier = document.getElementById('contactsForm');
if (contanier) {
    ReactDOM.render(
        <BigForm />,
        contanier    
    )
}
