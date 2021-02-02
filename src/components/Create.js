import React, { Component } from "react";


const INITIAL_STATE = {
question:"",
options:[''],
finish : "1999-12-31",
error: null,
};
class Create extends Component {
    handleQues=(event)=>{
        this.setState({ question : event.target.value });
        console.log(this.state.question)
    }
    
    addOption = e => {
        e.preventDefault()
        let options = this.state.options.concat([''])
        this.setState({
          options
        })
    }
    handleText = i => e => {
        let options = [...this.state.options]
        options[i] = e.target.value
        this.setState({
          options
        })
      }
    handleDelete = i => e => {
    e.preventDefault()
    let options = [
        ...this.state.options.slice(0, i),
        ...this.state.options.slice(i + 1)
    ]
    this.setState({
        options
    })
    }

    handleFinish =e=>{
        e.preventDefault();
        this.setState({finish : e.target.value});
    }
    constructor(props) {
      super(props);
        this.state = { ...INITIAL_STATE };
    }  
    render() {
      return (
        <div>
           <form>
                <label>
                    Question :
                    <input type="text" name="question"
                        onChange={this.handleQues}
                    />
                </label>
                <label>
                    Finish Time : 
                    <input type ="date" name="finish"
                        onChange={this.handleFinish}
                    />
                </label>
                <br/>
                <h1>Options : </h1>
                {this.state.options.map((option, index) => (
                <span key={index}>
                    <br/>
                    <input
                    type="text"
                    onChange={this.handleText(index)}
                    value={option}
                    />
                    <button onClick={this.handleDelete(index)}>X</button>
                </span>
                ))}
                <br/>
                <button onClick={this.addOption}>Add New Option</button>
                <input type="submit" value="Submit" />
            </form>
        </div>
      );
    }
  }
  export default Create;