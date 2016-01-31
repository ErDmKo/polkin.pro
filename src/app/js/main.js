import React from 'react';
import ReactDOM from 'react-dom';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: ''
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }
    handleTextChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
          return;
        }
        this.handleCommentSubmit({
            first_name: author,
            comment: text
        });
    }
    handleCommentSubmit(comment) {
        $.ajax({
            url: CONFIG.urls.smallfeedback,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState({author: '', text: '', success: true});
            },
            error: (xhr, status, err) => {
                console.error(CONFIG.urls.smallfeedback, status, err.toString());
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
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                    type="text"/>
                <textarea 
                    style={{width: '100%' }}
                    className=""
                    value={this.state.text}
                    onChange={this.handleTextChange}
                    placeholder="Отзыв"></textarea>
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
                    Спасибо за отзыв
                </h2>
            )
        }
    }
}

ReactDOM.render(
    <CommentForm action="" />,
    document.getElementById('small-dialog')
)
