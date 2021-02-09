import { QuestionAnswer } from "@material-ui/icons";
import React, { Component } from "react";
// import Candidate from "../components/Candidate";

import { withFirebase } from "../components/Firebase";
import { withAuth } from "../components/Session";


class landing extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
        surveys : [],
    };
  }

  componentDidMount()
  {
    this.props.firebase.db
    .collection("surveys")
    .get()
    .then((querySnapshot) => {
      var ar = []
      querySnapshot.forEach((doc) => {
        var arr = []
        this.props.firebase.db.collection("surveys").doc(doc.id)
        .collection("options")
        .get()
        .then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{            
            arr.push(doc);
          })
          const surveyTemp = {
            questions : doc,
            options : arr,
          }  
          ar.push(surveyTemp);
        })
        .catch((error) => {
          console.log(error);
        })
      })
      return ar;
    })
    .then((ar)=>{
      // setTimeout(() => {
      //     this.setState({surveys:ar});
      //     console.log(this.state.surveys[0].options[0].data());
      // }, 2000);
      this.setState({surveys:ar});
      console.log(this.state.surveys);
    })
  }

  render() {
    // console.log(this.state.surveys);
    return (
      <div>
        <div>
          <h1> This is the Landing Page</h1>
          
        </div>
        {/* <Candidate/> */}
      </div>
    );
  }
}

export default withFirebase(withAuth(landing));