import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { MKColor, MKSwitch, MKTextField } from "react-native-material-kit";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMetric: props.states.isMetric,
      feet: 0,
      inches: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.legendLabel}>
              Weight {this.state.isMetric ? "(kg)" : "(lb)"}
            </Text>
            <MKTextField
              keyboardType="numeric"
              maxLength={3}
              onChangeText={newVal => {
                if (newVal < 0) {
                  newVal = 0;
                }
                if (isNaN(newVal)) {
                  newVal = 0;
                }
                if (newVal > 1000) {
                  newVal = 1000;
                }
                this.props.states.weight = newVal;
                this.props.onBMIChange();
              }}
              placeholder={this.state.isMetric ? "kg" : "lb"}
              style={styles.inputBox}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.legendLabel}>
              Height {this.state.isMetric ? "(cm)" : "(ft)"}
            </Text>
            <MKTextField
              keyboardType="numeric"
              maxLength={3}
              placeholder={this.state.isMetric ? "cm" : "ft"}
              style={styles.inputBox}
              onChangeText={newVal => {
                if (newVal < 0) {
                  newVal = 0;
                }
                if (isNaN(newVal)) {
                  newVal = 0;
                }
                if (newVal > 1000) {
                  newVal = 1000;
                }
                if (!this.state.isMetric) {
                  this.setState({
                    feet: newVal
                  });
                  var inches = this.state.inches * (1 / 12);
                  this.props.states.height = parseInt(newVal) + inches;
                } else {
                  this.props.states.height = parseInt(newVal);
                }
                this.props.onBMIChange();
              }}
            />
            {!this.state.isMetric ? (
              <MKTextField
                keyboardType="numeric"
                maxLength={3}
                placeholder="in"
                style={styles.inputBox}
                onChangeText={newVal => {
                  if (newVal < 0) {
                    newVal = 0;
                  }
                  if (isNaN(newVal)) {
                    newVal = 0;
                  }
                  if (newVal > 1000) {
                    newVal = 1000;
                  }
                  this.setState({
                    inches: newVal
                  });
                  var inches = newVal * (1 / 12);
                  this.props.states.height = parseInt(this.state.feet) + inches;
                  this.props.onBMIChange();
                }}
              />
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.switch}>
            <MKSwitch
              checked={this.state.isMetric}
              offColor="rgba(255,152,0,.3)"
              onColor="#cddc39"
              thumbOnColor={MKColor.Brown}
              rippleColor="rgba(255,152,0,.2)"
              onCheckedChange={e => {
                this.setState({
                  isMetric: e.checked === true
                });
                this.props.states.isMetric = e.checked === true;
                this.props.onBMIChange();
              }}
            />
            <Text>{this.state.isMetric ? "Metric" : "Imperial"}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "stretch",
    alignSelf: "stretch",
    backgroundColor: "#e6ee9c"
  },
  switch: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  col: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  legendLabel: {
    fontSize: 18,
    textAlign: "center",
    margin: 10
  },
  inputBox: {
    margin: 10
  },
  age: {
    height: 48, // have to do it on iOS
    marginTop: 10
  }
});
