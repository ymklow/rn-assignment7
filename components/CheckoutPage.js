import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { removeProduct, getProducts } from '../storage';
import { ShoppingBagIcon } from 'react-native-heroicons/outline';
import Header1 from './header1';
export default function CheckoutPage() {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchCartProducts() {
      const products = await getProducts();
      setCartProducts(products);
      calculateTotalAmount(products);
    }
    fetchCartProducts();
  }, []);

  const calculateTotalAmount = (products) => {
    const total = products.reduce((sum, product) => sum + (product.price || 0), 0);
    setTotalAmount(total);
  };

  const handleRemoveFromCart = async (id) => {
    await removeProduct(id);
    const updatedProducts = await getProducts();
    setCartProducts(updatedProducts);
    calculateTotalAmount(updatedProducts);
  };

  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          {cartProducts.length === 0 ? (
            <Text>Your cart is empty.</Text>
          ) : (
            cartProducts.map((product, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', position: 'relative' }}>
                <Image source={{ uri: product.image }} style={{ width: 100, height: 100, marginRight: 20 , resizeMode:"contain"}} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 20 }}>{product.title}</Text>
                  <Text style={{ color: 'orange', fontSize: 18 }}>${product.price}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRemoveFromCart(product.id)}
                  style={{ position: 'absolute', bottom: 10, right: 10 }}
                >
                  <Text style={{ color: 'red' }}>Remove from Cart</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'black' }}>
        <ShoppingBagIcon color={'white'} size={20} />
        <Text style={{ color: 'white', fontSize: 18, marginLeft: 10 }}>Total: ${totalAmount.toFixed(2)}</Text>
      </View>
    </SafeAreaView>
  );
}
