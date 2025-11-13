import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      if (username === "luthando" && password === "Bloom2024!") {
        const userData = {
          id: 'USER_001',
          name: 'Luthando Candlovu',
          email: 'luthando.candlovu30@gmail.com',
          phone: '+27 79 123 4567',
          accountType: 'premium',
          isVerified: false,
          accounts: [
            { id: 1, name: 'Private Wealth', number: '10017841', balance: 45230.75, currency: 'ZAR' },
            { id: 2, name: 'Easy Account', number: '10024832', balance: 12458.23, currency: 'ZAR' },
            { id: 3, name: 'Savings Plan', number: '10039156', balance: 89124.12, currency: 'ZAR' },
          ]
        };
        
        login(userData);
        router.replace('/auth/verify');
      } else {
        Alert.alert('Login Failed', 'Use: luthando / Bloom2024!');
      }
      setLoading(false);
    }, 1500);
  };

  const handleBiometricLogin = () => {
    Alert.alert(
      'Biometric Login',
      'Use Face ID or Fingerprint to login quickly',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Use Face ID', 
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              const userData = {
                id: 'USER_001',
                name: 'Luthando Candlovu',
                email: 'luthando.candlovu30@gmail.com',
                phone: '+27 79 123 4567',
                accountType: 'premium',
                isVerified: false,
                accounts: [
                  { id: 1, name: 'Private Wealth', number: '10017841', balance: 45230.75, currency: 'ZAR' },
                  { id: 2, name: 'Easy Account', number: '10024832', balance: 12458.23, currency: 'ZAR' },
                  { id: 3, name: 'Savings Plan', number: '10039156', balance: 89124.12, currency: 'ZAR' },
                ]
              };
              login(userData);
              router.replace('/auth/verify');
              setLoading(false);
            }, 1000);
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Header */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🏦</Text>
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoPrimary}>BLOOM</Text>
            <Text style={styles.logoSecondary}>CAPITAL</Text>
          </View>
        </View>
        <Text style={styles.tagline}>Enterprise Banking Solutions</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.welcome}>Welcome Back</Text>
        <Text style={styles.instruction}>Sign in to your enterprise account</Text>

        {/* Biometric Login Option - VERY VISIBLE */}
        <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricLogin}>
          <Text style={styles.biometricIcon}>👤</Text>
          <Text style={styles.biometricText}>Use Face ID / Biometric Login</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with credentials</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username / Employee ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>
            {loading ? "🔐 Verifying..." : "🚀 Sign In Securely"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot Password? • Contact IT Support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.securityFeatures}>
        <View style={styles.securityItem}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>256-bit Encryption</Text>
        </View>
        <View style={styles.securityItem}>
          <Text style={styles.securityIcon}>📱</Text>
          <Text style={styles.securityText}>Biometric Ready</Text>
        </View>
        <View style={styles.securityItem}>
          <Text style={styles.securityIcon}>🌐</Text>
          <Text style={styles.securityText}>Secure Connection</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  logoSection: { alignItems: 'center', marginTop: 40, marginBottom: 40 },
  logoContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoIcon: { fontSize: 24, color: '#fff' },
  logoTextContainer: { alignItems: 'flex-start' },
  logoPrimary: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#3b82f6',
    letterSpacing: 2,
  },
  logoSecondary: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#f8fafc',
    letterSpacing: 1,
    marginTop: -2,
  },
  tagline: { 
    fontSize: 14, 
    color: '#94a3b8', 
    textAlign: 'center',
  },
  form: { flex: 1, justifyContent: 'center' },
  welcome: { fontSize: 32, fontWeight: 'bold', color: '#f8fafc', marginBottom: 8, textAlign: 'center' },
  instruction: { fontSize: 16, color: '#94a3b8', marginBottom: 30, textAlign: 'center' },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
    marginBottom: 24,
  },
  biometricIcon: { fontSize: 20, marginRight: 12 },
  biometricText: { color: '#e2e8f0', fontSize: 16, fontWeight: '600' },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#94a3b8',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  inputContainer: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#e2e8f0', marginBottom: 8 },
  input: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 16,
    color: '#f8fafc',
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  forgotButton: { alignItems: 'center', marginTop: 20 },
  forgotText: { color: '#94a3b8', fontSize: 14 },
  securityFeatures: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#1e293b',
    borderRadius: 16,
  },
  securityItem: { alignItems: 'center' },
  securityIcon: { fontSize: 20, marginBottom: 8 },
  securityText: { fontSize: 12, color: '#94a3b8', textAlign: 'center' },
});
