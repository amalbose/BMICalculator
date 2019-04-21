import React, { Component } from "react";
import { ToolbarAndroid, StyleSheet, Text, View } from "react-native";
import Result from "./Result";
import Editor from "./Editor";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = { bmi: 0, weight: 60, height: 0, isMetric: true };
  }

  _calculateMetricBMI() {
    var height = this.state.height / 100;
    var weight = this.state.weight;
    if (height == 0) {
      return 0;
    }
    return weight / (height * height);
  }

  _calculateImperialBMI() {
    var heightInInches = this.state.height * 12;
    var weight = this.state.weight;
    if (heightInInches == 0) {
      return 0;
    }
    return 703 * (weight / (heightInInches * heightInInches));
  }

  _calculateBMI() {
    var bmiVal;
    if (this.state.isMetric) {
      bmiVal = this._calculateMetricBMI();
    } else {
      bmiVal = this._calculateImperialBMI();
    }
    return bmiVal.toFixed(2);
  }

  _onBMIChange() {
    var self = this;
    var bmiValue = this._calculateBMI();
    this.setState({
      bmi: bmiValue
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title="BMI Calculator"
          titleColor="#f0f4c3"
          style={styles.toolbar}
        />
        <Editor
          onBMIChange={this._onBMIChange.bind(this)}
          states={this.state}
        />
        <Result bmi={this.state.bmi} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#e6ee9c"
  },
  toolbar: {
    height: 56,
    backgroundColor: "#9e9d24"
  }
});
