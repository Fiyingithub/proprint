import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/images/assets";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { AdminLogin as handleAdminLogin } from "../../utilities/Api";
import { useToast } from "../../context/Loaders/ToastContext";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } = useToast();

  const onSubmit = async (data) => {
    startWaitingLoader();
    setLoading(true);
    try {
      const response = await handleAdminLogin(data.username, data.password);
      console.log(response.data);
      notifySuccess(response.data.responseMessage);
      navigate("/admin/dashboard")

    } catch (error) {
      console.error(error);
      notifyError(error.response.data.responseMessage);
    } finally {
      setLoading(false);
      stopWaitingLoader();
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md outline-none"
                placeholder="Enter your username"
                required
                {...register("username", { required: "Username is required" })}
              />
            </div>
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-md outline-none pr-10"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
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
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

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
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>

        <div
          className="hidden lg:flex w-1/2 items-center justify-center relative h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${assets.banner})`,
          }}>
          <img
            src={assets.animation}
            className="w-36 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
