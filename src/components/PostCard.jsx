import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title , featuredImage}) {

  const image = service.getFilePreview(featuredImage)

  return (
    <Link to={`/post/${$id}`}>
       <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={image} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard




// import React, { useEffect, useState } from 'react';
// import service from '../appwrite/config';
// import { Link } from 'react-router-dom';

// function PostCard({ $id, title, featuredImage }) {
//     const [imageSrc, setImageSrc] = useState('');

//     useEffect(() => {
//         async function fetchImage() {
//             const url = await service.getFilePreview(featuredImage);
//             setImageSrc(url);
//         }
//         fetchImage();
//     }, [featuredImage]);

//     return (
//         <Link to={`/post/${$id}`}>
//             <div className='w-full bg-gray-100 rounded-xl p-4'>
//                 <div className='w-full justify-center mb-4'>
//                     {imageSrc ? (
//                         <img src={imageSrc} alt={title} className='rounded-xl' />
//                     ) : (
//                         <div>Loading...</div>
//                     )}
//                 </div>
//                 <h2 className='text-xl font-bold'>{title}</h2>
//             </div>
//         </Link>
//     );
// }

// export default PostCard;