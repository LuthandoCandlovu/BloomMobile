import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function TransfersScreen() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = () => {
    if (!amount || !recipient) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      Alert.alert(
        "Transfer Successful!", 
        `ZAR ${amount} has been sent to ${recipient}`,
        [{ text: "OK", onPress: () => {
          setAmount("");
          setRecipient("");
          setReference("");
        }}]
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Money</Text>
        <Text style={styles.subtitle}>Transfer funds securely</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Recipient Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient name"
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

        <TouchableOpacity 
          style={[styles.transferButton, loading && styles.transferButtonDisabled]} 
          onPress={handleTransfer} 
          disabled={loading}
        >
          <Text style={styles.transferButtonText}>
            {loading ? "🔄 Processing..." : "💸 Transfer Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  header: { padding: 20, backgroundColor: "#1e293b" },
  title: { fontSize: 24, fontWeight: "bold", color: "#f8fafc" },
  subtitle: { fontSize: 16, color: "#94a3b8", marginTop: 4 },
  form: { padding: 20, backgroundColor: "#1e293b", marginTop: 1 },
  label: { fontSize: 14, fontWeight: "600", color: "#e2e8f0", marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    fontSize: 16,
    color: "#f8fafc",
  },
  transferButton: {
    backgroundColor: "#10b981",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  transferButtonDisabled: {
    backgroundColor: "#6b7280",
  },
  transferButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
