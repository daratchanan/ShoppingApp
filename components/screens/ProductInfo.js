import React, { useState, useEffect } from 'react';
import {
	View,
	Text
} from 'react-native';
import { Items } from '../database/Database';

const ProductInfo = ({ route, navigation }) => {
	const { productID } = route.params;

	const [product, setProduct] = useState({});

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDB();
		});

		return unsubscribe;
	}, [navigation])

	//get product data by productID
	const getDataFromDB = async () => {
		for (let i = 0; i < Items.length; i++) {
			if (Items[i].id === productID) {
				await setProduct(Items[i]);
				return;
			}
		}
	};

	console.log('product=>', product);


	return (
		<View>
			<Text>ProductInfo{productID}</Text>
		</View>
	);
};

export default ProductInfo;