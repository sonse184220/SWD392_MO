import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
export default Fav = (props) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<Text style={styles.text}>
					{"Favourites"}
				</Text>
				<Image
					source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/464824bf-6eee-4de8-8254-68e25550b03e"}} 
					resizeMode = {"stretch"}
					style={styles.image}
				/>
				<Text style={styles.text2}>
					{"No favourites added yet!"}
				</Text>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#72635D",
		borderColor: "#72635D",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 16,
		marginBottom: 170,
		marginHorizontal: 38,
	},
	image: {
		width: 169,
		height: 167,
		marginBottom: 67,
		marginLeft: 122,
	},
	image2: {
		height: 32,
		marginTop: 8,
	},
	image3: {
		width: 32,
		height: 32,
		marginRight: 40,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		padding: 6,
		marginHorizontal: 36,
		shadowColor: "#1C1C1C1A",
		shadowOpacity: 0.1,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 30,
		elevation: 30,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderColor: "#000000",
		borderRadius: 30,
		borderWidth: 3,
		paddingTop: 61,
	},
	text: {
		color: "#000000",
		fontSize: 21,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 78,
	},
	text2: {
		color: "#000000",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 61,
	},
	text3: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "bold",
	},
	view: {
		width: 68,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		paddingHorizontal: 18,
		marginRight: 40,
	},
	view2: {
		width: 68,
		backgroundColor: "#E81948",
		borderRadius: 100,
		paddingHorizontal: 18,
		marginRight: 22,
	},
	view3: {
		width: 68,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		paddingHorizontal: 18,
	},
});