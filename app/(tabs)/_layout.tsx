import { View, Text } from "react-native"
import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';


const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: Colors.colors.tabActive, // Use primary color for active tab
                tabBarInactiveTintColor: Colors.colors.tabNotActive,  // Use grey color for inactive tabs
                tabBarStyle: { backgroundColor: Colors.colors.dark }, // Set tab bar background color
            }}
        >
            <Tabs.Screen
                name="runs"
                options={{  
                    tabBarLabel: "MyRuns",
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="man"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="workouts"
                options={{  
                    tabBarLabel: "Workouts",
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="menu"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Dashboard"
                options={{  
                    tabBarLabel: "Dashboard",
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="calendar"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="trainer"
                options={{  
                    tabBarLabel: "Trainer",
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="home"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{  
                    tabBarLabel: "Accounts",
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name="user"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;