import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client()
  account

  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl) 
    .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client)
  }

  // Handling account creation . Once created it will pass to login

  async createAccount ({email, password, name}) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      if(userAccount) {
        return this.login({email, password})
      }

      else{
        return userAccount
      }
      
    } catch (error) {
        throw error
    }
  }

  //Handling Login of user

  async login({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } 
    catch (error) {
      throw error
    }
  }

  //Function to retrieve the data of the current user
  // async getCurrentUser() {
  //   try {
  //     return await this.account.get()
  //   } 
  //   catch (error) {
  //     console.log("APPWRITE ERROR: ", error);
  //   }

  //   return null
  // }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log('User:', user); // Debugging user retrieval
      return user;
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser :: error', error);
      throw error; // Rethrow error for better error handling
    }
  }
  

  //Handling Logout of user..
  async logout() {
    try {
      await this.account.deleteSessions()
    
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }

}

const authService = new AuthService()

export default authService