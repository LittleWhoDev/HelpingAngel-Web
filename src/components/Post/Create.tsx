import {
  createPost,
  CreatePostForm,
  PostCategories,
  PostCategory,
  PostCategoryDisplay,
  PostType,
  PostTypeDisplay,
  PostTypes,
} from '@/api/posts';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Create: React.FC<{}> = () => {
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm<CreatePostForm>();
  const onSubmit = handleSubmit(async (formData) => {
    const newFormData: CreatePostForm = {
      ...formData,
      category: parseInt(formData.category as string, 10) as PostCategory,
      type: parseInt(formData.type as string, 10) as PostType,
    };

    try {
      await createPost(newFormData);
    } catch (e) {
      setError('Could not create post');
    }
  });

  return (
    <>
      {error !== '' ? error : null}
      <form onSubmit={onSubmit}>
        Title: <input name="title" ref={register({ required: true })} />
        Type:
        {PostTypes.map((type) => (
          <>
            {PostTypeDisplay[type]}
            <input
              name="type"
              type="radio"
              value={type}
              ref={register({ required: true })}
            />
          </>
        ))}
        Category:
        {PostCategories.map((category) => (
          <>
            {PostCategoryDisplay[category]}
            <input
              name="category"
              type="radio"
              value={category}
              ref={register({ required: true })}
            />
          </>
        ))}
        Description: <input name="description" ref={register} />
        <button type="submit">Create</button>
      </form>
    </>
  );
};
export default Create;
