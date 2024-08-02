import React, { useState, useEffect } from 'react'
import  Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import service from '../appwrite/config'
import authService from "../appwrite/auth.js";

function AllPosts() {

  const [posts, setPosts] = useState([])
  //const [id, setId] = useState('')

  useEffect(() => {
      try {
        ;(async() => {
          const id = await authService.getCurrentUser()
          const uid = id.$id
          await service.getPosts(uid).then((posts) => {
            if(posts) {
              setPosts(posts.documents)
            }
          })
          
        })()
      } catch (error) {
          console.error(error.message)
          throw error.message
      }
  }, [])

  // Method to retreive posts from database and hold it in "posts" array
  

  return (
    <div className='w-full py-8 bg-black'>
      <Container>
        <div className='flex flex-wrap '>
          {posts.map((post) => (
             <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts