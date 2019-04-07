import React, { Component } from "react";
import moment from "moment";
import { Grid, Segment, Header, List } from "semantic-ui-react";

class Launch extends Component {
  state = {
    countDown: ""
  };

  updateCountdown = () => {
    const d = moment.duration(moment(this.props.time).diff(moment.utc()));
    this.setState({
      countDown:
        d.get("days") +
        " : " +
        d.get("hours") +
        " : " +
        d.get("minutes") +
        " : " +
        d.get("seconds")
    });
  };

  componentDidMount() {
    this.interval = setInterval(this.updateCountdown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Segment>
        <Header>{this.props.name}</Header>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <List>
              <List.Item>
                <List.Icon
                  circular
                  verticalAlign="middle"
                  name="rocket"
                  color="red"
                />
                <List.Content verticalAlign="middle">
                  <a href={this.props.rocket.link}>{this.props.rocket.name}</a>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Icon
                  circular
                  verticalAlign="middle"
                  name="group"
                  color="grey"
                />
                <List.Content verticalAlign="middle">
                  <a href={this.props.agency.link}>{this.props.agency.name}</a>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Icon
                  circular
                  verticalAlign="middle"
                  name="location arrow"
                  color="blue"
                />
                <List.Content verticalAlign="middle">
                  <span>{this.props.location}</span>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Icon
                  circular
                  verticalAlign="middle"
                  name="calendar outline"
                  color="grey"
                />
                <List.Content verticalAlign="middle">
                  <span>{moment.utc(this.props.time).calendar()}</span>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column>
            <List>
              <List.Item>
                Countdown
                <List.List>{this.state.countDown}</List.List>
              </List.Item>
              <List.Item>
                Video Links
                <List.List>
                  {this.props.links.map((link, i) => (
                    <List.Item key={i}>
                      <a href={link}>{link}</a>
                    </List.Item>
                  ))}
                </List.List>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Launch;
