import React, { Component } from "react";


export default class Ongoing extends Component {
    
    constructor(props)
    {
      super(props);
    }
    
    render() {
    return (
      <div>
        <div>
            <h1>{this.props.survey.questions.data().finish}</h1>
            
        </div>
        {/* <Candidate/> */}
      </div>
    );
  }
}
