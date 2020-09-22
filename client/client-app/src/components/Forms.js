import React from "react";
import Form from "./Form"
import "../App.css";

 class Forms extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:[]};
    }
   
     componentDidMount(){
         const api = 'http://localhost:5000';
         fetch(api + '/forms')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    data: json,
                    loading: false
                });
                console.log(json);
            });
     }

     renderAllForms() {
         return this.state.data.map((form) =><Form formName={form.formName} formFields={form.formFields} formId={form.id} key={form.formName} />)
     }


     render() {
         return (
             <div>
         <h1>Hello!</h1>
          {this.state.data.length > 0 &&
            <ul>
                {this.renderAllForms()}
            </ul>}
            </div>
         )
        }
    
    
}

export default Forms;