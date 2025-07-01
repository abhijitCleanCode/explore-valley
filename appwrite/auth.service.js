// only this file is tightly coupled with appwrite
import appwriteConfig from 'config/appwriteConfig';
import { Client, Account, Databases, Avatars, ID, Query } from 'react-native-appwrite';

export class AuthService {
  client = new Client();
  account;
  databases;
  avatars;

  constructor() {
    this.client
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId)
      .setPlatform(appwriteConfig.platform);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.avatars = new Avatars(this.client);
  }

  async createUser(email, password, name, role) {
    try {
      const newAccount = await this.account.create(ID.unique(), email, password, name, role);
      if (!newAccount) throw new Error('Failed to create user');

      // on successful account creation create a new profile pic with name initial
      const avatarURL = this.avatars.getInitials(name);

      const newUser = await this.databases.createDocument(
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
      console.log('appwrite :: auth.service :: createUser :: error: ', error);
      throw new Error(error);
    }
  }

  async signInUser(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      if (!session) {
        throw new Error('Failed to sign in user');
      }

      const logginUserDetails = await getCurrentUser();

      return { session, logginUserDetails };
    } catch (error) {
      console.log('appwrite :: auth.service :: signInUser :: error: ', error);
      throw new Error(error);
    }
  }

  async getCurrentUser() {
    try {
      const currentAccount = await this.account.get();
      if (!currentAccount) {
        throw new Error('Failed to get current user');
      }

      // const currentUser = await this.databases.listDocuments(
      //   appwriteConfig.databaseId,
      //   appwriteConfig.userCollectionId,
      //   [Query.equal('accoundId', currentAccount.$id)]
      // );
      // if (!currentUser) {
      //   throw new Error('User not found');
      // }
      console.log('appwrite :: auth.service :: getCurrentUser :: currentUser: ', currentAccount);

      return currentAccount;
    } catch (error) {
      console.log('appwrite :: auth.service :: getCurrentUser :: error: ', error);
      throw new Error(error);
    }
  }

  async signOutUser() {
    try {
      const session = await this.account.deleteSession('current');

      return session;
    } catch (error) {
      console.log('appwrite :: auth.service :: signOutUser :: error: ', error);
      throw new Error(error);
    }
  }
}

const authService = new AuthService();

export default authService;
