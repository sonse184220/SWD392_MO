import React, { useEffect } from "react";
import { View, Button, Alert } from "react-native";
import registerNNPushToken from "native-notify";

const NotificationButton = () => {
    registerNNPushToken(28377, 'Th8WOlG5eds2MxaDYrC6KT');
    const sendNotification = async () => {
        try {
            const response = await fetch("https://app.nativenotify.com/api/notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    appId: 28377,
                    appToken: "Th8WOlG5eds2MxaDYrC6KT",
                    title: "Push title here as a string",
                    body: "Push message here as a string",
                    dateSent: "3-18-2025 2:19PM"
                }),
            });

            const text = await response.text();
            console.log("Raw response:", text);

            try {
                const result = JSON.parse(text);
                console.log("Notification sent:", result);
                Alert.alert("Notification Sent", "Check your device!");
            } catch (parseError) {
                console.log("Non-JSON response received:", text);
                Alert.alert("Response", text);
            }
        } catch (error) {
            console.error("Error sending notification:", error);
            Alert.alert("Error", "Failed to send notification: " + error.message);
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Send Notification" onPress={sendNotification} />
        </View>
    );
};

export default NotificationButton;
