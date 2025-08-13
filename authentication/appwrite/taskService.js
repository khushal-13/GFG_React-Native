// tasks.js
import { appwriteConfig, databases, Query } from "./appwrite";

const DATABASE_ID = appwriteConfig.databaseId;
const COLLECTION_ID = appwriteConfig.collectionId;

// Create Task
export async function createTask(task) {
  return await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    "unique()", // Document ID
    task
  );
}

// Get Tasks for Current User
export async function getTasks(userId) {
  return await databases.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [
      Query.equal("userId", userId)
    ]
  );
}

// Update Task
export async function updateTask(taskId, data) {
  return await databases.updateDocument(
    DATABASE_ID,
    COLLECTION_ID,
    taskId,
    data
  );
}

// Delete Task
export async function deleteTask(taskId) {
  return await databases.deleteDocument(
    DATABASE_ID,
    COLLECTION_ID,
    taskId
  );
}
