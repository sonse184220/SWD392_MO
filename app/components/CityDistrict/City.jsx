import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { getCityList } from "../../Service/cityService";

const City = () => {
    const [cities, setCities] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentCity, setCurrentCity] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await getCityList();
            if (response.status === 200) setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const openModal = (city = null) => {
        if (city) {
            setCurrentCity(city);
            setName(city.name);
            setDescription(city.description);
        } else {
            setCurrentCity(null);
            setName("");
            setDescription("");
        }
        setIsOpen(true);
    };

    const handleSave = async () => {
        const method = currentCity ? "PUT" : "POST";
        const endpoint = currentCity ? `/api/cities/${currentCity.cityId}` : "/api/cities";
        try {
            await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description })
            });
            fetchCities();
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving city:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/cities/${id}`, { method: "DELETE" });
            fetchCities();
        } catch (error) {
            console.error("Error deleting city:", error);
        }
    };

    return (
        <View className="flex flex-1" style={styles.container}>
            <View style={{marginBottom: 10, width: 150, marginLeft: 80}}>
            <Button title="+ Add City" onPress={() => openModal()} />
            </View>
            <FlatList className="bg-white" 
                data={cities}
                keyExtractor={(item) => item.cityId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text className="text-2xl" style={{fontWeight: "bold"}} >ID: {item.cityId}</Text>
                        <Text style={{fontSize: 20}} >Name: {item.name}</Text>
                        <Text style={{fontSize: 20}}>Description: {item.description}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => openModal(item)}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.cityId)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Modal visible={isOpen} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                <Text className="text-3xl text-center" style={{marginBottom: 10}} >Create City</Text>
                    <TextInput placeholder="Enter city name" value={name} onChangeText={setName} style={styles.input} />
                    <TextInput placeholder="Enter description" value={description} onChangeText={setDescription} style={styles.input} />
                    <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={() => setIsOpen(false)} />
                        <Button title="Save" onPress={handleSave} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    itemContainer: { marginBottom: 15, padding: 10, borderWidth: 1, borderRadius: 8 },
    actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
    editButton: { color: "white", backgroundColor: "blue", fontWeight: "bold", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, marginHorizontal: 5, width: 60, textAlign: "center" },
    deleteButton: { color: "white", backgroundColor: "red", fontWeight: "bold", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, marginHorizontal: 5, },
    modalContainer: {justifyContent: "center",marginLeft: 30, marginTop: 200, backgroundColor: "white", width: 300, height: 250, borderRadius: 15, borderStyle: "solid", borderWidth: 1	 },
    input: { backgroundColor: "white", padding: 10, borderRadius: 8, borderWidth: 1, margin: 10 },
    modalButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginRight: 15, paddingTop: 20  }
});

export default City;
