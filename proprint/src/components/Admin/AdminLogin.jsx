import React from "react";
import assets from "../../assets/images/assets";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AdminLogin = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    
  return (
    <div className="w-full h-screen md:flex lg:bg-gray-900 lg:bg-opacity-50 md:items-center md:justify-center relative">
      <div className="relative lg:flex w-[100%] md:h-[500px] max-w-4xl bg-white lg:shadow-lg rounded-lg overflow-hidden">
        {/* Login Form */}
        <div className="w-full lg:w-1/2 mt-10 md:mt-0 p-8">
          <h1 className="text-xl font-bold mb-4">
            Welcome to Pro-print Admin Panel
          </h1>
          <p className="text-gray-600 text-[14px] mb-8">
            Sign in to manage orders and customer requests efficiently. Secure
            access Only for Authorized personnel.
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-md outline-none pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4 flex justify-between">
              <div className="flex items-center mb-4 gap-2">
                <input type="checkbox" name="" id="" className="w-4 h-4" />
                <span>Remember me</span>
              </div>

              <div>
                <a href="#" className="text-blue-500">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white mt-4 py-2 rounded-md hover:bg-blue-600 transition">
              Login
            </button>
          </form>
        </div>

        <div className="hidden lg:block w-1/2 flex items-center justify-center relative h-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${assets.banner})`,
        }}
        >
            <img src={assets.animation} className="w-36 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
