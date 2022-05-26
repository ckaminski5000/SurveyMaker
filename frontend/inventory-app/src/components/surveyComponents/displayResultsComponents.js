

import { Form, Table, Container, Row, Col, Button, } from "react-bootstrap";
import uniqid from "uniqid";
import { PieChart, Pie, Cell, LabelList } from "recharts";
import {useState} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export function ShortResponseResults(props) {
  // display question
  //display answers in a table format
  
    const responses = props.question.responses.map((question, index) => (
        <tr key={index}>
            <th>
                {index + 1})

            </th>
            <th>
                {question.response.response}
            </th>
        </tr>
    ))

  return (

    <Row >
      <Col lg={3} sm={12}></Col>
    <Col lg={3} sm={12} className="surveyQs resultsQs" style={{flexGrow: 6, margin: 10}}>
    <h4 style={{ textAlign: "center", fontWeight: 'bold' }} >
  Question {props.index}: {props.question.question}
    </h4>
    <div style={{overflowY: 'scroll', height: 300}}>
    <Table striped bordered hover >
  <thead>
    <tr>
      <th>Responses</th>
    </tr>
  </thead>
  <tbody>
    {responses}
    
    </tbody>
    </Table>
    </div>
    </Col>
    <Col lg={3} sm={12} ></Col>
    </Row>
  );
}

export function MultipleChoiceResults(props) {

  const [colors, setColors] = useState(["#86c036", "#92C8E8", "#FA339A", "#207720", "#F6EF00", "#876CB4", "#EC8C32", "#40A3C1", "#A637Ea", "#C8F57A" ])
  
 //count number of responses of each type

  let resultsArray = [];
 props.question.answer_choices.forEach(answer => {
   //search in responses for number of answers
   let count = props.question.responses.filter(response => response.response === answer).length;
   resultsArray.push({name: answer, y: count})
 })


  const options = {
    chart: {
      plotBackgroundColor: 'rgb(211, 234, 240)',
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie'
  },
  title: '',
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
         
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  accessibility: {
    point: {
        valueSuffix: '%'
    }
},
    series: [{
      name: '',
      colorByPoint: true,
      data: resultsArray
    }]
  }
  
 

  return (
    <>
    
    <Row >
      <Col lg={3} sm={12} className='resultsbg' ></Col>
      <Col lg={3} sm={12} className="surveyQs resultsQs" style={{flexGrow: 6, margin: 10}}>
      <h4 style={{fontWeight: 'bold', textAlign: 'center'}}>Question {props.index}: {props.question.question}</h4>
      <HighchartsReact
    highcharts={Highcharts}
    
    options={options}
  />

      </Col>
      <Col lg={3} sm={12} className='resultsbg' ></Col>
    </Row>
    </>
  );
}



export function SurveyTitle(props) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{props.survey.title}</h2>
      <h4 style={{ textAlign: "center" }} className="text-muted">
        {props.survey.description}
      </h4>
      <br />
    </>
  );
}
