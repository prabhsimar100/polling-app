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
      var arr = []

      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        this.props.firebase.db.collection("surveys").doc(doc.id)
        .collection("options")
        .get()
        .then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{            
            arr.push(doc.data());
            // console.log(doc);
          })
        })
        .catch((error) => {
          console.log(error);
        })  
        console.log(arr);
        // ar.push(doc)
      });
      this.setState({surveys : ar})
      // console.log(this.state.surveys[0].data()); 
      // console.log(this.state.surveys[0].id); 
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