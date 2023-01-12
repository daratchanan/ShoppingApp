import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StatusBar,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS, Items } from '../database/Database';

const Home = ({ navigation }) => {

	const [products, setProducts] = useState([]);
	const [accessory, setAccessory] = useState([]);

	useEffect(() => {

		// const t = navigation.add
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDB();
		});

		return unsubscribe;
	}, [navigation])

	//get data from db
	const getDataFromDB = () => {
		let productList = [];
		let accessoryList = [];

		for (let i = 0; i < Items.length; i++) {
			if (Items[i].category == 'product') {
				productList.push(Items[i]);
			} else if (Items[i].category == 'accessory') {
				accessoryList.push(Items[i]);
			}
		}

		setProducts(productList);
		setAccessory(accessoryList);
	};

	return (
		<View
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: COLOURS.white,
			}}
		>
			<StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
			<ScrollView
			// showsVerticalScrollIndicator={false}
			>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 16,
					}}
				>
					<TouchableOpacity>
						<FontAwesome
							name='shopping-bag'
							style={{
								fontSize: 18,
								color: COLOURS.backgroundMedium,
								backgroundColor: COLOURS.backgroundLight,
								padding: 12,
								borderRadius: 10,
							}}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name='cart'
							style={{
								fontSize: 18,
								color: COLOURS.backgroundMedium,
								padding: 12,
								borderRadius: 10,
								borderWidth: 1,
								borderColor: COLOURS.backgroundLight
							}}
						/>
					</TouchableOpacity>
				</View>

				<View
					style={{
						padding: 16,
						marginBottom: 10,
					}}>
					<Text
						style={{
							fontSize: 26,
							fontWeight: '500',
							color: COLOURS.black,
							letterSpacing: 1,
							marginBottom: 10,
						}}
					>
						Hi-Fi Shop &amp; Service
						{/* Hi-Fi Shop & Service */}
					</Text>
					<Text
						style={{
							fontSize: 14,
							fontWeight: '400',
							color: COLOURS.black,
							letterSpacing: 1,
							lineHeight: 24,
						}}
					>
						Audio shop on Rustaveli Ave 57.
						{'\n'}This shop offers both products and services
					</Text>
				</View>

				<View style={{ padding: 16 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<Text
								style={{
									fontSize: 18,
									fontWeight: '500',
									color: COLOURS.black,
									letterSpacing: 1,
								}}
							>
								Products
							</Text>
							<Text
								style={{
									fontSize: 14,
									fontWeight: '400',
									color: COLOURS.black,
									opacity: 0.5,
									marginLeft: 10,
								}}
							>
								41
							</Text>
						</View>
						<Text
							style={{
								fontSize: 14,
								fontWeight: '400',
								color: COLOURS.blue,
							}}
						>
							See all
						</Text>
					</View>

					<View>
						{products.map(data => {
							return <Text>{data.productName}</Text>
						})}
					</View>
				</View>

			</ScrollView>
		</View>
	);
};

export default Home;