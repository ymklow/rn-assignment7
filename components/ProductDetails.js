import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { getProductDetailsFromApi } from '../api';
import { addProduct, hasProduct, removeProduct } from '../storage';
import { HeartIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetail({ navigation, refresh, refreshFlag }) {
    const route = useRoute();
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

    useFocusEffect(
        useCallback(() => {
            async function fetchProductDetails() {
                const productDetails = await getProductDetailsFromApi(productId);
                setProduct(productDetails);
                const isInCartNow = await hasProduct(productId);
                setIsInCart(isInCartNow);
            }
            fetchProductDetails();
        }, [productId, refreshFlag])
    );

    const handleAddToCart = async () => {
        if (!isInCart) {
            await addProduct(product);
            setIsInCart(true);
        } else {
            await removeProduct(productId);
            setIsInCart(false);
        }
        refresh(prev => !prev);
    };

    if (!product) {
        return <Text>Loading...</Text>;
    }

    return (
        
        <ScrollView>
            <View style={{ padding: 20, marginTop:50 }}>
                <Image source={{ uri: product.image }} style={{ width: '100%', height: 300 , resizeMode:'contain'}} />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.title}</Text>
                <Text style={{ marginVertical: 10 }}>{product.description}</Text>
                <Text style={{ fontSize: 20, color: 'green' }}>${product.price}</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>Icons: Do not bleach, Do not tumble dry, Dry clean, Iron at max</Text>
                </View>
            </View>
        
            <View style={{position:'absolute', top:"130%", width:'100%' , }}>
            <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'black', }}
                onPress={handleAddToCart}
            >
                <HeartIcon color={'white'} size={20} />
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 10,  }}>{isInCart ? 'Remove from Cart' : 'Add to Cart'}</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        
    );
}
