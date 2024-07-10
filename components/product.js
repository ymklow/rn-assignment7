import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { PlusCircleIcon, ShoppingBagIcon } from 'react-native-heroicons/outline';
import { addProduct, hasProduct, removeProduct } from '../storage';

export default function Product({ id, name, price, image, isListView, refresh, refreshFlag, navigation }) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    async function checkIsInCart() {
      const isInCartNow = await hasProduct(id);
      setIsInCart(isInCartNow);
    }
    checkIsInCart();
  }, [refreshFlag]);

  const handleAddToCart = async () => {
    const product = { id, title: name, price, image: image.uri };
    if (!isInCart) {
      await addProduct(product);
      setIsInCart(true);
    } else {
      await removeProduct(id);
      setIsInCart(false);
    }
    refresh(prev => !prev);
  };

  return (
    <TouchableOpacity 
      style={{ width: isListView ? '100%' : '48%', marginBottom: 20 }} 
      onPress={() => navigation.navigate('ProductDetail', { productId: id })}
    >
      <View style={{ width: '100%' }}>
        <View style={{ position: 'relative', marginBottom: 10 }}>
          <Image source={image} style={{ width: '100%', height: undefined, aspectRatio: 1 }} />
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 10, right: 10 }}
            onPress={handleAddToCart}
          >
            {isInCart ? (
              <ShoppingBagIcon color={'red'} size={40} />
            ) : (
              <PlusCircleIcon color={'yellow'} size={40} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', gap: 5 }}>
          <Text style={{ fontSize: 20, fontFamily: 'ArefRuqaa_400Regular' }}>{name}</Text>
          <Text style={{ color: 'orange', fontFamily: 'ArefRuqaa_400Regular', fontSize: 20 }}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
