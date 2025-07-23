import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { analyzeProduct } from "../utils/api";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Linking } from "react-native";

export default function ClothingProductScreen() {
  const [productUrl, setProductUrl] = useState("");
  const [productResult, setProductResult] = useState(null);
  const navigation = useNavigation();

  const handleAnalyzeProduct = async () => {
    if (!productUrl) {
      Alert.alert("Please enter a product URL");
      return;
    }
    const result = await analyzeProduct(productUrl);
    setProductResult(result);
  };

  return (
    <View style={styles.gradientBg}>
      <View style={styles.container}>
        <Text style={styles.title}>Clothing Product Analyzer</Text>
        <Text style={styles.label}>Paste a clothing product URL below:</Text>
        <TextInput
          style={styles.input}
          value={productUrl}
          onChangeText={setProductUrl}
          placeholder="Paste clothing product URL here"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.analyzeBtn} onPress={handleAnalyzeProduct}>
          <Text style={styles.analyzeBtnText}>Analyze Product</Text>
        </TouchableOpacity>
        {productResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.sectionTitle}>Best Deal Links</Text>
            {Array.isArray(productResult.best_deal_links) && productResult.best_deal_links.length > 0 ? (
              productResult.best_deal_links.map((link, idx) => (
                <TouchableOpacity key={idx} onPress={() => Linking.openURL(link)}>
                  <Text style={styles.link}>{link}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noData}>No best deals found.</Text>
            )}

            <Text style={styles.sectionTitle}>Upcoming Sales (Next 1 Month)</Text>
            {Array.isArray(productResult.upcoming_sales) && productResult.upcoming_sales.length > 0 ? (
              productResult.upcoming_sales.map((sale, idx) => (
                <View key={idx} style={styles.saleCard}>
                  <Text style={styles.saleBrand}>{sale.brand}</Text>
                  <Text style={styles.saleDate}>Sale Date: {sale.sale_date}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(sale.sale_link)}>
                    <Text style={styles.link}>{sale.sale_link}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noData}>No upcoming sales found.</Text>
            )}
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Homescreen')}>
                <Text style={styles.backBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    backgroundColor: '#f1f8e9', // simple light green
    minHeight: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#f1f8e9', // match background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: '#43a047',
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a5d6a7',
    borderRadius: 12,
    padding: 10,
    marginBottom: 18,
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 15,
  },
  analyzeBtn: {
    backgroundColor: '#388e3c',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginBottom: 10,
  },
  analyzeBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
    color: '#388e3c',
  },
  link: {
    color: '#43a047',
    textDecorationLine: 'underline',
    marginBottom: 6,
    fontSize: 15,
  },
  noData: {
    color: '#388e3c',
    fontStyle: 'italic',
    marginBottom: 6,
    textAlign: 'center',
  },
  saleCard: {
    backgroundColor: '#f1f8e9',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  saleBrand: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#388e3c',
    marginBottom: 2,
  },
  saleDate: {
    color: '#43a047',
    marginBottom: 2,
    fontSize: 14,
  },
  backBtn: {
    backgroundColor: '#a5d6a7',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#388e3c',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
