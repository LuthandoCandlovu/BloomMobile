import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function BankApp() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Alex!</Text>
          <Text style={styles.subtitle}>Welcome to Bloom Bank</Text>
        </View>

        {/* Total Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$12,458.23</Text>
          <Text style={styles.accountNumber}>Primary Account •••• 4832</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>⇄</Text>
              <Text style={styles.actionText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>💳</Text>
              <Text style={styles.actionText}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📥</Text>
              <Text style={styles.actionText}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>⋯</Text>
              <Text style={styles.actionText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>Netflix</Text>
              <Text style={styles.transactionDate}>Nov 12, 2024</Text>
            </View>
            <Text style={styles.negative}>-$15.99</Text>
          </View>
          <View style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>Salary Deposit</Text>
              <Text style={styles.transactionDate}>Nov 10, 2024</Text>
            </View>
            <Text style={styles.positive}>+$3,450.00</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  balanceCard: {
    backgroundColor: "#2d5b7c",
    margin: 20,
    padding: 24,
    borderRadius: 16,
  },
  balanceLabel: {
    color: "#ffffff",
    fontSize: 16,
    opacity: 0.9,
  },
  balanceAmount: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
  accountNumber: {
    color: "#ffffff",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#2d5b7c",
    fontWeight: "600",
  },
  transactionsSection: {
    padding: 20,
  },
  transactionItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  transactionDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  positive: {
    color: "#22c55e",
    fontWeight: "600",
  },
  negative: {
    color: "#ef4444",
    fontWeight: "600",
  },
});
