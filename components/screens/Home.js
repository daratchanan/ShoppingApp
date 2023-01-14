import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS, Items } from '../database/Database';

const Home = ({ navigation }) => {

	const [products, setProducts] = useState([]);
	const [accessory, setAccessory] = useState([]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDB();
		});

		return unsubscribe;
	}, [navigation])


	//get data from db
	const getDataFromDB = () => {

		const productList = Items.filter(f => f.category === 'product');
		setProducts(productList);

		setAccessory(Items.filter(f => f.category === 'accessory'));

		//------------------
		// let productList = [];
		// let accessoryList = [];

		// for (let i = 0; i < Items.length; i++) {
		// 	if (Items[i].category === 'product') {
		// 		productList.push(Items[i]);
		// 	} else if (Items[i].category === 'accessory') {
		// 		accessoryList.push(Items[i]);
		// 	}
		// }

		// setProducts(productList);
		// setAccessory(accessoryList);

		//-----------------
		// let pd = [];
		// let acc = [];

		// for (const item of Items) {
		// 	if (item.category === 'product') {
		// 		pd.push(item)
		// 	} else if (item.category === 'accessory') {
		// 		acc.push(item)
		// 	};
		// };

		// setProducts(pd);
		// setAccessory(acc);
	};

	//create an product reuseable card
	const ProductCard = ({ data }) => {
		return (
			<TouchableOpacity
				onPress={() => navigation.navigate('ProductInfo', { productID: data.id, data })}
				style={{
					width: '48%',
					marginVertical: 14,
				}}
			>
				<View
					style={{
						width: '100%',
						height: 100,
						backgroundColor: COLOURS.backgroundLight,
						borderRadius: 10,
						position: 'relative',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 8,
					}}
				>
					{/* {data.isOff &&
						<View>
							<Text>
								{data.offPercentage}
							</Text>
						</View>
					} */}

					{data.isOff ? (
						<View
							style={{
								position: 'absolute',
								width: '20%',
								height: '24%',
								backgroundColor: COLOURS.green,
								top: 0,
								left: 0,
								borderTopLeftRadius: 10,
								borderBottomRightRadius: 10,
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Text
								style={{
									fontSize: 12,
									fontWeight: 'bold',
									color: COLOURS.white,
									letterSpacing: 1,
								}}
							>{data.offPercentage}%</Text>
						</View>
					) : null}
					<Image
						source={data.productImage}
						style={{
							width: '80%',
							height: '80%',
							resizeMode: 'contain'
						}}
					/>
				</View>
				<Text
					style={{
						fontSize: 12,
						fontWeight: '600',
						color: COLOURS.black,
						marginBottom: 2
					}}
				>
					{data.productName}
				</Text>
				{data.category === 'accessory' ? (
					data.isAvailable ? (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<FontAwesome
								name='circle'
								style={{
									fontSize: 12,
									color: COLOURS.green,
									marginRight: 6,
								}}
							/>
							<Text
								style={{
									fontSize: 12,
									color: COLOURS.green
								}}
							>
								Available
							</Text>
						</View>
					) : (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<FontAwesome
								name='circle'
								style={{
									fontSize: 12,
									color: COLOURS.red,
									marginRight: 6,
								}}
							/>
							<Text
								style={{
									fontSize: 12,
									color: COLOURS.red
								}}
							>
								unavailable
							</Text>
						</View>
					)
				) : null}
				<Text>
					฿ {data.productPrice}
				</Text>
			</TouchableOpacity>
		);
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
			<ScrollView showsVerticalScrollIndicator={false} >
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

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							flexWrap: 'wrap'
						}}
					>
						{products.map(data =>
							<ProductCard
								data={data}
								key={data.id}
							/>
						)}
					</View>
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
								Accessories
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
								78
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

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							flexWrap: 'wrap'
						}}
					>
						{accessory.map(data =>
							<ProductCard
								data={data}
								key={data.id}
							/>
						)}
					</View>
				</View>

			</ScrollView>
		</View>
	);
};

export default Home;