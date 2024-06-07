import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({post}) {

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
    },
});

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deleteFile(post.featuredImage)
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      })

      if(dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }
 
    else {
      let file;
      try {
        file = await service.uploadFile(data.image[0]);
      } catch (uploadError) {
        console.error("Error uploading the file:", uploadError);
      }

      if (file) {
        const fileId = file.$id;
        const newData = {
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
        };

        let dbPost;
        try {
          dbPost = await service.createPost(newData);
        } catch (createError) {
          console.error("Error creating the post:", createError);
        }

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
          console.log("POST CREATED");
        } else {
          console.error("Failed to create the post.");
        }
      }
    }
    

    

  };


  const slugTransform = useCallback((value) => {
    if(value && typeof value === "string")
      return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z\d\s]+/g, "-")
    .replace(/\s/g, "-")

    return " "

  }, [])


// Interview Question ...
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });
    // returning the variable subsription as callback is used for oprimisation

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);


  return (
     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                {/* //Input designated for title of post  */}
                <Input 
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                
              {/* // Input designated for id and content.. */}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

              {/* // Input for posting images , required status will be false if post already exists... */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

              {/* // If post exists then shows the preview of the image in the form.... */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>

                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

              {/* // Button colour shall chnage to green once post is created and text would be change from Submit to Update */}
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-red-700"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

            </div>
        </form>
  )
}

export default PostForm