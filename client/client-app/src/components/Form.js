import React from "react";
import { isThrowStatement } from "typescript";
import "../App.css";

class Form extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <li className="list-group-item" >
                <div>
                    <div className="form-id" formid={this.props.formId}>
                        {this.props.formId}
                    </div>
                    <div className="form-name" formname={this.props.formName}>
                        {this.props.formName}
                    </div>
                    <button onClick={() => this.props.onCreateNewFormSubmissionClick(this.props.formName, this.props.formFields, this.props.formId)} className="form-button-submit">
                        New form submission
                    </button>
                    <button onClick={() => this.props.onFormSubmissionsClick(this.props.formId)} className="form-button-getall" formname={this.props.formName}>
                        View all submissions
                    </button>
                </div>
            </li>
        )
    }
}

export default Form;