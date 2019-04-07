import React, { Component } from "react";
import Launch from "./Launch";
import { Divider, Dropdown, Loader, Container } from "semantic-ui-react";

class List extends Component {
  state = {
    launches: [],
    n: 0,
    isLoading: true
  };

  loadData = async () => {
    try {
      let res = await fetch("/upcoming/" + this.state.n);
      let data = await res.json();
      this.setState({ launches: data.launches, isLoading: false });
    } catch (e) {
      console.log("server not responding");
    }
  };

  handleChange = (e, data) => {
    this.setState({ n: data.value, isLoading: true }, () => this.loadData());
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <Container>
        <Divider horizontal>
          Show {"\u00A0"}
          <Dropdown button text={this.state.n.toString()}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handleChange} text="5" value="5" />
              <Dropdown.Item onClick={this.handleChange} text="10" value="10" />
              <Dropdown.Item onClick={this.handleChange} text="25" value="25" />
              <Dropdown.Item onClick={this.handleChange} text="50" value="50" />
            </Dropdown.Menu>
          </Dropdown>
          {"\u00A0"} recent launches
        </Divider>

        {this.state.isLoading ? (
          <Loader active inline="centered" />
        ) : (
          this.state.launches.map((launch, i) => <Launch key={i} {...launch} />)
        )}
        <Divider horizontal>END</Divider>
      </Container>
    );
  }
}

export default List;
