import React from "react";


class Create extends React.Component{
    constructor(props){
        super(props);
        this.state = {formName: "", fields:[{fieldLabel:"",inputName:"",inputType:"1"}]};
        this.onAddNewField = this.onAddNewField.bind(this);
        this.onSubmitNewForm = this.onSubmitNewForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    onSubmitNewForm(){
        if(!this.state.formName || this.state.fields.filter((item) => {
            if(!item.fieldLabel || !item.inputName || !item.inputType)
                return true;
            return false;
        }).length > 0)
        {
            window.alert("Please fill all the inputs!");
        }
        else{
            fetch('http://localhost:5000/forms', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({formName: this.state.formName, formFields:this.state.fields})
            }).then((status) => console.log(status));
            this.props.onCreatedFormClick();
        }

        
    }

    handleChange(e) {
        if(["fieldLabel","inputName","inputType"].includes(e.target.className)){
            let oldFields = [...this.state.fields];
            oldFields[e.target.dataset.id][e.target.className] = e.target.value;
            oldFields[e.target.dataset.id].id = e.target.dataset.id;
            this.setState({fields: oldFields});
        }
        else{
            this.setState({[e.target.className]: e.target.value})
        }
        
    }

    onAddNewField(){
        this.setState((prevState) => ({
            fields:[...prevState.fields, {fieldLabel:"",inputName:"",inputType:"1"}]
        }));
    }

    renderFormFields(){
        let {fields} = this.state.fields;
        if(this.state.fields.length == 0){
            return;
        }
        else{
            return (
                this.state.fields.map((field,idx) => {
                    var labelName = 'field-label-name-' + idx;
                    var labelId = 'label-' + idx;
                    var inputName = 'field-input-name-' + idx;
                    var inputId = 'name-' + idx;
                    var typeName = 'field-input-type-' + idx;
                    var typeId = 'type-' + idx;
                return <li className="formFieldRow">
                    <div className="formFieldRow-fieldLabel">
                      <label>Field Label:</label>
                      <input id={labelId} data-id={idx} name={labelName} className="fieldLabel"></input>
                    </div>
                    <div className="formFieldRow-inputName">
                        <label>Input Name:</label>
                        <input id={inputId} data-id={idx} name={inputName} className="inputName"></input>
                    </div>
                    <div className="formFieldRow-inputType">
                        <label>Input Type:</label>
                        <select id={typeId} data-id={idx} name={typeName} value={this.state.fields[idx].inputType} className="inputType">
                            <option value="1">text</option>
                            <option value="2">date</option>
                            <option value="3">email</option>
                            <option value="4">tel</option>
                            <option value="5">number</option>
                        </select>
                    </div>
                </li>})
            )
        }
    }

    render(){
        return(
            <div className="FormContainer" onChange={this.handleChange}>
                <div className="formHead">
                    <div className="formNameContainer">
                        <label className="formNameLabel">Form name:</label>
                        <input className="formName" name="formName" type="text"></input>
                    </div>
                </div>
                <div className="FormBody">
                    <button onClick={this.onAddNewField}>Add new field</button>
                    <ul>
                        {this.renderFormFields()}
                    </ul>
                </div>
                <button onClick={this.onSubmitNewForm}>Submit</button>
            </div>



        )
    }


}

export default Create;