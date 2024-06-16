import React from 'react'
import PostForm from '../components/post-form/PostForm'
import Container from '../components/container/Container'

function AddPost() {
  return (
    
    <div className='-mt-6 py-8 bg-black'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost