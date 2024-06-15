import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {

  const navigate = useNavigate()
  const {slug} = useParams()
  const [post, setPosts] = useState(null)

  useEffect(() => {
    if(slug) {
      service.getPost(slug).then((post) => {
        if(post) {
          setPosts(post)
        }
    })

    }

    else{
      navigate("/")
    }
  }, [slug, navigate])

  // If post exists then we display postform component 
  return post ? <div className='py-8 bg-blue-600'>
  <Container>
      <PostForm post={post} />
  </Container>
</div> : null

}


export default EditPost