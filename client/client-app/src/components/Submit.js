import React from "react";

class Submit extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state.formName = this.props.formName;
        this.state.formId = this.props.formId;
        this.state.formFields = this.props.formFields;
        this.state.fieldsData = this.props.formFields.map((item,id) =>  {
            return {fieldId: id, fieldData: ""}
        });
        this.renderForm = this.renderForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){

    }

    renderForm(){
        return this.state.formFields.map((field, idx) => <li key={'field' + idx}><label className="fieldName">{field.fieldName}</label><input data-id={idx} name={field.inputName} type={this.convertFieldType(field.fieldType)}></input></li>)
    }

    handleChange(e){
        console.log(e.target);
        console.log(this.state);
        let newState = this.state.fieldsData;
        newState[e.target.dataset.id]['fieldData'] = e.target.value;

        this.setState({fieldsData: newState});
        console.log(newState);
    }

    onSubmit(){
        fetch('http://localhost:5000/submissions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({formId: this.state.formId, formFields: this.state.fieldsData})
        }).then((status) => console.log(status));
        this.props.onSubmittedFormClick();
    }

    convertFieldType(number){
        let type = "";
        switch(number){
            case 1:
                type="text";
                break;
            case 2:
                type="date"
                break;
            case 3:
                type="email"
                break;
            case 4:
                type="tel"
                break;
            case 5:
                type="number"
                break;
        }
        return type;
    }

    render(){
        return(
            <div className="submission-container">
                <div className="submission-container-header">
                    <div className="submission-container-header-formname">{this.state.formName}</div>
                </div>
                <ul className="submission-container-body" onChange={this.handleChange}>
                    {this.renderForm()}
                </ul>
                <button onClick={this.onSubmit}>
                    Submit
                </button>
            </div>
        )
    }
}

export default Submit;