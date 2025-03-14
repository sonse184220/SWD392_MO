import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { getDistrictList } from "../../Service/districtService";

const District = () => {
    const [districts, setDistricts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentDistrict, setCurrentDistrict] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cityId, setCityId] = useState("");

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        try {
            const response = await getDistrictList();
            if (response.status === 200) setDistricts(response.data);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const openModal = (district = null) => {
        if (district) {
            setCurrentDistrict(district);
            setName(district.name);
            setDescription(district.description);
            setCityId(district.cityId.toString());
        } else {
            setCurrentDistrict(null);
            setName("");
            setDescription("");
            setCityId("");
        }
        setIsOpen(true);
    };

    const handleSave = async () => {
        const method = currentDistrict ? "PUT" : "POST";
        const endpoint = currentDistrict ? `/api/districts/${currentDistrict.districtId}` : "/api/districts";
        try {
            await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, cityId: Number(cityId) })
            });
            fetchDistricts();
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving district:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/districts/${id}`, { method: "DELETE" });
            fetchDistricts();
        } catch (error) {
            console.error("Error deleting district:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="+ Add District" onPress={() => openModal()} />
            <FlatList
                data={districts}
                keyExtractor={(item) => item.districtId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text>ID: {item.districtId}</Text>
                        <Text>Name: {item.name}</Text>
                        <Text>Description: {item.description}</Text>
                        <Text>City ID: {item.cityId}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => openModal(item)}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.districtId)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Modal visible={isOpen} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <TextInput placeholder="Enter district name" value={name} onChangeText={setName} style={styles.input} />
                    <TextInput placeholder="Enter description" value={description} onChangeText={setDescription} style={styles.input} />
                    <TextInput placeholder="Enter City ID" value={cityId} onChangeText={setCityId} keyboardType="numeric" style={styles.input} />
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
    actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    editButton: { color: "white", backgroundColor: "blue", fontWeight: "bold", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, marginHorizontal: 5 },
  deleteButton: { color: "white", backgroundColor: "red", fontWeight: "bold", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, marginHorizontal: 5 },
    modalContainer: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "rgba(0,0,0,0.5)" },
    input: { backgroundColor: "white", marginBottom: 15, padding: 10, borderRadius: 8 },
    modalButtons: { flexDirection: "row", justifyContent: "space-between" }
});

export default District;
