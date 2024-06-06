import conf from "../conf/conf"; 
import { Client, ID, Databases, Storage, Query, ImageFormat } from "appwrite"

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

  // In order to create Post we pass our attributes
  // async createPost({title, slug, content, featuredImage, status, userId}) {
  //   try {
  //     conf.appwriteDatabaseId,
  //     conf.appwriteCollectionId,
  //     slug, 
  //     {
  //       title, 
  //       content,
  //       featuredImage,
  //       status,
  //       userId
  //     }
      
  //   } catch (error) {
  //     console.log("Appwrite serive :: createPost :: error", error);
  //   }
  // }

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
      // Rethrow the error to propagate it to the caller
      throw error;
    }
  }
  

  //Updating the post
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
        console.log("Appwrite serive :: updatePost :: error", error);
    }
}

// Deleting the post
async deletePost(slug){
  try {
      await this.databases.deleteDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
      
      )
      return true
  } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false
  }
}

// To retrieve post 
async getPost(slug){
  try {
      return await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
      
      )
  } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false
  }
}

//To get all posts based on the status as active or not
async getPosts(queries = [Query.equal("status", "active")]){
  try {
      return await this.databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          queries,
  
      ) 
  } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false
  }
}

// File Services...
async uploadFile(file){
  try {
      return await this.bucket.createFile(
          conf.appwriteBucketId,
          ID.unique(),
          file
      )
  } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false
  }
}

async deleteFile(fileId){
  try {
      await this.bucket.deleteFile(
          conf.appwriteBucketId,
          fileId
      )
      return true
      
  } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false
  }
}


getFilePreview(fileId){
 // try {
    const result = this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
      // ImageFormat.Jpeg
    );

    return result;

  // } catch (error) {

  //   console.error("Error getting file preview:", error);
  
  // }
}

 
}




const service = new Service()

export default service