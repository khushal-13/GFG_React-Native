import React, { useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import TaskItem from "../components/TaskItem";
import { TaskContext } from "../context/task";
import { Appbar } from "react-native-paper";

const AllTaskScreen = () => {
  const { tasks, handleTaskComplete, handleTaskDelete, fetchTasks } = useContext(TaskContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }, [fetchTasks]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="All Tasks" />
        <Appbar.Action icon="refresh" onPress={onRefresh} />
      </Appbar.Header>

      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TaskItem
            date={item.date}
            title={item.title}
            description={item.description}
            id={item.id}
            isComplete={item.isComplete}
            onComplete={() => handleTaskComplete(item.id)}
            onDelete={() => handleTaskDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Appbar.Content title="No tasks found" />
          </View>
        }
      />
    </View>
  );
};

export default AllTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
    backgroundColor: "#fff",
  },
  list: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  empty: {
    padding: 20,
    alignItems: "center",
  },
});
