import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity
} from 'react-native';

const MyCart = ({ navigation }) => {

	const [product, setProduct] = useState();
	const [total, setTotal] = useState(null);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDB();
		});

		return unsubscribe;
	}, [navigation]);

	//get data from local DB by ID
	const getDataFromDB = () => {

	};


	return (
		<View>
			<ScrollView>
				<View>
					<TouchableOpacity>

					</TouchableOpacity>
				</View>
				<Text>
					Order Details
				</Text>
			</ScrollView>
		</View>
	);
};

export default MyCart