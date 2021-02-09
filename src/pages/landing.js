import { QuestionAnswer } from "@material-ui/icons";
import React, { Component } from "react";
// import Candidate from "../components/Candidate";
import { withFirebase } from "../components/Firebase";
import { withAuth } from "../components/Session";
import Ongoing from "../components/Ongoing";


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
      setTimeout(() => {
          this.setState({surveys:ar});
          // console.log(this.state.surveys);
      }, 2000);
    })
  }


  //return date in YYYY-MM-DD format
  getCurrentDate = () => {
    let tempDate = new Date(); 
    let month = (tempDate.getMonth()+1);
    if(month<=9)
      month = '0' + month;
    let day = (tempDate.getDate());
    if(day<=9)
      day = '0' + day;
    var currDate = tempDate.getFullYear() + '-' + month + '-' + day;
    return currDate;
  } 

  render() {
    // console.log(this.state.surveys);
    return (
      <div>

        <div>
          {/* <h1> This is the Landing Page</h1> */}
          {            
            
            this.state.surveys.map((survey) => {

              var currDate = this.getCurrentDate();

              if(survey.questions.data().finish>currDate)
              {
                // console.log("Here");
                return <Ongoing survey={survey}/>
                //can vote
              }
              else
              {
                //can't vote
              }
              // console.log(survey.questions.data());
            })
          }
          
        </div>
        {/* <Candidate/> */}
      </div>
    );
  }
}

export default withFirebase(withAuth(landing));