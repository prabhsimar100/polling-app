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
        })
        .catch((error) => {
          console.log(error);
        })
        const surveyTemp = {
          questions : doc,
          options : arr,
        }  
        ar.push(surveyTemp);
        // console.log(ar);
      })
      this.setState({surveys : ar})
      console.log(this.state.surveys[0].options[0]);
      // console.log(this.state.surveys[0].options);
      // for(var i=0;i<2;i++){
      //   console.log("HELOO");
      //   console.log(this.state.surveys[0].options[i]);
      // }
    });
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