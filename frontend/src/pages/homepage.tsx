import Banner from "../components/primary_components/primary_components/unique_components/Banner";
import Header from "../components/primary_components/dashboard/header";
import Footer from "../components/primary_components/dashboard/footer";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/primary_components/primary_components/slider/carousel";
import HomeCard from "../components/primary_components/primary_components/cards/home_card";
import { motion } from "framer-motion"; // Add this import

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-[#1a0002] to-[#0d1418]">
      <Header />

      <main className="flex-grow">
        {/* Enhanced Banner section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 lg:mt-8 w-full h-80 sm:h-72 md:h-80 lg:h-[70vh] xl:h-[60vh]  relative"
        >
          <Banner />
        </motion.section>

        {/* Improved Hero section */}
        <section className="sm:py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-10  justify-center items-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full sm:w-1/2 space-y-6"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-[#F96666] leading-tight">
                  Discover Your Path to{" "}
                  <span className="text-white">Inner Peace</span>
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Share your stories — your journeys, your adventures, your
                  unforgettable moments. Whether it's a hidden waterfall in the
                  mountains or a bustling street in a foreign city, let the
                  world experience the wonders you've witnessed.Your story might
                  just be the spark for someone else's next big adventure.
                </p>
                <blockquote className=" text-sm lg:text-xl italic text-[#F96666]/80 border-l-4 border-[#F96666] pl-4">
                  "Brave are those who don't just visit the world, <br />
                  but let it change them."
                </blockquote>
              </motion.div>

              {/* Enhanced Carousel */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="h-full w-full sm:w-1/2 rounded-xl overflow-hidden shadow-2xl"
              >
                <Carousel  />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Improved Cards section */}
        <section className="w-5/6 mx-auto py-16 px-4 md:px-8 lg:px-16 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white text-left mb-6">
              Explore More
            </h2>
            <div className=" grid sm:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => navigate(`/user`)}
              >
                <HomeCard
                  image="/images/icons/thumb.jpg"
                  title="MY PAGE"
                  // className="transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">My Journey</h3>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => navigate(`/blog_page`)}
              >
                <HomeCard image="/images/icons/thumb.jpg" title="BLOGS" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">
                    Travel Stories
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer color="bg-[#0d1418]" fontColor="text-white" />
    </div>
  );
}
