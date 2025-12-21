import { useNavigate } from "react-router-dom";
interface Prop {
  imglink?: string;
  color?: string;
  fontColor?: string;
}

export default function Footer({
  color = "bg-black",
  fontColor = "text-white",
}: Prop) {
  const navigate = useNavigate();
  return (
    <footer
      className={`${color} ${fontColor} sm:min-h-60 bg-cover flex flex-col justify-end gap-5 font-medium bg-center sm:max-h-70 bg-no-repeat`}
      // style={{ backgroundImage: `url('${imglink}')` }}
    >
      <div className=" px-4 pt-8  flex flex-col md:flex-row flex-wrap justify-between gap-4">
        {/* About Us Section */}
        <div className="flex-1">
          <h3 className="text-xs  mb-2">About</h3>
          <p className="text-xs">
            <a className="cursor-pointer hover:text-gray-500" href="#">
              TECH TACK USED?
            </a>
          </p>
          <p className="text-xs">
            An aspiring engineer striving to innovate, solve real-world
            problems, and shape a better technological future.
          </p>
        </div>

        {/* Newsletter Section */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-xs  md:text-2xl mb-2">Feedback</h3>
          <p className="text-xs md:text-xs mb-2">
            Show us your love and feedback, it matters a lot to me.
            <br />
            help me buy a coffee
          </p>
        </div>

        {/* Social Media Section */}
        <div className="flex-1">
          <h3 className="text-xs  md:text-2xl mb-1">Follow Me</h3>
          <div className="flex flex-wrap gap-4 items-center text-xs md:text-xs">
            <a href="#" className="hover:text-gray-500 transition-colors">
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/mrityunjay-jha-7b0436303/"
              className="hover:text-gray-500 transition-colors"
            >
              LinkedIn
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors">
              Instagram
            </a>
            <button
              onClick={() => {
                navigate("/chat");
              }}
              className="w-1/4 flex justify-center group items-center text-xs p-1 rounded-full bg-red-500 text-white transition-all duration-500 relative overflow-hidden"
            >
              <>
                <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                <span className="relative group-hover:text-red-500 transition-colors duration-500">
                  Contact
                </span>
              </>
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-300 py-2">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <p className="text-[10px] md:text-xs text-white">
            {new Date().getFullYear()} NIRVANA
          </p>
        </div>
      </div>
    </footer>
  );
}
