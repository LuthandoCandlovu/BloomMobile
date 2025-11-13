import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../context/UserContext";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  const accounts = user?.accounts || [];
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const quickActions = [
    { id: 1, name: "Send Money", icon: "💸", action: () => router.push("/(tabs)/transfers") },
    { id: 2, name: "Pay Bills", icon: "🧾", action: () => Alert.alert("Coming Soon", "Bill payments feature") },
    { id: 3, name: "AI Assistant", icon: "🤖", action: () => router.push("/chat/bot") },
    { id: 4, name: "Invest", icon: "📈", action: () => router.push("/(tabs)/invest") },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Refreshed", "Your account data has been updated");
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR"
    }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
        }
      >
        {/* Header with Logo */}
        <View style={styles.header}>
          <View style={styles.logoHeader}>
            <View style={styles.logoSmall}>
              <Text style={styles.logoSmallIcon}>🏦</Text>
            </View>
            <View>
              <Text style={styles.logoText}>BLOOM CAPITAL</Text>
              <Text style={styles.greeting}>Welcome, {user?.name?.split(" ")[0]}! 👋</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.notificationBell}
            onPress={() => Alert.alert("Notifications", "You have 3 new notifications")}
          >
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Text style={styles.toggleText}>{showBalance ? "👁️" : "👁️‍🗨️"}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {showBalance ? formatCurrency(totalBalance) : "•••••••"}
          </Text>
          <Text style={styles.accountNumber}>Primary Account • {user?.accounts?.[0]?.number}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionButton} onPress={action.action}>
                <View style={styles.actionIconCircle}>
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                </View>
                <Text style={styles.actionText}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Assistant Promo */}
        <View style={styles.aiPromo}>
          <Text style={styles.aiTitle}>🤖 Meet Bloom AI Assistant</Text>
          <Text style={styles.aiDescription}>
            Get instant answers to your banking questions, 24/7 support, and personalized financial advice.
          </Text>
          <TouchableOpacity style={styles.aiButton} onPress={() => router.push("/chat/bot")}>
            <Text style={styles.aiButtonText}>Chat Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  scrollView: { flex: 1 },
  header: { 
    padding: 20, 
    paddingTop: 10, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-start",
  },
  logoHeader: { flexDirection: "row", alignItems: "center" },
  logoSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoSmallIcon: { fontSize: 16, color: "#fff" },
  logoText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#3b82f6",
    letterSpacing: 1,
  },
  greeting: { fontSize: 18, fontWeight: "bold", color: "#f8fafc", marginTop: 2 },
  notificationBell: { padding: 8, position: "relative" },
  bellIcon: { fontSize: 20 },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
  balanceCard: { 
    backgroundColor: "#1e293b", 
    margin: 20, 
    padding: 24, 
    borderRadius: 20,
  },
  balanceHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  balanceLabel: { color: "#94a3b8", fontSize: 16 },
  toggleText: { fontSize: 20 },
  balanceAmount: { color: "#f8fafc", fontSize: 32, fontWeight: "bold", marginTop: 8 },
  accountNumber: { color: "#94a3b8", fontSize: 14, marginTop: 4 },
  quickActions: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#f8fafc", marginBottom: 16 },
  actionsGrid: { flexDirection: "row", justifyContent: "space-between" },
  actionButton: { alignItems: "center", padding: 8, width: "23%" },
  actionIconCircle: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: "#334155", 
    justifyContent: "center", 
    alignItems: "center",
    marginBottom: 8,
  },
  actionIcon: { fontSize: 20, color: "#fff" },
  actionText: { fontSize: 12, color: "#e2e8f0", fontWeight: "600", textAlign: "center" },
  aiPromo: {
    backgroundColor: "#8b5cf6",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  aiTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  aiDescription: { color: "rgba(255,255,255,0.8)", fontSize: 14, textAlign: "center", marginBottom: 16, lineHeight: 20 },
  aiButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  aiButtonText: { color: "#8b5cf6", fontWeight: "bold" },
});
