import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import BlogPage from './blog/BlogPage';
import CreateBlogPage from './blog/CreateBlogPage';
import MyBlogsPage from './blog/MyBlogsPage';


const MainContent = () => {
    return (
      <Router>
        <div className="App">
          <AuthenticatedTemplate>
            <Routes>
              {/* Add authenticated routes here */}
            </Routes>
          </AuthenticatedTemplate>
  
          <UnauthenticatedTemplate>
            <Routes>
              <Route path='/home' element = {<HomePage/>} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/createBlog" element={<CreateBlogPage />} />
              {/* <Route path="/myblogs" element={<MyBlogsPage />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LoginPage />} />
              {/* Add unauthenticated routes here */}
            </Routes>
          </UnauthenticatedTemplate>
        </div>
      </Router>
    );
  };
  

export default function App() {
    return (
            <MainContent/>
      );
}