import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	ToastAndroid
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
	// const removeItemFromCart = async (id) => {
	// 	let itemArray = await AsyncStorage.getItem('cartItems');
	// 	itemArray = JSON.parse(itemArray);
	// 	if (itemArray) {
	// 		let array = itemArray;
	// 		for (let i = 0; i < array.length; i++) {
	// 			if (array[i] === id) {
	// 				array.splice(i, 1);
	// 			}

	// 			await AsyncStorage.setItem('cartItems', JSON.stringify(array));
	// 			getDataFromDB();
	// 		}
	// 	}
	// };

	const removeItemFromCart = async (id) => {
		let itemArray = await AsyncStorage.getItem('cartItems');
		itemArray = JSON.parse(itemArray);

		const tempCarts = [...itemArray];
		const newCarts = tempCarts.filter(f => f !== id)

		await AsyncStorage.setItem('cartItems', JSON.stringify(newCarts));
		getDataFromDB();
	};

	//checkout 
	const checkOut = async () => {
		try {
			await AsyncStorage.removeItem('cartItems');
		} catch (error) {
			return error;
		}

		ToastAndroid.show('Items will be Deliverd SOON!!', ToastAndroid.SHORT);
		navigation.navigate('Home');
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
							??? {data.productPrice}
						</Text>
						<Text>
							(??? {data.productPrice + data.productPrice / 20})
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
				<View
					style={{
						paddingHorizontal: 16,
						marginVertical: 10,
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: '500',
							letterSpacing: 1,
							color: COLOURS.black,
							marginBottom: 20
						}}
					>
						Delivery Location
					</Text>
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
								width: '80%',
								alignItems: 'center'
							}}
						>
							<MaterialCommunityIcons
								name='truck-delivery-outline'
								style={{
									fontSize: 18,
									color: COLOURS.blue,
									backgroundColor: COLOURS.backgroundLight,
									padding: 12,
									borderRadius: 10,
									marginRight: 18
								}}
							/>
							<View>
								<Text
									style={{
										fontSize: 14,
										fontWeight: '500',
										color: COLOURS.black
									}}
								>
									2 Petre Melikishvili St.
								</Text>
								<Text
									style={{
										fontSize: 12,
										fontWeight: '500',
										color: COLOURS.black,
										lineHeight: 20,
										opacity: 0.5
									}}
								>
									0162, Tbilisi
								</Text>
							</View>
						</View>

						<MaterialCommunityIcons
							name='chevron-right'
							style={{ fontSize: 22, color: COLOURS.black }}
						/>
					</View>
				</View>

				<View
					style={{
						paddingHorizontal: 16,
						marginVertical: 10,
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: '500',
							letterSpacing: 1,
							color: COLOURS.black,
							marginBottom: 20
						}}
					>
						Delivery Location
					</Text>
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
								width: '80%',
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									fontSize: 10,
									fontWeight: '900',
									letterSpacing: 1,
									color: COLOURS.blue,
									backgroundColor: COLOURS.backgroundLight,
									padding: 12,
									borderRadius: 10,
									marginRight: 18
								}}
							>
								Visa
							</Text>
							<View>
								<Text
									style={{
										fontSize: 14,
										fontWeight: '500',
										color: COLOURS.black
									}}
								>
									VISA Classic
								</Text>
								<Text
									style={{
										fontSize: 12,
										fontWeight: '400',
										color: COLOURS.black,
										lineHeight: 20,
										opacity: 0.5
									}}
								>
									****-9092
								</Text>
							</View>
						</View>

						<MaterialCommunityIcons
							name='chevron-right'
							style={{ fontSize: 22, color: COLOURS.black }}
						/>
					</View>
				</View>

				<View
					style={{
						paddingHorizontal: 16,
						marginTop: 40,
						marginBottom: 80,
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: '500',
							color: COLOURS.black,
							letterSpacing: 1,
							marginBottom: 20,
						}}
					>
						Order Info
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 8
						}}
					>
						<Text
							style={{
								fontSize: 12,
								fontWeight: '400',
								maxWidth: '80%',
								color: COLOURS.black,
								opacity: 0.5
							}}
						>
							Subtotal
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontWeight: '400',
								color: COLOURS.black,
								opacity: 0.5
							}}
						>
							??? {total}.00
						</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: 22
						}}
					>
						<Text
							style={{
								fontSize: 12,
								fontWeight: '400',
								maxWidth: '80%',
								color: COLOURS.black,
								opacity: 0.5
							}}
						>
							Shopping Tax
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontWeight: '400',
								color: COLOURS.black,
								opacity: 0.5
							}}
						>
							??? {total / 20}
						</Text>
					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 12,
								fontWeight: '400',
								maxWidth: '80%',
								color: COLOURS.black,
								opacity: 0.5
							}}
						>
							Total
						</Text>
						<Text
							style={{
								fontSize: 18,
								fontWeight: '500',
								color: COLOURS.black,
							}}
						>
							??? {total + total / 20}
						</Text>
					</View>
				</View>
			</ScrollView>

			<View
				style={{
					position: 'absolute',
					bottom: 10,
					width: '100%',
					height: '8%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					onPress={() => (total !== 0 ? checkOut() : null)}
					style={{
						backgroundColor: COLOURS.blue,
						width: '86%',
						height: '90%',
						borderRadius: 20,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							fontSize: 12,
							fontWeight: '500',
							color: COLOURS.white,
							letterSpacing: 1,
							textTransform: 'uppercase'
						}}
					>
						checkout (??? {total + total / 20})
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default MyCart;