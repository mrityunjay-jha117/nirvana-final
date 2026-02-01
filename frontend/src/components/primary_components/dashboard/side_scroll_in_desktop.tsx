import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import get_dev_backend from "../../../store/get_backend_url";
export default function SideScrollindesk() {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("country");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("jwt");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let endpoint = "";
    switch (selectedField) {
      case "country":
        endpoint = `/location?country=${encodeURIComponent(searchQuery)}`;
        break;
      case "author":
        endpoint = `/author?name=${encodeURIComponent(searchQuery)}`;
        break;
      case "title":
        endpoint = `/title?title=${encodeURIComponent(searchQuery)}`;
        break;
      default:
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(
        `${get_dev_backend()}/blog/search${endpoint}`,
        { headers },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Fetched blogs:", result);
        setBlogs(result.blogs || []);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="sticky top-16 right-0 pb-30  lg:flex whitespace-nowrap cursor-grab lg:flex-col flex-shrink-0 w-full overflow-y-auto active:cursor-grabbing bg-black text-white p-4 gap-2 "
    >
      <h1 className="text-4xl lg:text-5xl xl:text-7xl font-extrabold text-left tracking-wide">
        Search
      </h1>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search by ${selectedField}`}
          className="h-9 rounded-full text-center mb-2 border-2 border-white text-white text-sm"
        />

        {/* Radio Buttons */}
        <div className="flex flex-row justify-around gap-1">
          {["author", "title", "country"].map((field) => (
            <label
              key={field}
              className={`cursor-pointer text-xs py-1 px-2 border-2  w-1/3 text-center rounded-full  ${
                selectedField === field
                  ? "bg-red-500 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              <input
                type="radio"
                name="searchField"
                value={field}
                checked={selectedField === field}
                onChange={(e) => setSelectedField(e.target.value)}
                className="hidden"
              />
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="p-2 w-full h-9 rounded-full mt-2 text-sm text-white tracking-wide 
             bg-green-600 cursor-pointer border-4 border-green-600 overflow-hidden relative flex items-center 
             justify-center group transition-all duration-500"
        >
          <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          <span className="relative group-hover:text-green-600 transition-colors duration-500">
            Search
          </span>
        </button>
      </form>

      {/* Results */}
      {loading && <div className="p-2 text-center">Loading...</div>}

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="relative h-50 flex flex-col justify-end p-4 text-white bg-cover bg-center rounded-2xl shadow-xl transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
            style={{
              backgroundImage: `url(${blog.blogHead})`,
            }}
            onClick={() => {
              navigate(`/blog/${blog.id}`);
            }}
          >
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-2xl"></div>

            <div className="relative bottom-2 z-10">
              <h3 className="text-sm font-bold leading-tight  line-clamp-2 text-wrap">
                {blog.title}
              </h3>
              <p className="text-xs text-white ml-1">{blog.author.name}</p>
              <p className="line-clamp-2 text-xs text-wrap text-white">
                {blog.description1}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-2 ">
          {loading ? (
            ""
          ) : (
            <span className="lg:text-sm text-left">
              No blogs found. <br />
              Please try searching again.
            </span>
          )}
        </div>
      )}
    </aside>
  );
}
