import React, { useState, useEffect } from 'react';
import {
	View,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	FlatList,
	Image,
	Dimensions,
	Animated,
	Text
} from 'react-native';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductInfo = ({ route, navigation }) => {
	const { productID, data } = route.params;

	const [product, setProduct] = useState({});

	const { width } = Dimensions.get('window');

	const scrollX = new Animated.Value(0);

	let position = Animated.divide(scrollX, width);

	//get product data by productID
	// const getDataFromDB = async () => {
	// 	for (let i = 0; i < Items.length; i++) {
	// 		if (Items[i].id === productID) {
	// 			await setProduct(Items[i]);
	// 			return;
	// 		};
	// 	};
	// };

	const getDataFromDB = () => {
		const productDetail = Items.find(f => f.id === productID);
		setProduct(productDetail);
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDB();
		});

		return unsubscribe;
	}, [navigation]);


	//product horizental scroll product card
	const renderProduct = ({ item, index }) => {
		return (
			<View
				style={{
					width: width,
					height: 240,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Image
					source={item}
					style={{
						width: '100%',
						height: '100%',
						resizeMode: 'contain'
					}}
				/>
			</View>
		);
	};

	// console.log('width=>', width);
	// console.log('productID=>', productID);
	// console.log('data=> ', data);
	// console.log('product=> ', product);
	// console.log('scrollX=>', scrollX);
	return (
		<View
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: COLOURS.white,
				position: 'relative',
			}}>
			<StatusBar
				backgroundColor={COLOURS.white}
				barStyle='dark-content'
			/>
			<ScrollView>
				<View
					style={{
						width: '100%',
						backgroundColor: COLOURS.backgroundLight,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
						position: 'relative',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 4,
					}}
				>
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingTop: 16,
							paddingLeft: 16,
						}}
					>
						<TouchableOpacity onPress={() => navigation.goBack('Home')}>
							<Entypo
								name='chevron-left'
								style={{
									fontSize: 18,
									color: COLOURS.backgroundDark,
									backgroundColor: COLOURS.white,
									padding: 12,
									borderRadius: 10,
								}}
							/>
						</TouchableOpacity>
					</View>
					<FlatList
						data={product.productImageList ? product.productImageList : null}
						horizontal
						renderItem={renderProduct}
						showsHorizontalScrollIndicator={false}
						decelerationRate={1}
						snapToInterval={width}
						bounces={false}
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { x: scrollX } } }],
							{ useNativeDriver: false },
						)}
					/>
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 16,
							marginTop: 32
						}}
					>
						{product.productImageList ?
							product.productImageList.map((data, index) => {
								let opacity = position.interpolate({
									inputRange: [index - 1, index, index + 1],
									outputRange: [0.2, 1, 0.2],
									extrapolate: 'clamp',
								});
								return (
									<Animated.View
										key={index}
										style={{
											width: '16%',
											height: 2.4,
											backgroundColor: COLOURS.black,
											opacity,
											marginHorizontal: 4,
											borderRadius: 100,
										}}
									/>
								);
							})
							: null}
					</View>
				</View>

				<View
					style={{
						paddingHorizontal: 16,
						marginTop: 6,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginVertical: 14
						}}
					>
						<Ionicons
							name='cart'
							style={{
								fontSize: 18,
								color: COLOURS.blue,
								marginRight: 6,
							}}
						/>
						<Text
							style={{
								fontSize: 12,
								color: COLOURS.black
							}}
						>
							Shopping
						</Text>

					</View>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginVertical: 4
						}}
					>
						<Text
							style={{
								fontSize: 24,
								fontWeight: '600',
								letterSpacing: 0.5,
								color: COLOURS.black,
								marginVertical: 4,
								maxWidth: '84%'
							}}
						>
							{product.productName}
						</Text>
						<Ionicons
							name='link-outline'
							style={{
								fontSize: 24,
								color: COLOURS.blue,
								backgroundColor: COLOURS.blue + 10,
								padding: 8,
								borderRadius: 50
							}}
						/>
					</View>

					<Text
						style={{
							fontSize: 12,
							fontWeight: '400',
							color: COLOURS.black,
							letterSpacing: 1,
							opacity: 0.5,
							lineHeight: 20,
							maxWidth: '85%',
							maxHeight: 44,
							marginBottom: 18,
						}}
					>
						{product.description}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginVertical: 14,
							borderBottomColor: COLOURS.backgroundLight,
							borderBottomWidth: 1,
							paddingBottom: 20,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								width: '80%',
								alignItems: 'center'
							}}
						>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									color: COLOURS.blue,
									backgroundColor: COLOURS.backgroundLight,
									padding: 12,
									borderRadius: 50,
									marginRight: 10,
								}}
							>
								<Entypo
									name='location-pin'
									style={{
										fontSize: 16,
										color: COLOURS.blue
									}}
								/>
							</View>
							<Text>Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
						</View>
						<Entypo
							name='chevron-right'
							style={{
								fontSize: 22,
								color: COLOURS.backgroundDark,
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default ProductInfo;