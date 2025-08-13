import { account } from "./appwrite";

// Sign up
export async function register(email, password, name) {
  try {
    return await account.create("unique()", email, password, name);
  } catch (err) {
    throw err;
  }
}

// Login
export async function login(email, password) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (err) {
    throw err;
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

// Logout
export async function logout() {
  try {
    await account.deleteSession("current");
  } catch (err) {
    throw err;
  }
}
