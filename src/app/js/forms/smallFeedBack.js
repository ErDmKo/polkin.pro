import React from 'react';
import ReactDOM from 'react-dom';
//import { ValidationErros } from './smallfeedback.js';


export class ValidationErros extends React.Component {
    render() {
        return <div className="errors">{this.props.errors.map((info, i) => {
            return <span key={i} className="formError">{info}</span>
        })}</div>
    }
}

export class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            comment: '',
            errors: {
                first_name: [],
                comment: []
            }
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({first_name: e.target.value});
    }
    handleTextChange(e) {
        this.setState({comment: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var first_name = this.state.first_name.trim();
        var comment = this.state.comment.trim();
        this.handleCommentSubmit(
            CONFIG.urls.smallfeedback, {
            first_name: first_name,
            comment: comment
        });
    }
    handleCommentSubmit(url, comment) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState(Object.keys(comment).reduce((dict, key)=>{
                    dict[key] = '';
                    return dict;
                }, {}))
                this.setState({
                    success: true
                })
            },
            error: (xhr, status, err) => {
                this.setState({
                    errors: Object.assign(this.state.errors, xhr.responseJSON)
                })
                console.error(url, status, err.toString());
            }
        });
    }
    render() {
        if (!this.state.success) {
            return (
            <form onSubmit={this.handleSubmit} className="main-holder wpcf7">
                <h2>Оставить отзыв</h2>
                <input 
                    style={{width: '100%' }}
                    placeholder="Ваше имя"
                    className=""
                    value={this.state.first_name}
                    onChange={this.handleAuthorChange}
                    type="text"/>
                <ValidationErros errors={this.state.errors.first_name}/>
                <textarea 
                    style={{width: '100%' }}
                    className=""
                    value={this.state.comment}
                    onChange={this.handleTextChange}
                    placeholder="Отзыв"></textarea>
                <ValidationErros errors={this.state.errors.comment}/>
                <div
                    className="submit-wrap">
                    <input
                        type="reset"
                        value="Очистить"
                        className="btn btn-primary"></input>
                    <input 
                        type="submit"
                        value="Отправить"
                        className="wpcf7-form-control wpcf7-submit btn btn-primary"></input>
                 </div>
            </form>
            )
        } else {
            return (
                <h2 className="text-center form_success">
                    Большое спасибо! Ваш отзыв будет опубликован в ближайшее время
                </h2>
            )
        }
    }
}
let contanier = document.getElementById('small-dialog');
if (contanier) {
    ReactDOM.render(
        <CommentForm action="" />,
        contanier    
    )
}
