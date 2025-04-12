"use client";

import { useEffect } from "react";

export default function MyComponent() {
     const[posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch('/api/posts');
                const response = await data.json();
                setPosts(response);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            Welcome to Next.JS and MySQL connection.
            {posts.map((post) => (
               <div>{post.post}</div>
                ))}
        </div>
    );
}
