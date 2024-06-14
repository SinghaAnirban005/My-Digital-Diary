import conf from "../conf/conf"; 
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
  client = new Client();
  databases;
  bucket;
 
  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Method To create post 
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      );
      // Return the created post data
      return response;
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      throw error;
    }

  }
  

  //Method for Updating the post
  async updatePost(slug, {title, content, featuredImage, status}){
    
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,

            }
        )
    } catch (error) {
        console.log("Error in updating post", error);
    }
}

// Method for Deleting the post
async deletePost(slug){
  try {
      await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
      
      )

      return true

  } catch (error) {
      console.log("Error in deleting post: ", error);
      return false
  }

}

// To retrieve a particular post
async getPost(slug){
  try {
      return await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
      
      )
  } catch (error) {
      console.log("Error in getting post: ", error);
      return false
  }
}

//To get all posts based on query
async getPosts(queries = [Query.equal("status", "active")]){
  try {
      return await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          queries,
  
      ) 
  } catch (error) {
      console.log("Error in getting posts", error);
      return false
  }
}

// File Services...

// To upload file
async uploadFile(file){
  try {
      return await this.bucket.createFile(
          conf.appwriteBucketId,
          ID.unique(),
          file
      )
  } catch (error) {
      console.log("Error in uploading file", error);
      return false
  }
}

// To delete file
async deleteFile(fileId){

  try {
      await this.bucket.deleteFile(
          conf.appwriteBucketId,
          fileId
      )
      return true
      
  } catch (error) {
      console.log("Error in deleting file", error);
      return false
  }

}

// Method to get preview of uploaded file
getFilePreview(fileId){
 
    const result = this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    );

    return result;

}

 
}




const service = new Service()

export default service