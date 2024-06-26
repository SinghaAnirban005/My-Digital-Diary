import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";


export default function Post() {
    const [post, setPost] = useState(null);
    // useParams() allows you to access the parameters of the current route.
    const { slug } = useParams();
    const navigate = useNavigate();


    // Need to improve checking ...
    const isAuthor = post ? true : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        }
        else navigate("/");
    }, [slug, navigate]);

    // Method to delete post and remove image associated wth it ... 
    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                
                service.deleteFile(post.featuredImage);
                navigate("/");

            }
        });
    };


    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>

                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                   {/* Parser -- Converts a HTML string into react element */}
                <div className="browser-css">
                    {parse(post.content)}
                    </div>

            </Container>
        </div>
    ) : null;
}