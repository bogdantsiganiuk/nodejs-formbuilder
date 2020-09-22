import React from "react";
import { isThrowStatement } from "typescript";
import "../App.css";

class Form extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div formid={this.props.formId}>
                    {this.props.formId}
                </div>
                <div formname={this.props.formName}>
                    {this.props.formName}
                </div>
                <div >
                    Button 1
                </div>
                <div formname={this.props.formName}>
                    Button 2
                </div>
            </div>
        )
    }
}

export default Form;