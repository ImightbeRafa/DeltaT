import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BlogPost.css';

function BlogPost() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/blogposts/${id}/`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog post:', error);
            });
    }, [id]);

    if (!post) return <div>Loading...</div>;

    // Function to get the full image URL
    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${window.location.origin}${imageUrl}`;
    };

    return (
        <div className="blog-post">
            <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
            <h1>{post.title}</h1>
            <p className="post-meta">Published: {new Date(post.created_at).toLocaleDateString()}</p>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.image && <img src={getImageUrl(post.image)} alt={post.title} className="post-image" />}
        </div>
    );
}

export default BlogPost;