import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

export default function InvestScreen() {
  const investmentOptions = [
    { id: 1, name: "Stocks", icon: "📈", returns: "8-12%", risk: "Medium" },
    { id: 2, name: "Bonds", icon: "📊", returns: "4-6%", risk: "Low" },
    { id: 3, name: "Crypto", icon: "₿", returns: "15-25%", risk: "High" },
    { id: 4, name: "Real Estate", icon: "🏠", returns: "7-10%", risk: "Medium" },
    { id: 5, name: "Mutual Funds", icon: "💼", returns: "6-9%", risk: "Low" },
    { id: 6, name: "Savings Plan", icon: "💰", returns: "5-7%", risk: "Low" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Investment Hub</Text>
          <Text style={styles.subtitle}>Grow your wealth intelligently</Text>
        </View>

        <View style={styles.portfolioCard}>
          <Text style={styles.portfolioLabel}>Portfolio Value</Text>
          <Text style={styles.portfolioValue}>ZAR 156,789</Text>
          <Text style={styles.portfolioGrowth}>+12.5% this month</Text>
        </View>

        <View style={styles.investmentSection}>
          <Text style={styles.sectionTitle}>Investment Options</Text>
          <View style={styles.investmentGrid}>
            {investmentOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.investmentCard}>
                <Text style={styles.investmentIcon}>{option.icon}</Text>
                <Text style={styles.investmentName}>{option.name}</Text>
                <Text style={styles.investmentReturns}>Returns: {option.returns}</Text>
                <Text style={styles.investmentRisk}>Risk: {option.risk}</Text>
                <TouchableOpacity style={styles.investButton}>
                  <Text style={styles.investButtonText}>Invest</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  scrollView: { flex: 1 },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#f8fafc" },
  subtitle: { fontSize: 16, color: "#94a3b8", marginTop: 4 },
  portfolioCard: {
    backgroundColor: "#1e293b",
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  portfolioLabel: { fontSize: 16, color: "#94a3b8", marginBottom: 4 },
  portfolioValue: { fontSize: 32, fontWeight: "bold", color: "#f8fafc", marginBottom: 4 },
  portfolioGrowth: { fontSize: 16, color: "#10b981", fontWeight: "600" },
  investmentSection: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#f8fafc", marginBottom: 16 },
  investmentGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  investmentCard: {
    width: "48%",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  investmentIcon: { fontSize: 32, marginBottom: 8 },
  investmentName: { fontSize: 16, fontWeight: "bold", color: "#f8fafc", marginBottom: 4 },
  investmentReturns: { fontSize: 12, color: "#10b981", marginBottom: 2 },
  investmentRisk: { fontSize: 12, color: "#f59e0b", marginBottom: 8 },
  investButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  investButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
