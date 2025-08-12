import { Client, Account } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1", // Your Appwrite endpoint
  projectId: "6869e692000ba3729548", // Your Appwrite project ID
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
