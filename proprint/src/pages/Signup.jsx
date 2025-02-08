import { Link } from "react-router-dom";
import logo from "../assets/images/eduk-logo.png";
import man from "../assets/images/image2.png";
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

const Signup = () => {
  return (
    <div className="bg-[#F3F4F6] h-full flex justify-center items-center p-10">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 ">
        {/* Left Section */}
        <div className="w-[350px] bg-[#0E1B3F] text-white flex flex-col justify-between rounded-lg px-4">
          <div>
            <div className="flex items-center gap-4 mt-10 ">
              <img alt="StartGlobal Logo" className="rounded-full h-12 w-14" src={logo} />
            </div>
            <div className="w-3/4 mt-4">
              <h1 className="text-xl md:text-3xl font-semibold">{"Let's setup your Operating Agreement"}</h1>
              <p className="text-[10px] text-slate-300">
                All-in-one solution for your business in the state. Form a new company from scratch
                or onboard your existing US company.
              </p>
            </div>
          </div>

          <div className="bg-[#0E1B3F] p-3 h-48 w-[300px] rounded-lg opacity-70 mb-10">
            <p className="text-xl font-semibold mb-2">I barely had to do anything</p>
            <p className="mb-4 text-[10px]">
              Love the experience. Got my business set up and all necessary details in about a month
              and I barely had to do anything. Definitely recommend!
            </p>
            <div className="flex items-center">
              <img
                alt="Catherine Johns"
                className="w-10 h-10 rounded-full mr-3"
                height="40"
                src={man}
                width="40"
              />
              <p className="font-semibold py-3">Catherine Johns</p>
            </div>
            <div className="flex items-center">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfStroke />
            </div>
          </div>
        </div>

        <div className="flex lg:w-[450px] bg-white rounded-lg ">
          {/* Right Section */}
          <div className="px-6 py-10">
            <p className="text-2xl font-semibold">{"Let's get started"}</p>

            <form action="submit">
              <div className="space-y-2 py-6">
                <div className="flex flex-row space-x-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="first-name">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      id="first-name"
                      name="first-name"
                      type="text"
                      placeholder="Alex"
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="last-name">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      id="last-name"
                      name="last-name"
                      type="text"
                      placeholder="Parkinson"
                      autoComplete="family-name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="other-name">
                    Other name
                  </label>
                  <input
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="other-name"
                    name="other-name"
                    type="text"
                    placeholder="Parkinson"
                    autoComplete="family-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Alexexample@gmail.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="flex flex-row space-x-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                      Contact Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="department">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="department"
                    name="department"
                    type="text"
                    placeholder="Enter department"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="campus">
                    Campus <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="campus"
                    name="campus"
                    type="text"
                    placeholder="Enter campus location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Input password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0E1B3F] hover:bg-opacity-90 rounded-md flex items-center justify-center w-full text-white p-2"
              >
                GET STARTED
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
