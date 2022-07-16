import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyExists = tasks.find(task => task.title === newTaskTitle);
    if (alreadyExists) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }
    setTasks(prev => [...prev, { id: new Date().getTime(), title: newTaskTitle, done: false }]);
  }

  function handleToggleTaskDone(id: number) {
    const newList = tasks.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      } else {
        return task;
      }
    })
    setTasks([...newList]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      { text: 'Não' },
      { text: 'Sim', onPress: () => setTasks(prev => prev.filter(task => task.id !== id)) },
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const newList = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, title: taskNewTitle };
      } else {
        return task;
      }
    })
    setTasks([...newList]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
