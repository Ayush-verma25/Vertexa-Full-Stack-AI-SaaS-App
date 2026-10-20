import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./pages/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const WriteArticle = lazy(() => import("./pages/WriteArticle"));
const BlogTitles = lazy(() => import("./pages/BlogTitles"));
const GenerateImages = lazy(() => import("./pages/GenerateImages"));
const RemoveBackground = lazy(() => import("./pages/RemoveBackground"));
const RemoveObject = lazy(() => import("./pages/RemoveObject"));
const ReviewResume = lazy(() => import("./pages/ReviewResume"));
const Community = lazy(() => import("./pages/Community"));

const App = () => {
  return (
    <div>
      <Toaster />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-sm text-slate-500" role="status">
            Loading Vertexa...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="blog-titles" element={<BlogTitles />} />
            <Route path="generate-images" element={<GenerateImages />} />
            <Route path="remove-background" element={<RemoveBackground />} />
            <Route path="remove-object" element={<RemoveObject />} />
            <Route path="review-resume" element={<ReviewResume />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
