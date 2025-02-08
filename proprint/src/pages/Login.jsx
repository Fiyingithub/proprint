import { useForm } from "react-hook-form";
import logo from "../assets/images/logo-lightMode.png";
import cooperative from "../assets/images/front-view-stacked.png";
import { Link } from "react-router-dom";

// Icons
import { IoHome } from "react-icons/io5";
import { RiContactsBook3Fill } from "react-icons/ri";
import { LiaSpellCheckSolid } from "react-icons/lia";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";

const Login = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="lg:flex z-0">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 h-screen flex-col items-center bg-[whitesmoke] px-6 py-10">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto w-20 h-20 mb-16" />
          <aside className="space-y-6">
            <div className="flex border border-gray-300 items-center w-full px-4 rounded-md py-2 text-lg font-medium cursor-pointer text-gray-600 hover:bg-[#0E1B3F] hover:text-white">
              <IoHome className="text-2xl" />
              <span className="ml-2">Home</span>
            </div>
            <div className="flex border border-gray-300 items-center w-full px-4 rounded-md py-2 text-lg font-medium cursor-pointer text-gray-600 hover:bg-[#0E1B3F] hover:text-white">
              <LiaSpellCheckSolid className="text-2xl" />
              <span className="ml-2">About</span>
            </div>
            <div className="flex border border-gray-300 items-center w-full px-4 rounded-md py-2 text-lg font-medium cursor-pointer text-gray-600 hover:bg-[#0E1B3F] hover:text-white">
              <GiTakeMyMoney className="text-2xl" />
              <span className="ml-2">Features</span>
            </div>
            <div className="flex border border-gray-300 items-center w-full px-4 rounded-md py-2 text-lg font-medium cursor-pointer text-gray-600 hover:bg-[#0E1B3F] hover:text-white">
              <GrMoney className="text-2xl" />
              <span className="ml-2">Pricing</span>
            </div>
            <div className="flex border border-gray-300 items-center w-full px-4 rounded-md py-2 text-lg font-medium cursor-pointer text-gray-600 hover:bg-[#0E1B3F] hover:text-white">
              <RiContactsBook3Fill className="text-2xl" />
              <span className="ml-2">Contact</span>
            </div>
          </aside>
        </div>
      </div>

      <div className="w-full h-screen flex z-0">
        {/* Background Image */}
        <div
          className="hidden lg:flex flex-col items-center justify-center w-[50%] h-screen bg-cover bg-center relative z-0"
          style={{ backgroundImage: `url(${cooperative})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Eduk8.</h1>
            <p className="text-base md:text-lg font-light mb-6 text-white">
              Empower schools, teachers, and students by using our all-in-one grading and management
              platform
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-[50%] lg:py-16 h-screen">
          <nav className="lg:hidden py-3 px-4 border shadow-sm flex items-center space-x-4 mb-8">
            <img src={logo} alt="Logo" className=" w-16 h-16" />
            <span className=" font-semibold">Eduk8</span>
          </nav>

          <div className="flex items-center justify-center">
            <p className="text-gray-400 text-[15px] my-6">
              Welcome back! Please enter your login details
            </p>
          </div>

          <form className="flex flex-col space-y-7 px-4 md:px-8 lg:px-16 py-10">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    if (!value.includes("@") || !value.includes(".com")) {
                      return "Email is not valid";
                    }
                    return true;
                  },
                })}
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 8 characters long",
                  },
                  // validate: (value) => {
                  //   const regex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
                  //   if (!regex.test(value)) {
                  //     return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                  //   }
                  //   return true;
                  // },
                })}
                type="password"
                placeholder="Input password"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex gap-2">
                <input type="checkbox" name="remember" />
                <p className="text-[13px]">Remember for 30 days</p>
              </div>
              <Link to="/forgot-password" className="text-blue-700 text-[13px] ml-14">
                Forgot Password?
              </Link>
            </div>

            <button
              className={`rounded-md flex items-center justify-center text-lg hover:bg-opacity-90 text-white p-1 bg-[#0E1B3F]`}
              type="submit"
            >
              Sign In
            </button>

            <div>
              <p className="text-[13px]">
                {"Don't have an account?"}
                <Link to="/signup" className="text-blue-700">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
