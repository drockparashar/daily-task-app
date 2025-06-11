import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Task } from '@/context/TaskContext';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

const taskTypes = [
  { value: 'plant-maintenance', label: 'Plant Maintenance' },
  { value: 'tool-maintenance', label: 'Tool Maintenance' },
  { value: 'fertigation', label: 'Fertigation' },
  { value: 'irrigation', label: 'Irrigation' },
  { value: 'pesticide', label: 'Pesticide/Fungicide/Insecticide' },
  { value: 'herbicide', label: 'Herbicide' },
  { value: 'plantation', label: 'Plantation' },
] as const;

const irrigationMethods = [
  'Drip Irrigation',
  'Sprinkler',
  'Flood Irrigation',
  'Furrow Irrigation',
  'Centre Pivot',
  'Manual Watering',
];

const chemicalTypes = [
  'Insecticide',
  'Pesticide',
  'Fungicide',
];

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [taskType, setTaskType] = useState<Task['type']>('plant-maintenance');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [field, setField] = useState('');
  const [notes, setNotes] = useState('');

  // Maintenance fields
  const [equipment, setEquipment] = useState('');
  const [issue, setIssue] = useState('');
  const [parts, setParts] = useState('');
  const [timeSpent, setTimeSpent] = useState('');

  // Fertigation fields
  const [fertilizerName, setFertilizerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [duration, setDuration] = useState('');
  const [crop, setCrop] = useState('');

  // Irrigation fields
  const [method, setMethod] = useState('');
  const [area, setArea] = useState('');
  const [waterSource, setWaterSource] = useState('');

  // Pesticide fields
  const [chemical, setChemical] = useState('');
  const [chemicalType, setChemicalType] = useState('');

  // Herbicide fields
  const [herbicideName, setHerbicideName] = useState('');

  // Plantation fields
  const [plantName, setPlantName] = useState('');
  const [variety, setVariety] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = () => {
    if (!field.trim()) {
      alert('Please enter a field/plot');
      return;
    }

    const baseTask = {
      type: taskType,
      date,
      field: field.trim(),
      notes: notes.trim(),
    };

    let taskData: Omit<Task, 'id'> = baseTask;

    switch (taskType) {
      case 'plant-maintenance':
      case 'tool-maintenance':
        taskData = {
          ...baseTask,
          equipment: equipment.trim(),
          issue: issue.trim(),
          parts: parts.trim(),
          timeSpent: timeSpent.trim(),
        };
        break;
      case 'fertigation':
        taskData = {
          ...baseTask,
          fertilizerName: fertilizerName.trim(),
          quantity: quantity.trim(),
          duration: duration.trim(),
          crop: crop.trim(),
        };
        break;
      case 'irrigation':
        taskData = {
          ...baseTask,
          method: method.trim(),
          duration: duration.trim(),
          area: area.trim(),
          waterSource: waterSource.trim(),
        };
        break;
      case 'pesticide':
        taskData = {
          ...baseTask,
          chemical: chemical.trim(),
          chemicalType: chemicalType.trim(),
          quantity: quantity.trim(),
          method: method.trim(),
          crop: crop.trim(),
        };
        break;
      case 'herbicide':
        taskData = {
          ...baseTask,
          herbicideName: herbicideName.trim(),
          quantity: quantity.trim(),
          area: area.trim(),
        };
        break;
      case 'plantation':
        taskData = {
          ...baseTask,
          plantName: plantName.trim(),
          variety: variety.trim(),
          number: number.trim(),
          area: area.trim(),
        };
        break;
    }

    onSubmit(taskData);
  };

  const renderTaskSpecificFields = () => {
    switch (taskType) {
      case 'plant-maintenance':
      case 'tool-maintenance':
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Equipment</Text>
              <TextInput
                style={styles.input}
                value={equipment}
                onChangeText={setEquipment}
                placeholder="Equipment used"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Issue</Text>
              <TextInput
                style={styles.input}
                value={issue}
                onChangeText={setIssue}
                placeholder="Issue description"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Parts Used</Text>
              <TextInput
                style={styles.input}
                value={parts}
                onChangeText={setParts}
                placeholder="Parts/materials used"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time Spent</Text>
              <TextInput
                style={styles.input}
                value={timeSpent}
                onChangeText={setTimeSpent}
                placeholder="Hours/minutes spent"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </>
        );

      case 'fertigation':
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fertilizer Name</Text>
              <TextInput
                style={styles.input}
                value={fertilizerName}
                onChangeText={setFertilizerName}
                placeholder="Name of fertilizer"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Amount used (kg, L, etc.)"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration</Text>
              <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                placeholder="Application duration"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Crop</Text>
              <TextInput
                style={styles.input}
                value={crop}
                onChangeText={setCrop}
                placeholder="Crop treated"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </>
        );

      case 'irrigation':
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Method</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={method}
                  onValueChange={setMethod}
                  style={styles.picker}
                >
                  <Picker.Item label="Select irrigation method" value="" />
                  {irrigationMethods.map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration</Text>
              <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                placeholder="Irrigation duration"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Area</Text>
              <TextInput
                style={styles.input}
                value={area}
                onChangeText={setArea}
                placeholder="Area irrigated"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Water Source</Text>
              <TextInput
                style={styles.input}
                value={waterSource}
                onChangeText={setWaterSource}
                placeholder="Source of water"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </>
        );

      case 'pesticide':
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Chemical Name</Text>
              <TextInput
                style={styles.input}
                value={chemical}
                onChangeText={setChemical}
                placeholder="Name of chemical"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={chemicalType}
                  onValueChange={setChemicalType}
                  style={styles.picker}
                >
                  <Picker.Item label="Select chemical type" value="" />
                  {chemicalTypes.map(t => (
                    <Picker.Item key={t} label={t} value={t} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Amount used"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Application Method</Text>
              <TextInput
                style={styles.input}
                value={method}
                onChangeText={setMethod}
                placeholder="Spray, dust, etc."
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Crop</Text>
              <TextInput
                style={styles.input}
                value={crop}
                onChangeText={setCrop}
                placeholder="Crop treated"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </>
        );

      case 'herbicide':
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Herbicide Name</Text>
              <TextInput
                style={styles.input}
                value={herbicideName}
                onChangeText={setHerbicideName}
                placeholder="Name of herbicide"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Amount used"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Area</Text>
              <TextInput
                style={styles.input}
                value={area}
                onChangeText={setArea}
                placeholder="Area treated"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </>
        );

      case 'plantation':
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Plant Name</Text>
              <TextInput
                style={styles.input}
                value={plantName}
                onChangeText={setPlantName}
                placeholder="Name of plant/crop"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Variety</Text>
              <TextInput
                style={styles.input}
                value={variety}
                onChangeText={setVariety}
                placeholder="Plant variety"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number/Quantity</Text>
              <TextInput
                style={styles.input}
                value={number}
                onChangeText={setNumber}
                placeholder="Number of plants/seeds"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Area</Text>
              <TextInput
                style={styles.input}
                value={area}
                onChangeText={setArea}
                placeholder="Area planted"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={taskType}
              onValueChange={(value) => setTaskType(value)}
              style={styles.picker}
            >
              {taskTypes.map(type => (
                <Picker.Item key={type.value} label={type.label} value={type.value} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Field/Plot *</Text>
          <TextInput
            style={styles.input}
            value={field}
            onChangeText={setField}
            placeholder="Field or plot identifier"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {renderTaskSpecificFields()}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Additional notes..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  form: {
    padding: 16,
    paddingBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#374151',
    minHeight: 48,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 48,
    color: '#374151',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#059669',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});