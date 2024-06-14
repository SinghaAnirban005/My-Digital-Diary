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

  // Method to Create Account...
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

  // Method for Handling Login of user
  async login({email, password}) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } 
    catch (error) {
      throw error
    }
  }

  // Fetching info of user 
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log('User:', user); // Debugging user retrieval
      return user;
    } catch (error) {
      console.log('Error Fetching User: ', error);
      throw error;
    }
  }
  

  //Handling Logout of user..
  async logout() {
    try {
      await this.account.deleteSessions()
    
    } catch (error) {
      console.log("Logout Error", error);
    }
  }

}

const authService = new AuthService()

export default authService