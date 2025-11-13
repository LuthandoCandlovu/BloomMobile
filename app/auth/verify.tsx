import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';

export default function VerifyScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, updateUser } = useUser();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      // You would typically use refs here for auto-focus
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    
    // Simulate verification
    setTimeout(() => {
      if (verificationCode === '123456') { // Demo code
        updateUser({ isVerified: true });
        router.replace('/(tabs)');
        Alert.alert('Success', 'Identity verified successfully!');
      } else {
        Alert.alert('Error', 'Invalid verification code. Try: 123456');
      }
      setLoading(false);
    }, 1500);
  };

  const resendCode = () => {
    setTimer(300);
    Alert.alert('Code Sent', 'New verification code sent to your registered device.');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🔐</Text>
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.subtitle}>Secure access required</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Luthando Candlovu</Text>
          <Text style={styles.userDetail}>luthando.candlovu30@gmail.com</Text>
          <Text style={styles.userDetail}>Premium Banking Client</Text>
        </View>

        <View style={styles.verificationSection}>
          <Text style={styles.instruction}>
            Enter the 6-digit verification code sent to your registered device
          </Text>
          
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Code expires in: <Text style={styles.timerHighlight}>{formatTime(timer)}</Text>
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.verifyButton, loading && styles.verifyButtonDisabled]} 
            onPress={handleVerify} 
            disabled={loading}
          >
            <Text style={styles.verifyButtonText}>
              {loading ? '🔄 Verifying...' : '✅ Verify Identity'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendButton} onPress={resendCode} disabled={timer > 0}>
            <Text style={[styles.resendText, timer > 0 && styles.resendTextDisabled]}>
              {timer > 0 ? `Resend code in ${formatTime(timer)}` : 'Resend Verification Code'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.securityNotice}>
          <Text style={styles.securityTitle}>🔒 Security Notice</Text>
          <Text style={styles.securityText}>
            • This verification ensures only you can access your account{'\n'}
            • Never share your verification code with anyone{'\n'}
            • Contact support immediately if suspicious
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { alignItems: 'center', padding: 20, paddingTop: 40 },
  logo: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#f8fafc', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#94a3b8' },
  content: { flex: 1, padding: 20 },
  userInfo: { 
    backgroundColor: '#1e293b', 
    padding: 20, 
    borderRadius: 16, 
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#f8fafc', marginBottom: 4 },
  userDetail: { fontSize: 14, color: '#94a3b8', marginBottom: 2 },
  verificationSection: { alignItems: 'center' },
  instruction: { 
    fontSize: 16, 
    color: '#e2e8f0', 
    textAlign: 'center', 
    marginBottom: 30,
    lineHeight: 24,
  },
  codeContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30,
    width: '100%',
  },
  codeInput: {
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#334155',
    borderRadius: 12,
    width: 50,
    height: 60,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  timerContainer: { marginBottom: 20 },
  timerText: { fontSize: 16, color: '#94a3b8' },
  timerHighlight: { color: '#ef4444', fontWeight: 'bold' },
  verifyButton: {
    backgroundColor: '#10b981',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  verifyButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  verifyButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resendButton: { padding: 12 },
  resendText: { color: '#3b82f6', fontSize: 16, fontWeight: '600' },
  resendTextDisabled: { color: '#6b7280' },
  securityNotice: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
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
