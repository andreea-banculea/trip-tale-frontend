import React from "react";
import Navbar from "../home/Navbar";
import BlogCard from "../home/BlogCard";

function MyBlogsPage() {
    // const [blogs, setBlogs] = useState([]);


    return (
        <div >
            <Navbar />
            <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <h1></h1>
                <div className="row">
                    {/* {blogs.map((blog) => (
                        <div className="col-md-3" key={blog.id}>
                            <BlogCard title={blog.title}
                                content={blog.content}
                                location={blog.location}
                                photoURL={blog.photo} />
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default MyBlogsPage;