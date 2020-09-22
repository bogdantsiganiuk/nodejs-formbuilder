import React from "react";


class ResponseList extends React.Component{
    constructor(props){
        super(props);
        this.state = {formId: this.props.formId, responses:[]};
    }

    componentDidMount(){
        fetch('http://localhost:5000/submissions/' + this.state.formId)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    responses: json
                });
                console.log(json);
            });
    }

    render(){
        return(
            <ul className="submissions">
                {this.state.responses.map((item) => <li>submission id:{item.id} <ul>{item.formFieldsData.map((field) => 
                                                            <li className="submission-list">
                                                                <label>fieldId:{field.id}</label>
                                                                <label>inputName:{field.inputName}</label>
                                                                <label> data:{field.data}</label> 
                                                                </li>)}</ul></li>)}
            </ul>
        )
    }
}

export default ResponseList;