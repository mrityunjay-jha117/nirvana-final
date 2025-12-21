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
    <div className="relative flex overflow-hidden flex-col min-h-screen bg-gradient-to-b from-[#1a0002] to-[#0d1418]">
      <Header />

      <main className="flex-grow">
        {/* Enhanced Banner section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 lg:mt-8 w-full sm:h-72 md:h-80 lg:h-screen relative"
          // className="mt-6 lg:mt-8 w-full h-80 sm:h-72 md:h-80 lg:h-[70vh] xl:h-[60vh]  relative"
        >
          <Banner />
        </motion.section>

        {/* Improved Hero section */}
        <section className="sm:py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-10  justify-center items-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ amount: 0.3 }}
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
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="h-full w-full sm:w-1/2 rounded-xl overflow-hidden shadow-2xl"
              >
                <Carousel />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Improved Cards section */}
        <section className="w-5/6 mx-auto py-16 px-4 md:px-8 lg:px-16 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white text-left mb-6"
            >
              Explore More
            </motion.h2>
            <div className=" grid sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
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

        {/* Community Features Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Connect with Fellow Travelers
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Build meaningful connections with adventurers from around the
                globe. Share experiences, exchange tips, and inspire each
                other's journeys.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="bg-gradient-to-br from-[#F96666]/20 to-transparent border border-[#F96666]/30 rounded-2xl p-8 hover:border-[#F96666] hover:shadow-2xl hover:shadow-[#F96666]/20 transition-all"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-[#F96666]/20 border-2 border-[#F96666] flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-[#F96666]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Real-Time Chat
                </h3>
                <p className="text-gray-300">
                  Connect instantly with travelers worldwide. Share tips, ask
                  questions, and build friendships that last beyond borders.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="bg-gradient-to-br from-[#F96666]/20 to-transparent border border-[#F96666]/30 rounded-2xl p-8 hover:border-[#F96666] hover:shadow-2xl hover:shadow-[#F96666]/20 transition-all"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-[#F96666]/20 border-2 border-[#F96666] flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-[#F96666]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Add Friends
                </h3>
                <p className="text-gray-300">
                  Build your travel tribe! Connect with like-minded explorers
                  and keep in touch with the people you meet along the way.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="bg-gradient-to-br from-[#F96666]/20 to-transparent border border-[#F96666]/30 rounded-2xl p-8 hover:border-[#F96666] hover:shadow-2xl hover:shadow-[#F96666]/20 transition-all"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-[#F96666]/20 border-2 border-[#F96666] flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-[#F96666]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Share Stories
                </h3>
                <p className="text-gray-300">
                  Document your adventures through captivating blog posts.
                  Inspire others with your experiences and hidden gems.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Travel Inspiration Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-black/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Why Travel with Us?
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                More than just a blog platform — we're a community of passionate
                travelers helping each other discover the world.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: "Global Community",
                  description:
                    "Connect with travelers from every corner of the world",
                },
                {
                  icon: (
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  ),
                  title: "Hidden Gems",
                  description:
                    "Discover places beyond the typical tourist trail",
                },
                {
                  icon: (
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                  title: "Visual Stories",
                  description:
                    "Share stunning photos and videos from your journeys",
                },
                {
                  icon: (
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  ),
                  title: "Expert Tips",
                  description: "Learn from experienced travelers and locals",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                    scale: { type: "spring", stiffness: 200, damping: 15 },
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="bg-gradient-to-b from-[#1a0002] to-[#0d1418] border border-gray-700 rounded-xl p-6 text-center hover:border-[#F96666]/50 hover:shadow-2xl hover:shadow-[#F96666]/10 transition-all"
                >
                  <div className="text-[#F96666] mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-[#F96666] to-[#F96666]/80 rounded-3xl p-12 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/patterns/travel-pattern.svg')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Ready to Start Your Adventure?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of travelers sharing their stories, making
                  friends, and discovering the world together. Your next great
                  adventure starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/create")}
                    className="px-8 py-4 bg-white text-[#F96666] rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Create Your First Post
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/chat")}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                  >
                    Start Chatting
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Travel Stats Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Active Travelers" },
                { number: "50+", label: "Countries" },
                { number: "5K+", label: "Travel Stories" },
                { number: "100K+", label: "Connections Made" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#F96666] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Voices from the Road
              </h2>
              <p className="text-gray-300 text-lg">
                Real stories from real travelers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "This platform connected me with locals in every city I visited. Made lifelong friends and discovered places I never would have found on my own!",
                  author: "Sarah K.",
                  location: "Backpacker from Australia",
                },
                {
                  quote:
                    "Sharing my mountain trekking experiences here inspired others to take their first hike. The community support is incredible!",
                  author: "Raj M.",
                  location: "Adventure Seeker from India",
                },
                {
                  quote:
                    "I've read countless travel blogs, but the personal connections here make all the difference. It's like having travel buddies everywhere!",
                  author: "Emma L.",
                  location: "Digital Nomad from UK",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-gradient-to-br from-[#1a0002] to-[#0d1418] border border-gray-700 rounded-2xl p-8 hover:border-[#F96666]/50 transition-all"
                >
                  <div className="text-[#F96666] text-4xl mb-4">"</div>
                  <p className="text-gray-300 mb-6 italic">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-white font-bold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer color="bg-[#0d1418]" fontColor="text-white" />
    </div>
  );
}
