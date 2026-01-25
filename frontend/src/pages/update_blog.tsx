import { useState, useCallback, useEffect } from "react";
import {
  updateBlogSchema,
  UpdateBlogInput,
} from "@mrityunjay__jha117/reload_common";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogUpdate() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<UpdateBlogInput>({
    title: "",
    description1: "",
    description2: "",
    city: "",
    country: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch existing blog data
  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("jwt");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    setLoading(true);
    fetch(`https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog/${id}`, {
      method: "GET",
      headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const blog = data.blog || data;
        setFormData({
          title: blog.title || "",
          description1: blog.description1 || "",
          description2: blog.description2 || "",
          city: blog.location?.city || "",
          country: blog.location?.country || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching blog data:", err);
        setErrorMessage("Error fetching blog data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const token = localStorage.getItem("jwt");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const cleanedData: UpdateBlogInput = {
        title: formData.title?.trim() || undefined,
        description1: formData.description1?.trim() || undefined,
        description2: formData.description2?.trim() || undefined,
        city: formData.city?.trim() || undefined,
        country: formData.country?.trim() || undefined,
      };

      const parsed = updateBlogSchema.safeParse(cleanedData);
      if (!parsed.success) {
        console.error("Validation error:", parsed.error.errors);
        setErrorMessage("Wrong inputs entered.");
        return;
      }
      setErrorMessage(null);
      setIsSubmitting(true);

      try {
        const res = await fetch(
          `https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog/${id}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify(parsed.data),
          },
        );

        if (res.ok) {
          alert("Blog updated successfully!");
          navigate("/user");
        } else {
          const errorData = await res.json();
          alert(
            `Failed to update blog. Error: ${
              errorData.message || "Unknown error"
            }`,
          );
        }
      } catch (err) {
        console.error("Error updating blog:", err);
        alert("Error updating blog.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, id, navigate],
  );

  const handleKeyDown = (e: React.KeyboardEvent, nextId?: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (nextId) {
        document.getElementById(nextId)?.focus();
      } else {
        document.getElementById("update-submit-btn")?.click();
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-xl">
        <span className="animate-spin border-4 border-red-500 border-t-transparent rounded-full w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto text-sm">
      <div className="p-4 max-w-3xl mx-auto text-sm">
        <div className="mx-auto w-full h-10 text-sm lg:text-3xl border-6 border-red-500 rounded-full overflow-hidden bg-red-500 text-white tracking-wide group transition-all duration-500 mb-1 relative flex items-center justify-center">
          <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          <span className="relative group-hover:text-red-500 transition-colors duration-500">
            EDIT YOUR BLOG
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-white p-5 rounded-lg shadow-xl"
      >
        <input
          id="update-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, "update-desc1")}
          placeholder="Title"
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <textarea
          id="update-desc1"
          name="description1"
          value={formData.description1}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, "update-desc2")}
          placeholder="Description 1"
          rows={4}
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <textarea
          id="update-desc2"
          name="description2"
          value={formData.description2}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, "update-city")}
          placeholder="Description 2"
          rows={4}
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <input
          id="update-city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, "update-country")}
          placeholder="City"
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <input
          id="update-country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder="Country"
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        <button
          id="update-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="relative mx-auto w-5/6 lg:w-[400px] lg:h-[60px] h-10 text-sm lg:text-3xl border-6 border-red-500 rounded-full overflow-hidden bg-red-500 text-white tracking-wide group transition-all duration-500 mb-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>UPDATING...</span>
            </span>
          ) : (
            <>
              <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              <span className="relative group-hover:text-red-500 transition-colors duration-500">
                UPDATE
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
