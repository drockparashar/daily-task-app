import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '@/context/TaskContext';
import { 
  Wrench, 
  Droplets, 
  Sprout, 
  Bug, 
  Scissors, 
  TreePine 
} from 'lucide-react-native';

interface TaskCardProps {
  task: Task;
}

const taskConfig = {
  maintenance: {
    icon: Wrench,
    color: '#F97316',
    bgColor: '#FFF7ED',
    label: 'Maintenance'
  },
  fertigation: {
    icon: Droplets,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    label: 'Fertigation'
  },
  irrigation: {
    icon: Droplets,
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    label: 'Irrigation'
  },
  pesticide: {
    icon: Bug,
    color: '#DC2626',
    bgColor: '#FEF2F2',
    label: 'Pesticide/Fungicide'
  },
  herbicide: {
    icon: Scissors,
    color: '#7C2D12',
    bgColor: '#FEF7ED',
    label: 'Herbicide'
  },
  plantation: {
    icon: TreePine,
    color: '#059669',
    bgColor: '#ECFDF5',
    label: 'Plantation'
  },
  'plant-maintenance': {
    icon: Wrench,
    color: '#F97316',
    bgColor: '#FFF7ED',
    label: 'Plant Maintenance'
  },
  'tool-maintenance': {
    icon: Wrench,
    color: '#A21CAF',
    bgColor: '#F3E8FF',
    label: 'Tool Maintenance'
  }
};

export default function TaskCard({ task }: TaskCardProps) {
  const config = taskConfig[task.type];
  const Icon = config.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderDetails = () => {
    switch (task.type) {
      case 'plant-maintenance':
      case 'tool-maintenance':
        return (
          <>
            <Text style={styles.details}>Equipment: {task.equipment || 'N/A'}</Text>
            <Text style={styles.details}>Issue: {task.issue || 'N/A'}</Text>
            <Text style={styles.details}>Parts Used: {task.parts || 'N/A'}</Text>
            <Text style={styles.details}>Time Spent: {task.timeSpent || 'N/A'}</Text>
          </>
        );
      case 'fertigation':
        return (
          <>
            <Text style={styles.details}>Fertilizer: {task.fertilizerName || 'N/A'}</Text>
            <Text style={styles.details}>Quantity: {task.quantity || 'N/A'}</Text>
            <Text style={styles.details}>Duration: {task.duration || 'N/A'}</Text>
            <Text style={styles.details}>Crop: {task.crop || 'N/A'}</Text>
          </>
        );
      case 'irrigation':
        return (
          <>
            <Text style={styles.details}>Method: {task.method || 'N/A'}</Text>
            <Text style={styles.details}>Duration: {task.duration || 'N/A'}</Text>
            <Text style={styles.details}>Area: {task.area || 'N/A'}</Text>
            <Text style={styles.details}>Water Source: {task.waterSource || 'N/A'}</Text>
          </>
        );
      case 'pesticide':
        return (
          <>
            <Text style={styles.details}>Chemical: {task.chemical || 'N/A'}</Text>
            <Text style={styles.details}>Type: {task.chemicalType || 'N/A'}</Text>
            <Text style={styles.details}>Quantity: {task.quantity || 'N/A'}</Text>
            <Text style={styles.details}>Method: {task.method || 'N/A'}</Text>
            <Text style={styles.details}>Crop: {task.crop || 'N/A'}</Text>
          </>
        );
      case 'herbicide':
        return (
          <>
            <Text style={styles.details}>Herbicide Name: {task.herbicideName || 'N/A'}</Text>
            <Text style={styles.details}>Quantity: {task.quantity || 'N/A'}</Text>
            <Text style={styles.details}>Area: {task.area || 'N/A'}</Text>
          </>
        );
      case 'plantation':
        return (
          <>
            <Text style={styles.details}>Plant: {task.plantName || 'N/A'}</Text>
            <Text style={styles.details}>Variety: {task.variety || 'N/A'}</Text>
            <Text style={styles.details}>Number/Quantity: {task.number || 'N/A'}</Text>
            <Text style={styles.details}>Area: {task.area || 'N/A'}</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: config.bgColor }]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon size={24} color={config.color} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.taskType, { color: config.color }]}>
            {config.label}
          </Text>
          <Text style={styles.date}>{formatDate(task.date)}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.field}>Field: {task.field}</Text>
        {renderDetails()}
        {task.notes ? (
          <Text style={styles.notes}>Notes: {task.notes}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  taskType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    gap: 4,
  },
  field: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  details: {
    fontSize: 14,
    color: '#6B7280',
  },
  notes: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
});