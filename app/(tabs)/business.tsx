import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function BusinessScreen() {
  const router = useRouter();

  const businessFeatures = [
    { id: 1, name: "Revenue Analytics", icon: "📊", description: "Track income and growth", action: () => router.push("/business/analytics") },
    { id: 2, name: "Expense Management", icon: "💰", description: "Monitor business spending", action: () => alert("Expense Management") },
    { id: 3, name: "Payroll", icon: "👥", description: "Employee payments", action: () => alert("Payroll") },
    { id: 4, name: "Tax Planning", icon: "🧾", description: "Tax optimization tools", action: () => alert("Tax Planning") },
    { id: 5, name: "Invoice Management", icon: "📄", description: "Create and track invoices", action: () => alert("Invoice Management") },
    { id: 6, name: "Business Loans", icon: "🏦", description: "Funding opportunities", action: () => alert("Business Loans") },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Business Hub</Text>
          <Text style={styles.subtitle}>Manage your enterprise finances</Text>
        </View>

        <View style={styles.featuresGrid}>
          {businessFeatures.map((feature) => (
            <TouchableOpacity key={feature.id} style={styles.featureCard} onPress={feature.action}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureName}>{feature.name}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>ZAR 245,680</Text>
              <Text style={styles.statLabel}>Monthly Revenue</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>ZAR 89,450</Text>
              <Text style={styles.statLabel}>Monthly Expenses</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>+18.5%</Text>
              <Text style={styles.statLabel}>Growth Rate</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Active Clients</Text>
            </View>
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
  featuresGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    padding: 10,
    justifyContent: "space-between"
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: { fontSize: 32, marginBottom: 8 },
  featureName: { fontSize: 14, fontWeight: "bold", color: "#f8fafc", textAlign: "center", marginBottom: 4 },
  featureDescription: { fontSize: 12, color: "#94a3b8", textAlign: "center" },
  statsSection: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#f8fafc", marginBottom: 16 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statCard: {
    width: "48%",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#3b82f6", marginBottom: 4 },
  statLabel: { fontSize: 12, color: "#94a3b8", textAlign: "center" },
});
