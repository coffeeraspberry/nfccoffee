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
      <Container>
        <Row>
          <Col>
            <Bar
              data={this.state.data}
              options={{
                onClick: this.handleBarClick,
                responsive: true,
                maintainAspectRatio: true,
                title: {
                  animation: true,
                  display: true,
                  text: "Coffee Counter",
                  fontSize: 20,
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
    );
  }
}

export default graphBody;
