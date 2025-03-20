import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Modal, Button, Card, Title, Paragraph, ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import { Pencil, Trash2, MapPin } from 'lucide-react-native';
import { getCityList, addCity, updateCity, deleteCity } from "../../../Service/cityService";

const City = ({ theme }) => {
    const [cities, setCities] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentCity, setCurrentCity] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cityToDelete, setCityToDelete] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getCityList();
            if (response.status === 200) setCities(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching cities:", error);
            setError("Failed to load cities. Please try again.");
            setIsLoading(false);
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
        if (!name.trim()) {
            alert("City name is required");
            return;
        }
        try {
            setIsLoading(true);
            if (currentCity) {
                await updateCity(currentCity.cityId, { name, description });
            } else {
                await addCity({ name, description });
            }
            fetchCities();
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving city:", error);
            alert("Failed to save city. Please try again.");
            setIsLoading(false);
        }
    };

    const confirmDelete = (city) => {
        setCityToDelete(city);
        setShowDeleteDialog(true);
    };

    const handleDelete = async () => {
        if (!cityToDelete) return;
        
        try {
            setIsLoading(true);
            setShowDeleteDialog(false);
            await deleteCity(cityToDelete.cityId);
            fetchCities();
        } catch (error) {
            console.error("Error deleting city:", error);
            alert("Failed to delete city. Please try again.");
            setIsLoading(false);
        } finally {
            setCityToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
        setCityToDelete(null);
    };

    const renderEmptyState = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <MapPin size={48} color={theme.colors.elevation.level4} />
            <Text style={{ fontSize: 18, color: theme.colors.elevation.level5, marginTop: 16 }}>No cities found</Text>
            <Text style={{ 
                fontSize: 14, 
                color: theme.colors.elevation.level4, 
                marginTop: 8, 
                textAlign: 'center', 
                paddingHorizontal: 24 
            }}>
                Add your first city by clicking the "Add City" button above
            </Text>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}>
            {/* Header Section */}
            <View style={{ marginBottom: 24 }}>
                <Text style={{ color: theme.colors.elevation.level5, marginTop: 4 }}>Add, edit and manage city information</Text>
            </View>
            
            {/* Action Button */}
            <Button 
                mode="contained" 
                onPress={() => openModal()} 
                style={{ marginBottom: 20, alignSelf: 'flex-start' }}
                icon="plus"
                buttonColor={theme.colors.primary}
            >
                Add City
            </Button>
            
            {/* Error State */}
            {error && (
                <View style={{ 
                    backgroundColor: theme.dark ? 'rgba(248, 113, 113, 0.2)' : '#FEF2F2', 
                    padding: 16, 
                    marginBottom: 20, 
                    borderRadius: 8, 
                    borderWidth: 1, 
                    borderColor: theme.dark ? 'rgba(248, 113, 113, 0.4)' : '#FECACA' 
                }}>
                    <Text style={{ color: theme.dark ? '#F87171' : '#DC2626' }}>{error}</Text>
                    <Button 
                        style={{ marginTop: 8, alignSelf: 'flex-start' }} 
                        onPress={fetchCities}
                        textColor={theme.colors.primary}
                    >
                        Try Again
                    </Button>
                </View>
            )}
            
            {/* City List */}
            {isLoading && cities.length === 0 ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={{ marginTop: 16, color: theme.colors.elevation.level5 }}>Loading cities...</Text>
                </View>
            ) : (
                <FlatList
                    data={cities}
                    keyExtractor={(item) => item.cityId.toString()}
                    renderItem={({ item }) => (
                        <Card 
                            style={{ 
                                marginBottom: 16, 
                                borderRadius: theme.roundness, 
                                backgroundColor: theme.colors.surface,
                                borderWidth: 1,
                                borderColor: theme.colors.elevation.level1
                            }}
                        >
                            <Card.Content>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <MapPin size={16} color={theme.colors.primary} style={{ marginRight: 8 }} />
                                    <Title style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primary }}>{item.name}</Title>
                                </View>
                                <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                                    {item.description || "No description available"}
                                </Paragraph>
                            </Card.Content>
                            <Card.Actions style={{ 
                                flexDirection: 'row', 
                                justifyContent: 'flex-end', 
                                paddingTop: 8,
                                borderTopWidth: 1,
                                borderTopColor: theme.colors.elevation.level1
                            }}>
                                <Button 
                                    mode="text" 
                                    onPress={() => openModal(item)}
                                    textColor={theme.colors.primary}
                                    icon={({color}) => <Pencil size={16} color={color} />}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    mode="text" 
                                    textColor={theme.colors.error}
                                    onPress={() => confirmDelete(item)}
                                    icon={({color}) => <Trash2 size={16} color={color} />}
                                >
                                    Delete
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                    ListEmptyComponent={renderEmptyState}
                    contentContainerStyle={cities.length === 0 ? { flex: 1 } : {}}
                />
            )}

            {/* Add/Edit Modal */}
            <Modal 
                visible={isOpen} 
                onDismiss={() => setIsOpen(false)} 
                contentContainerStyle={{ 
                    backgroundColor: theme.colors.surface, 
                    padding: 24, 
                    borderRadius: theme.roundness, 
                    marginHorizontal: 20,
                    maxWidth: 500,
                    alignSelf: 'center',
                    width: '100%'
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                    <MapPin size={24} color={theme.colors.primary} style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.onSurface }}>
                        {currentCity ? "Edit City" : "Add New City"}
                    </Text>
                </View>
                
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: theme.colors.onSurface }}>City Name *</Text>
                    <TextInput 
                        placeholder="Enter city name" 
                        value={name} 
                        onChangeText={setName} 
                        style={{ 
                            padding: 12,
                            borderWidth: 1,
                            borderColor: theme.colors.elevation.level3,
                            borderRadius: theme.roundness,
                            backgroundColor: theme.colors.elevation.level1,
                            color: theme.colors.onSurface
                        }}
                        placeholderTextColor={theme.colors.elevation.level4}
                    />
                </View>
                
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: theme.colors.onSurface }}>Description</Text>
                    <TextInput 
                        placeholder="Enter description" 
                        value={description} 
                        onChangeText={setDescription} 
                        style={{ 
                            padding: 12,
                            borderWidth: 1,
                            borderColor: theme.colors.elevation.level3,
                            borderRadius: theme.roundness,
                            backgroundColor: theme.colors.elevation.level1,
                            color: theme.colors.onSurface,
                            textAlignVertical: "top",
                            minHeight: 100
                        }}
                        multiline
                        numberOfLines={4}
                        placeholderTextColor={theme.colors.elevation.level4}
                    />
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                    <Button 
                        mode="outlined" 
                        onPress={() => setIsOpen(false)}
                        textColor={theme.colors.onSurface}
                        style={{ borderColor: theme.colors.elevation.level3 }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        mode="contained" 
                        onPress={handleSave}
                        buttonColor={theme.colors.primary}
                    >
                        {currentCity ? "Update" : "Create"}
                    </Button>
                </View>
            </Modal>

            {/* Delete Confirmation Dialog */}
            <Portal>
                <Dialog
                    visible={showDeleteDialog}
                    onDismiss={cancelDelete}
                    style={{
                        backgroundColor: theme.colors.surface,
                        borderRadius: theme.roundness
                    }}
                >
                    <Dialog.Icon icon="alert" color={theme.colors.error} />
                    <Dialog.Title style={{ textAlign: 'center', color: theme.colors.onSurface }}>
                        Delete City
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}>
                            Are you sure you want to delete {cityToDelete?.name}? This action cannot be undone.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={cancelDelete} textColor={theme.colors.onSurfaceVariant}>Cancel</Button>
                        <Button 
                            onPress={handleDelete} 
                            textColor={theme.colors.error}
                            style={{ marginLeft: 8 }}
                        >
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default City;