import React, { useState, useEffect } from 'react'
import  Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import service from '../appwrite/config'


function AllPosts() {

  const [posts, setPosts] = useState([])

  // Method to retreive posts from database and hold it in "posts" array
  service.getPosts([]).then((posts) => {
    if(posts) {
      setPosts(posts.documents)
    }
  })

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