import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Image, TextInput, StyleSheet, } from "react-native";

export default GMap = (props) => {
	const [textInput1, onChangeTextInput1] = useState('');
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView  style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.box}>
					</View>
					<ImageBackground 
						source={{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d6df1958-f0c7-49cd-9abd-3007e332fb58"}} 
						resizeMode = {'stretch'}
						style={styles.column2}
						>
						<View style={styles.row}>
							<View style={styles.column3}>
								<Image
									source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f600b93c-b8db-459b-9dd5-6ab63b710506"}} 
									resizeMode = {"stretch"}
									style={styles.image}
								/>
								<View style={styles.absoluteBox}>
								</View>
							</View>
							<TextInput
								placeholder={"Direction"}
								value={textInput1}
								onChangeText={onChangeTextInput1}
								style={styles.input}
							/>
						</View>
						<View style={styles.column4}>
							<Image
								source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/03950797-2615-4fbe-a02f-ad63cb47223e"}} 
								resizeMode = {"stretch"}
								style={styles.image2}
							/>
							<Image
								source = {{uri: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6d4d9440-236f-4da3-86df-2eb5224677a1"}} 
								resizeMode = {"stretch"}
								style={styles.image3}
							/>
						</View>
					</ImageBackground>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	absoluteBox: {
		position: "absolute",
		bottom: -2,
		right: 0,
		width: 4,
		height: 5,
		backgroundColor: "#72635D",
	},
	box: {
		width: 150,
		height: 30,
		backgroundColor: "#000000",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
		marginLeft: 126,
	},
	column: {
		alignItems: "flex-start",
	},
	column2: {
		height: 773,
		alignItems: "flex-start",
		paddingTop: 56,
		paddingBottom: 31,
		marginTop: -26,
	},
	column3: {
		width: 17,
		marginRight: 22,
	},
	column4: {
		marginBottom: 40,
		marginHorizontal: 11,
	},
	image: {
		height: 17,
	},
	image2: {
		width: 61,
		height: 61,
	},
	image3: {
		width: 62,
		height: 61,
	},
	image4: {
		width: 32,
		height: 32,
		marginRight: 40,
	},
	image5: {
		height: 32,
		marginTop: 8,
	},
	image6: {
		width: 32,
		height: 32,
		marginRight: 58,
	},
	image7: {
		width: 32,
		height: 32,
	},
	input: {
		color: "#72635D",
		fontSize: 17,
		fontWeight: "bold",
		flex: 1,
		paddingVertical: 12,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#72635D",
		borderRadius: 10,
		borderWidth: 1,
		paddingHorizontal: 11,
		marginBottom: 437,
		marginHorizontal: 35,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		paddingVertical: 6,
		paddingHorizontal: 24,
		marginLeft: 26,
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
		paddingHorizontal: 6,
	},
	view: {
		width: 68,
		backgroundColor: "#E81948",
		borderRadius: 100,
		paddingHorizontal: 18,
		marginRight: 40,
	},
});