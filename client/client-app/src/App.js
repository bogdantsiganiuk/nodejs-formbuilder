import React, {Component} from 'react';
import './App.css';
import Forms from './components/Forms';
import Create from './components/Create';
import Submit from './components/Submit';
import ResponseList from './components/ResponseList';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: 'main', formName:'', formFields:[]}
    this.onCreatedFormClick = this.onCreatedFormClick.bind(this);
    this.onCreateFormClick = this.onCreateFormClick.bind(this);
    this.onCreateNewFormSubmissionClick = this.onCreateNewFormSubmissionClick.bind(this);
    this.onFormSubmissionsClick = this.onFormSubmissionsClick.bind(this);
  }

  onCreateFormClick(){
    this.setState({page: 'create'});
  }

  onFormSubmissionsClick(formId){
    this.setState({page: 'responses', formId: formId});

  }

  onCreateNewFormSubmissionClick(formName,formFields,formId){
    this.setState({page: 'submit',formName: formName, formFields: formFields, formId: formId});

  }

  onCreatedFormClick(){
    this.setState({page: 'main'});

  }

  render(){
  return (
    <div className="App">
      {this.state.page === 'main' ? 
        <div className="mainPageContainer">
      <div> <a onClick={this.onCreateFormClick}>Click here to create new form!</a></div>
      <Forms onCreateNewFormSubmissionClick={this.onCreateNewFormSubmissionClick}
             onFormSubmissionsClick={this.onFormSubmissionsClick} />
      </div>
     : 
      this.state.page === 'create' ? 
        <div>
          <Create onCreatedFormClick={this.onCreatedFormClick} />
        </div>
        
      :
      this.state.page === 'submit' ? 
        <div>
          <Submit onSubmittedFormClick={this.onCreatedFormClick} formName={this.state.formName} formFields={this.state.formFields} formId={this.state.formId} />
        </div>
      :
      this.state.page === 'responses' ? 
        <div>
          <ResponseList formId={this.state.formId} />
        </div>
      :
        <div/>
      }

    </div>
  );
  }
}

export default App;
