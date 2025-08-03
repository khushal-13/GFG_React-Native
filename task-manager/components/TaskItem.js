import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Card, Chip, Text } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TaskItem = ({ title, description, date, id, isComplete }) => {
  return (
    <Card style={styles.card}>
      {isComplete && <Chip icon={"check-circle"} style={{margin:6, marginLeft:'auto', backgroundColor: 'lightgreen'}} mode="contained">Task Done</Chip>}
      <Card.Title title={title} />
      <Card.Content style={styles.padding} title={title}></Card.Content>
      <Card.Content>
        <Text>{description}</Text>
      </Card.Content>
      <Card.Actions
        style={{
          width: "100%",
          display: "flex",
          ...styles.padding,
        }}
      >
        <Button style={{ marginRight: "auto" }}>Delete</Button>
        <Button>Complete</Button>
      </Card.Actions>
    </Card>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  padding: {
    padding: 12,
  },
  card: {
    margin: 10,
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
    }),
  },
});
