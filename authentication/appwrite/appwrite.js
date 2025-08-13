import { Client, Account, Databases } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1", // Your Appwrite endpoint
  projectId: "6869e692000ba3729548", // Your Appwrite project ID
  databaseId: "689b7920003340bba0bb",
  collectionId: "689b7943000c39667dc8"
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
