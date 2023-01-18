import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyCart = ({ navigation }) => {

	const [product, setProduct] = useState();
	const [total, setTotal] = useState(null);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDB();
		});

		return unsubscribe;
	}, [navigation])


	//get data from local DB by ID
	const getDataFromDB = async () => {
		let items = await AsyncStorage.getItem('cartItems');
		items = JSON.parse(items);
		let productData = [];

		if (items) {
			Items.forEach(data => {
				if (items.includes(data.id)) {
					productData.push(data);
					return;
				}
			});
			setProduct(productData);
			getTotal(productData);
		} else {
			setProduct(false);
			getTotal(false);
		}
	};

	const getTotal = (productData) => {
		let total = 0;
		for (let i = 0; i < productData.length; i++) {
			let productPrice = productData[i].productPrice;
			total = total + productPrice;
		}
		setTotal(total);
	};

	//remove data from Cart
	const removeItemFromCart = () => {
		
	};

	const renderProducts = (data, index) => {
		return (
			<TouchableOpacity
				onPress={() => navigation.navigate('ProductInfo', { productID: data.id, data })}
				style={{
					width: '100%',
					height: 100,
					marginVertical: 6,
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<View
					style={{
						width: '30%',
						height: 100,
						padding: 14,
						backgroundColor: COLOURS.backgroundLight,
						// justifyContent: 'center',
						// alignItems: 'center',
						borderRadius: 10,
						marginRight: 22
					}}
				>
					<Image
						source={data.productImage}
						style={{
							width: '100%',
							height: '100%',
							resizeMode: 'contain'
						}}
					/>
				</View>
				<View
					style={{
						flex: 1,
						height: '100%',
						justifyContent: 'space-around'
					}}
				>
					<Text
						style={{
							maxWidth: '100%',
							fontSize: 14,
							fontWeight: '600',
							color: COLOURS.black,
							letterSpacing: 1,
						}}
					>
						{data.productName}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 4,
							opacity: 0.6
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: '400',
								maxWidth: '85%',
								marginRight: 4
							}}
						>
							฿ {data.productPrice}
						</Text>
						<Text>
							(฿ {data.productPrice + data.productPrice / 20})
						</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<View
								style={{
									marginRight: 20,
									padding: 4,
									borderWidth: 1,
									borderRadius: 100,
									borderColor: COLOURS.backgroundMedium,
									opacity: 0.5
								}}
							>
								<MaterialCommunityIcons
									name='minus'
									style={{
										fontSize: 16,
										color: COLOURS.backgroundDark
									}}
								/>
							</View>
							<Text>1</Text>
							<View
								style={{
									marginLeft: 20,
									padding: 4,
									borderWidth: 1,
									borderRadius: 100,
									borderColor: COLOURS.backgroundMedium,
									opacity: 0.5
								}}
							>
								<MaterialCommunityIcons
									name='plus'
									style={{
										fontSize: 16,
										color: COLOURS.backgroundDark
									}}
								/>
							</View>
						</View>
						<TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
							<MaterialCommunityIcons
								name='delete-outline'
								style={{
									fontSize: 16,
									color: COLOURS.backgroundDark,
									backgroundColor: COLOURS.backgroundLight,
									padding: 8,
									borderRadius: 50
								}}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		)
	};


	// console.log('product=>', product);

	return (
		<View
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: COLOURS.white,
				// position: 'relative'
			}}>
			<ScrollView>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						paddingTop: 16,
						paddingHorizontal: 16,
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Entypo
							name='chevron-left'
							style={{
								fontSize: 18,
								color: COLOURS.backgroundDark,
								backgroundColor: COLOURS.backgroundLight,
								padding: 12,
								borderRadius: 12
							}}
						/>
					</TouchableOpacity>
					<Text
						style={{
							fontSize: 14,
							fontWeight: '400',
							color: COLOURS.black,
						}}
					>
						Order Details
					</Text>
					<View></View>
				</View>
				<Text
					style={{
						fontSize: 20,
						fontWeight: '500',
						color: COLOURS.black,
						letterSpacing: 1,
						paddingTop: 20,
						paddingLeft: 16,
						marginBottom: 10
					}}
				>
					My Cart
				</Text>
				<View style={{ paddingHorizontal: 16 }}>
					{product ? product.map(renderProducts) : null}
				</View>
			</ScrollView>
		</View>
	);
};

export default MyCart