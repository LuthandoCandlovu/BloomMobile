import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m Bloom AI Assistant. How can I help you with your banking today?', isUser: false, time: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();
  const router = useRouter();

  const commonQuestions = [
    'How do I transfer money?',
    'What are my account fees?',
    'How to apply for a loan?',
    'Where can I find my statements?',
    'What is my current balance?',
    'How to report fraud?'
  ];

  const aiResponses = {
    'transfer': 'To transfer money: Go to the "Pay & Transfer" tab, enter recipient details, amount, and confirm. You can do instant or scheduled transfers.',
    'fees': 'Your Premium account has no monthly fees. Transaction fees: ZAR 10 for instant transfers, free for standard transfers. ATM withdrawals: ZAR 8.50 at other banks.',
    'loan': 'You can apply for loans in the "More" tab → "Loans". Requirements: 3 months account history, good credit score. Current rates start at 11.5% p.a.',
    'statements': 'Access statements in "Accounts" tab → select account → "Statements". You can download PDF statements for up to 7 years.',
    'balance': 'Your current total balance is ZAR 146,813.10. Check the home screen for detailed account breakdown.',
    'fraud': 'Immediately call our 24/7 fraud hotline: 0800 123 456. Also freeze your card in the app under "Security Center".',
    'default': 'I understand you\'re asking about banking services. For specific account details or transactions, please check the relevant sections in the app. Is there anything else I can help with?'
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let response = aiResponses.default;
      
      const userText = inputText.toLowerCase();
      if (userText.includes('transfer') || userText.includes('send money')) {
        response = aiResponses.transfer;
      } else if (userText.includes('fee') || userText.includes('charge')) {
        response = aiResponses.fees;
      } else if (userText.includes('loan') || userText.includes('borrow')) {
        response = aiResponses.loan;
      } else if (userText.includes('statement') || userText.includes('history')) {
        response = aiResponses.statements;
      } else if (userText.includes('balance') || userText.includes('how much')) {
        response = aiResponses.balance;
      } else if (userText.includes('fraud') || userText.includes('stolen') || userText.includes('hack')) {
        response = aiResponses.fraud;
      }

      const aiMessage = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        time: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    setTimeout(() => sendMessage(), 100);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Bloom AI Assistant</Text>
          <Text style={styles.headerSubtitle}>24/7 Banking Support</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.messageBubble,
            message.isUser ? styles.userBubble : styles.aiBubble
          ]}>
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userText : styles.aiText
            ]}>
              {message.text}
            </Text>
            <Text style={styles.messageTime}>
              {formatTime(message.time)}
            </Text>
          </View>
        ))}
        
        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Bloom AI is typing...</Text>
            <View style={styles.typingDots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Questions */}
      <View style={styles.quickQuestions}>
        <Text style={styles.quickQuestionsTitle}>Quick Questions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {commonQuestions.map((question, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.quickQuestionButton}
              onPress={() => handleQuickQuestion(question)}
            >
              <Text style={styles.quickQuestionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything about banking..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: { padding: 8 },
  backText: { fontSize: 20, color: '#3b82f6', fontWeight: 'bold' },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#f8fafc' },
  headerSubtitle: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  headerRight: { width: 40 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 20, paddingBottom: 10 },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: { color: '#ffffff' },
  aiText: { color: '#f8fafc' },
  messageTime: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  typingText: { fontSize: 14, color: '#94a3b8', marginBottom: 4 },
  typingDots: { flexDirection: 'row', justifyContent: 'center' },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94a3b8',
    marginHorizontal: 2,
  },
  quickQuestions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 12,
  },
  quickQuestionButton: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickQuestionText: {
    fontSize: 12,
    color: '#e2e8f0',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    backgroundColor: '#0f172a',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f8fafc',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
