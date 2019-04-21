import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Speedometer from "react-native-speedometer-chart";

export default class Result extends Component {
  constructor(props) {
    super(props);
  }

  getBMIInfo(bmi) {
    if (bmi == 0) {
      return {
        category: "",
        color: "#cddc39"
      };
    }
    let category = "";
    let color = "";
    if (bmi <= 15) {
      category = "Very severely underweight";
      color = "#fff9c4";
    } else if (bmi > 15 && bmi <= 16) {
      category = "Severely underweight";
      color = "#fff176";
    } else if (bmi > 16 && bmi <= 18.5) {
      category = "Underweight";
      color = "#ffeb3b";
    } else if (bmi > 18.5 && bmi <= 25) {
      category = "Normal (healthy weight)";
      color = "#8bc34a";
    } else if (bmi > 25 && bmi <= 30) {
      category = "Overweight";
      color = "#ffa726";
    } else if (bmi > 30 && bmi <= 35) {
      category = "Obese Class I (Moderately obese)";
      color = "#e65100";
    } else if (bmi > 35 && bmi <= 40) {
      category = "Obese Class II (Severely obese)";
      color = "#f44336";
    } else if (bmi > 40 && bmi <= 45) {
      category = "Obese Class III (Very severely obese)";
      color = "#e53935";
    } else if (bmi > 45 && bmi <= 50) {
      category = "Obese Class IV (Morbidly Obese)";
      color = "#d32f2f";
    } else if (bmi > 50 && bmi <= 60) {
      category = "Obese Class V (Super Obese)";
      color = "#c62828";
    } else {
      category = "Obese Class VI (Hyper Obese)";
      color = "#b71c1c";
    }
    return {
      category: category,
      color: color
    };
  }
  render() {
    var color = this.getBMIInfo(this.props.bmi).color;
    var category = this.getBMIInfo(this.props.bmi).category;
    return (
      <View style={styles.container}>
        <Text style={styles.bmiValue}>
          {this.props.bmi == 0 ? "" : this.props.bmi}
        </Text>
        <Text style={styles.bmiCategory}>{category}</Text>
        <Speedometer
          value={parseInt(this.props.bmi)}
          totalValue={60}
          showText
          showLabels
          innerCircleStyle={{ backgroundColor: "#cddc39" }}
          outerCircleStyle={{ backgroundColor: "#e6ee9c" }}
          halfCircleStyle={{ backgroundColor: color }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#cddc39",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 10,
    padding: 10
  },
  bmiValue: {
    fontSize: 18,
    textAlign: "center",
    margin: 10
  },
  bmiCategory: {
    fontSize: 18,
    textAlign: "center",
    margin: 10
  }
});
