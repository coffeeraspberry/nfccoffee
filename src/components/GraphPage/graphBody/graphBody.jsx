import React from "react";
import "./graphBody.css";
import { Container, Row, Col } from "reactstrap";
import { Bar } from "react-chartjs-2";
import DEBUG from "../../../constants/debug";

class graphBody extends React.Component {
  chartRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };

    this.state.data = props.items;
    let temp = this.state.data;
    let sheet = {
      labels: [],
      datasets: [
        {
          label: "CoffeeCouter",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [],
        },
      ],
    };

    temp.forEach((element) => {
      sheet.labels.push(element.label);
      sheet.datasets[0].data.push(element.data);
    });
    /* 
    -------------------
    DEBUG. CHECK DATA
    -------------------
    */
    if (DEBUG) {
      console.log("graphBody temp : ", temp);
      console.log("graphBody sheet ", sheet);
    }
    this.state.data = sheet;
  }

  componentDidMount() {}

  handleBarClick(element, id) {}

  render() {
    return (
      <div className="graph">
      <Container>
        <Row>
          <Col>
            <Bar
            className="bar-graph"
            width={200}
            height={550}
            responsive={true}
            
              data={this.state.data}
              options={{
                onClick: this.handleBarClick,
                responsiveAnimationDuration:1500,
                
                aspectRatio:0.5,
                maintainAspectRatio: false,
                title: {
                  animation: true,
                  display: true,
                  text: "Coffee Counter",
                  fontColor:"white",
                  fontSize: 30,
                },
                legend: {
                  display: false,
                  position: "right",
                },
                scales: {
                  xAxes: [
                    { 
                      
                      ticks: { display: true },
                      gridLines: {
                        display: true,
                        drawBorder: true,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      ticks: { display: true },
                      gridLines: {
                        display: true,
                        drawBorder: true,
                      },
                    },
                  ],
                },
           }}
            />
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default graphBody;
