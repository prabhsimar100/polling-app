import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


import {withAuth} from './Session';
import { withFirebase } from "./Firebase";
import { withRouter } from "react-router-dom";


const useStyles = {
  paper: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "4px",
    backgroundColor: "#009688",
  },
  form: {
    width: "100%", 
    marginTop: "16px",
  },
  submit: {
    margin: "16px 0px 8px",
  },
};

const INITIAL_STATE = {
question:"",
options:[''],
finish : "",
error: null,
};



class Create extends Component {

  onSubmit=(event)=>{
    var userId = this.props.authUser.uid;
    console.log(userId);
    event.preventDefault();
    var newSurvey= this.props.firebase.db.collection("surveys").doc();
    console.log(newSurvey.id);
    const surveyVal={
      question : this.state.question,
      finish:this.state.finish,
    }
    newSurvey.set(surveyVal)
    .then(()=>{
      console.log("Success1");
    })
    .catch((error)=>{
      console.log(error);
    })
    var flag=0;
    for (var i = 0; i < this.state.options.length; i++) {
      var newOption =newSurvey.collection("options").doc();
      const optionVal={
        text:this.state.options[i],
        vote:0,
      }
      newOption.set(optionVal)
      .then(()=>{
        flag++;
        console.log(`success${i}`);
        if(flag==this.state.options.length)
          this.props.history.push('/');
      })
      .catch((error)=>{
        console.log(error);
      })
    } 

    var userRef = this.props.firebase.db.collection('users').doc(userId);
    var ar = [];
    var obj = {};
    userRef.get().then((doc) => {
      if(doc.exists)
      {
        obj=doc.data();
        console.log(obj)
        if(doc.data().surveyId)
        {
          ar = doc.data().surveyId;
        }
        ar.push(newSurvey.id)
        obj.surveyId = ar;
        userRef.set(obj);

      }
      else 
      {
        console.log("Problem");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);})
  }
    handleQues=(event)=>{
        this.setState({ question : event.target.value });
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
      const { classes } = this.props;
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
           <form onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="ques"
                    label="Question"
                    name="question"
                    autoComplete="question"
                    onChange={this.handleQues}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    Number
                    fullWidth
                    id="finish"
                    label="Finish Time"
                    InputLabelProps={{ shrink: true }}
                    name="finish"
                    autoComplete="finish"
                    type = "date"
                    onChange={this.handleFinish}
                  />
                </Grid>
                <br/>
                {this.state.options.map((option, index) => (
                <span key={index}>
                    <br/>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        Number
                        fullWidth
                        id="finish"
                        label="Option"
                        name="option"
                        autoComplete="option"
                        onChange={this.handleText(index)}
                      />
                    </Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.handleDelete(index)}
                    >
                      Delete
                    </Button>
                </span>
                ))}
                <br/>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.addOption}
                  className={classes.submit}
                >
                  Add New Option
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
                </Grid>
            </form>
        </div>
        </Container>
      );
    }
  }
  export default withAuth(withRouter(withFirebase(withStyles(useStyles)(Create))));