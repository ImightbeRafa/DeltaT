import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogPost';

function Blog() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchBlogPosts(currentPage);
    }, [currentPage]);

    const fetchBlogPosts = (page) => {
        axios.get(`/api/blogposts/?page=${page}`)
            .then(response => {
                setBlogPosts(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 posts per page
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    };

    return (
        <div className="blog-index">
            <div className="blog-header">
                <Link to="/" className="home-link">
                    <span className="home-icon">🏠</span> Home
                </Link>
                <h1>Blog Posts</h1>
            </div>
            <div className="blog-list">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-preview">
                        <h2><Link to={`/blog/${post.id}`}>{post.title}</Link></h2>
                        <p>{post.content.substring(0, 150)}...</p>
                        <p>Published: {new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button 
                        key={page} 
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Blog;