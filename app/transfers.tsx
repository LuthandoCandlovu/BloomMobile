import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function TransfersScreen() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = () => {
    if (!amount || !recipient) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);
    
    // Simulate transfer processing
    setTimeout(() => {
      Alert.alert(
        'Transfer Successful!', 
        `ZAR ${amount} has been sent to ${recipient}\nReference: ${reference || 'N/A'}`,
        [{ text: 'OK', onPress: () => {
          setAmount('');
          setRecipient('');
          setReference('');
        }}]
      );
      setLoading(false);
    }, 2000);
  };

  const quickRecipients = [
    { id: 1, name: 'John Doe', bank: 'FNB', account: '•••• 7841', type: 'personal' },
    { id: 2, name: 'Sarah Smith', bank: 'Standard Bank', account: '•••• 5623', type: 'business' },
    { id: 3, name: 'Mike Johnson', bank: 'Capitec', account: '•••• 9187', type: 'personal' },
    { id: 4, name: 'ABC Corporation', bank: 'Nedbank', account: '•••• 3278', type: 'business' },
  ];

  const transferTypes = [
    { id: 1, name: 'Instant', time: 'Immediate', fee: 'ZAR 10.00' },
    { id: 2, name: 'Standard', time: '2-3 hours', fee: 'Free' },
    { id: 3, name: 'Scheduled', time: 'Future date', fee: 'Free' },
  ];

  const [selectedType, setSelectedType] = useState(1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Money</Text>
        <Text style={styles.subtitle}>Transfer funds securely</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Recipient Name / Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient name or account number"
          value={recipient}
          onChangeText={setRecipient}
        />

        <Text style={styles.label}>Amount (ZAR)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Reference (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Payment reference"
          value={reference}
          onChangeText={setReference}
        />

        <View style={styles.transferTypeSection}>
          <Text style={styles.sectionTitle}>Transfer Type</Text>
          <View style={styles.typeGrid}>
            {transferTypes.map((type) => (
              <TouchableOpacity 
                key={type.id}
                style={[
                  styles.typeButton,
                  selectedType === type.id && styles.typeButtonSelected
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text style={[
                  styles.typeName,
                  selectedType === type.id && styles.typeNameSelected
                ]}>
                  {type.name}
                </Text>
                <Text style={[
                  styles.typeDetails,
                  selectedType === type.id && styles.typeDetailsSelected
                ]}>
                  {type.time}
                </Text>
                <Text style={[
                  styles.typeFee,
                  selectedType === type.id && styles.typeFeeSelected
                ]}>
                  {type.fee}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.transferButton, loading && styles.transferButtonDisabled]} 
          onPress={handleTransfer} 
          disabled={loading}
        >
          <Text style={styles.transferButtonText}>
            {loading ? '🔄 Processing...' : `💸 Transfer ZAR ${amount || '0.00'}`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickSection}>
        <Text style={styles.sectionTitle}>Quick Transfers</Text>
        {quickRecipients.map((recipient) => (
          <TouchableOpacity 
            key={recipient.id} 
            style={styles.quickItem}
            onPress={() => {
              setRecipient(recipient.name);
              Alert.alert('Recipient Selected', `${recipient.name} - ${recipient.account}`);
            }}
          >
            <View style={styles.recipientInfo}>
              <View style={styles.recipientHeader}>
                <Text style={styles.recipientName}>{recipient.name}</Text>
                <View style={[
                  styles.recipientType,
                  recipient.type === 'business' ? styles.businessType : styles.personalType
                ]}>
                  <Text style={styles.recipientTypeText}>
                    {recipient.type === 'business' ? 'Business' : 'Personal'}
                  </Text>
                </View>
              </View>
              <Text style={styles.recipientDetails}>{recipient.bank} • {recipient.account}</Text>
            </View>
            <Text style={styles.transferIcon}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.securityNotice}>
        <Text style={styles.securityTitle}>🔒 Secure Transfer</Text>
        <Text style={styles.securityText}>
          • All transfers are encrypted and secure{'\n'}
          • You will receive instant confirmation{'\n'}
          • 24/7 fraud monitoring active
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 20, backgroundColor: '#1e293b' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc' },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 4 },
  form: { padding: 20, backgroundColor: '#1e293b', marginTop: 1 },
  label: { fontSize: 14, fontWeight: '600', color: '#e2e8f0', marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 16,
    color: '#f8fafc',
  },
  transferTypeSection: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#f8fafc', marginBottom: 12 },
  typeGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  typeButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  typeButtonSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  typeName: { fontSize: 14, fontWeight: 'bold', color: '#94a3b8' },
  typeNameSelected: { color: '#ffffff' },
  typeDetails: { fontSize: 12, color: '#64748b', marginTop: 4 },
  typeDetailsSelected: { color: '#e2e8f0' },
  typeFee: { fontSize: 10, color: '#64748b', marginTop: 2 },
  typeFeeSelected: { color: '#e2e8f0' },
  transferButton: {
    backgroundColor: '#10b981',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  transferButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  transferButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  quickSection: { padding: 20, backgroundColor: '#1e293b', marginTop: 1 },
  quickItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    marginBottom: 8,
  },
  recipientInfo: { flex: 1 },
  recipientHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  recipientName: { fontSize: 16, fontWeight: '600', color: '#f8fafc' },
  recipientType: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  businessType: { backgroundColor: '#fef3c7' },
  personalType: { backgroundColor: '#d1fae5' },
  recipientTypeText: { fontSize: 10, fontWeight: 'bold', color: '#1f2937' },
  recipientDetails: { fontSize: 14, color: '#94a3b8' },
  transferIcon: { fontSize: 20, color: '#3b82f6', fontWeight: 'bold' },
  securityNotice: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    margin: 20,
    marginTop: 10,
  },
  securityTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#f8fafc', 
    marginBottom: 12,
    textAlign: 'center',
  },
  securityText: { fontSize: 14, color: '#94a3b8', lineHeight: 20 },
});
