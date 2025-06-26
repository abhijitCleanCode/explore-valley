import { Account, Avatars, Client, Databases, Storage, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.company.explorevalley',
  projectId: '68578fc50008fd3bbf07',
  databaseId: '685792db00009f1e43bd',
  userCollectionId: '6857930a002f43114c0f',
  newsCollectionId: '685c144100239ced1730',
  storageId: '685ccccb003e76de7c50',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, name, role) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name, role);
    if (!newAccount) throw new Error('Failed to create user');

    // on successful account creation create a new profile pic with name initial
    const avatarURL = avatars.getInitials(name);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name,
        email,
        accountId: newAccount.$id,
        nameInitialAvatar: avatarURL,
        role,
      }
    );

    return newUser;
  } catch (error) {
    console.log('lib :: appwrite :: createUser :: error: ', error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error('Failed to sign in');

    return session;
  } catch (error) {
    console.log('lib :: appwrite :: signIn :: error: ', error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('Failed to get current user');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser.documents.length) throw new Error('Failed to get current user');

    return currentUser.documents[0];
  } catch (error) {
    console.log('lib :: appwrite :: getCurrentUser :: error: ', error);
    throw new Error(error);
  }
};
