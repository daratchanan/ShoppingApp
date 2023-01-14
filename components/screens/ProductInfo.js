import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	FlatList,
	Image,
	Dimensions
} from 'react-native';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductInfo = ({ route, navigation }) => {
	const { productID, data } = route.params;

	const [product, setProduct] = useState({});

	const { width } = Dimensions.get('window');

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
		// console.log('productDetail =>',productDetail);
		setProduct(productDetail);
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDB();
		});

		return unsubscribe;
	}, [navigation]);


	//product horizental scroll product card
	const renderProduct = (d) => {
		// console.log('item=>', item);
		const {item,index} = d;
		
		return (
			<View
				style={{
					width: width,
					height: 240,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{/* <Text>{`index: ${d.index} : ${d.item.title}`}</Text> */}
				{/* <Text>{item}</Text> */}
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
	console.log('product=> ', product);

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
						data={product.productImageList}
						// data={['aa', 'bb', 'cc']}
						// data={[
						// 	{
						// 		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
						// 		title: 'First Item',
						// 	 },
						// 	 {
						// 		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
						// 		title: 'Second Item',
						// 	 },
						// 	 {
						// 		id: '58694a0f-3da1-471f-bd96-145571e29d72',
						// 		title: 'Third Item',
						// 	 },
						// ]}
						horizontal
						renderItem={renderProduct}

					/>
				</View>
			</ScrollView>
			{/* <Text>
				// {JSON.stringify(product)}
			</Text> */}
		</View>
	);
};

export default ProductInfo;