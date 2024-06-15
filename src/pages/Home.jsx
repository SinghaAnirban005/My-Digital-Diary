import React from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import service from '../appwrite/config'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Home() {

  const [posts, setPosts] = useState([])
  // Method to retreive all posts and hold it in posts array...
  useEffect(() => {
    service.getPosts().then((posts) => {
      if(posts) {
        setPosts(posts.documents)
      }
})
  }, [])

  const active = useSelector((state) => state.auth.status)

  //Handling scene when there are no posts or user is logged out ... 
if (posts.length === 0 || !active) {
    return (
        <div className="w-full py-8 text-center bg-blue-600">
          {/* <Header /> */}
            <Container> 
            
                <div className="flex flex-wrap pt-10"> 
             
                    <div className="p-2 w-full">
                    
                        <h1 className="text-2xl font-bold hover:text-gray-200 py-32">
                           {!active ? <p>Login To View Posts</p> : <p>Create Posts to view here</p>}
                        </h1>
                    </div>
                   
                </div>
               
            </Container>
            {/* <Footer /> */}
        </div>
    )
}

  return (
    <div className='w-full py-8 bg-blue-600'>
       <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                           {/* Using spread operator so that all posts are displayed when the PostCard component renders */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
      
    </div>
  )
}

export default Home