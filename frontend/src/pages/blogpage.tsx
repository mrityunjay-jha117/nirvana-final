import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/primary_components/dashboard/header";
import Footer from "../components/primary_components/dashboard/footer";
import BlogCard from "../components/primary_components/primary_components/cards/blog_card";
import SideScroll from "../components/primary_components/dashboard/side_scroll";
import HimeSkeleton from "../skeletons/userpage_skeleton"; // adjust path if needed
import SideScrollindesk from "../components/primary_components/dashboard/side_scroll_in_desktop";

const BlogPage: React.FC = () => {
  const [blogData, setBlogData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("jwt");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(
          `https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog/paginated_bulk?page=${currentPage}`,
          { headers }
        );
        if (response.ok) {
          const result = await response.json();
          if (result.blogs) {
            setBlogData(result.blogs);
            setTotalPages(result.totalPages);
          }
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="relative flex flex-col lg:flex-row">
        {/* Left Sidebar (mobile) */}
        <div className="relative lg:hidden mt-12 lg:mt-20">
          <SideScroll />
        </div>

        {/* Blog Content Section */}
        <div className="lg:w-3/4 mt-30 sm:mt-40 px-4">
          {isLoading ? (
            <div>
              <HimeSkeleton />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center mx-auto gap-5">
                {blogData.length > 0 ? (
                  blogData.map((blog) => (
                    <div
                      key={blog.id}
                      className="mb-20 w-19/20 sm:w-1/2  lg:w-1/3 xl:w-2/8 cursor-pointer"
                      onClick={() => navigate(`/blog/${blog.id}`)}
                    >
                      <BlogCard
                        image={blog.blogHead}
                        title={blog.title}
                        description={blog.description1}
                        showActions={false}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-xl mt-10 text-gray-500">
                    No blogs available.
                  </p>
                )}
              </div>

              {/* Pagination controls */}
              <div className="flex flex-row justify-center mb-10 space-x-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 text-lg rounded-full border ${
                      currentPage === i + 1
                        ? "bg-red-500 text-white"
                        : "bg-white border-2"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar (desktop) */}
        <div className="hidden lg:block lg:absolute right-0 w-1/4 lg:sticky top-16 bg-black h-screen lg:overflow-y-auto lg:z-10">
          <SideScrollindesk />
        </div>
      </div>

      <Footer fontColor="text-white" color="bg-black" />
    </div>
  );
};

export default BlogPage;
