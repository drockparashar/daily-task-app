import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTask } from '@/context/TaskContext';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/context/TaskContext';

export default function LogTask() {
  const { addTask } = useTask();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (taskData: Omit<Task, 'id'>) => {
    addTask(taskData);
    setShowSuccess(true);
    
    // Show success message briefly, then navigate to home
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/');
    }, 1500);
  };

  const handleCancel = () => {
    router.push('/');
  };

  if (showSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Task Logged Successfully!</Text>
          <Text style={styles.successSubtitle}>Returning to home...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Log New Task</Text>
        <Text style={styles.subtitle}>Record your farm activity</Text>
      </View>
      
      <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});