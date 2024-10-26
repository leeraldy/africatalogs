import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/profile.css';

// Mock data for saved and created posts
const savedPosts = [
    { id: 1, title: 'Best Hotel in Town', category: 'Hotels', date: '2023-10-01' },
    { id: 2, title: 'Top Restaurant Picks', category: 'Restaurants', date: '2023-09-25' },
];

const createdPosts = {
    Hotels: [
        { id: 1, title: 'Luxury Hotel Experience', date: '2023-09-15' },
        { id: 2, title: 'Affordable Stay', date: '2023-09-10' },
    ],
    Restaurants: [
        { id: 1, title: 'Gourmet Dining', date: '2023-08-22' },
    ],
    Cafes: [
        { id: 1, title: 'Cozy Coffee Spots', date: '2023-09-05' },
    ],
    Pharmacies: [],
    'Travel Agencies': [],
};

const Profile = () => {
    const { user } = useContext(AuthContext); // Assuming user context provides user info

    return (
        <section className="profile-page">
            <Container>
                <Row>
                    <Col lg="4" className="user-info">
                        <h2>{user?.username}</h2>
                        <p><strong>Email: </strong>{user?.email}</p>
                        <p><strong>Joined: </strong>January 2022</p>
                        <Button className="btn btn-dark">
                            <Link to="/edit-profile">Edit Profile</Link>
                        </Button>
                    </Col>

                    <Col lg="8">
                        <div className="profile-content">
                            {/* Saved Posts Section */}
                            <section className="saved-posts">
                                <h3>Saved Posts</h3>
                                <ul>
                                    {savedPosts.length > 0 ? (
                                        savedPosts.map((post) => (
                                            <li key={post.id}>
                                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                                                <span> - {post.category}</span>
                                                <span> ({post.date})</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No saved posts yet.</p>
                                    )}
                                </ul>
                            </section>

                            {/* Created Posts Section */}
                            <section className="created-posts">
                                <h3>Created Posts</h3>
                                {Object.keys(createdPosts).map((category) => (
                                    <div key={category}>
                                        <h4>{category}</h4>
                                        <ul>
                                            {createdPosts[category].length > 0 ? (
                                                createdPosts[category].map((post) => (
                                                    <li key={post.id}>
                                                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                                                        <span> ({post.date})</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <p>No {category} posts created.</p>
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Profile;
