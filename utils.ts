import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

export const saveLoginValues = async (values: {
  email: string;
  password: string;
}) => {
  try {
    const jsonValue = JSON.stringify(values);
    await AsyncStorage.setItem("LOGIN_VALUES", jsonValue);
  } catch (error) {
    console.error("Error saving login values:", error);
    throw new Error("Failed to save login values.");
  }
};

export const getLoginValues = async (): Promise<{
  email: string;
  password: string;
} | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem("LOGIN_VALUES");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving login values:", error);
    throw new Error("Failed to retrieve login values.");
  }
};

export const removeLoginValues = async () => {
  try {
    await AsyncStorage.removeItem("LOGIN_VALUES");
  } catch (error) {
    console.error("Error removing login values:", error);
    throw new Error("Failed to remove login values.");
  }
};
