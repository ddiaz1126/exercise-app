import { Slot, Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{  headerShown: false }} />
            <Stack.Screen name="signup" options={{  headerShown: false }} />
            <Stack.Screen name="addExercise" options={{  headerShown: false }} />
            <Stack.Screen name="addWorkout" options={{  headerShown: false }} />
            <Stack.Screen name="cardioHistory" options={{  headerShown: false }} />
            <Stack.Screen name="addRun" options={{ headerShown: false }} />
            <Stack.Screen name="workoutsView" options={{  headerShown: false }} />
        </Stack>
    );
}

