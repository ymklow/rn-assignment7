import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getProducts() {
  try {
    const rawProducts = await AsyncStorage.getItem('fashion-favourites');
    if (!rawProducts) {
      return [];
    }
    const products = JSON.parse(rawProducts);
    return products;
  } catch (err) {
    console.log("Err:", err);
    return [];
  }
}

export async function setProducts(products) {
  try {
    const rawProducts = JSON.stringify(products);
    await AsyncStorage.setItem('fashion-favourites', rawProducts);
  } catch (err) {
    console.log("Set Err:", err);
  }
}

export async function addProduct(product) {
  const existingProducts = await getProducts();
  if (existingProducts.some(p => p.id === product.id)) {
    return;
  }
  existingProducts.push(product);
  setProducts(existingProducts);
}

export async function removeProduct(productId) {
  const existingProducts = await getProducts();
  const updatedProducts = existingProducts.filter(product => product.id !== productId);
  await setProducts(updatedProducts);
}

export async function hasProduct(productId) {
  const existingProducts = await getProducts();
  return existingProducts.some(product => product.id === productId);
}
