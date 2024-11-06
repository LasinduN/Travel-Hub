import { Checkbox } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import userAxios from "../../baseURL";
import { useUserContext } from "../../hooks/useUserAuthContext";
import { toast } from "react-toastify";
import logo from "./logo.png";

const normalStyle =
  "w-full  h-[45px]  md:h-[50px] sm:h-[56px] pl-[20px] py-[7px] font-normal text-sm text-[#515151] focus:outline-none ";
const errorStyle =
  "w-full  h-[45px] md:h-[50px] sm:h-[56px] pl-[20px] py-[7px] font-normal text-sm text-red-400 focus:outline-none ";

function Login() {
  const { dispatch } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the fields");
      toast.error("Please fill all the fields", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email Address", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setError("Invalid Email Address");
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setError(null);
    try {
      const res = await userAxios.post("/api/managers/login", {
        email,
        password,
      });
      if (res.status === 200) {
        const now = new Date();
        if (rememberMe) {
          localStorage.setItem(
            "manager",
            JSON.stringify({
              ...res.data,
              expiry: now.getTime() + 3600000 * 24,
            })
          );
        }
        dispatch({ type: "LOGIN", payload: res.data });
        toast.dismiss();
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Please enter a valid email") {
        toast.error("Please enter a valid email", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setError("Please enter a valid email");
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      if (error.response.data.message === "Please check your password") {
        toast.error("Please check your password", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setError("Please check your password");
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };
  return (
    <div className="flex h-screen w-full font-roboto justify-center ">
      <div
        className="flex-1 bg-no-repeat bg-cover bg-center  lg:block hidden"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dnoobzfxo/image/upload/v1701395916/valentyn-chernetskyi-m0_o8QB-JGg-unsplash_1_jcfwxf.png)",
        }}
      ></div>
      <div className="w-[90%] xsm:w-[80%] md:w-[60%] lg:w-[34%] flex items-center flex-col justify-center">
        <div className="flex flex-col items-center">
          <img src={logo} alt="" className="w-[260px]" />
          <div className="font-roboto_slab text-[20px] xsm:text-[25px]  md:text-[25px] sm:text-[30px] font-bold flex flex-col items-center leading-[92%] text-center">
            <p>University</p>
            <p>Transport Management System</p>
          </div>
        </div>
        <div className="mt-[40px] w-full items-center">
          <form action="">
            <div className="flex flex-col items-center">
              <div className="w-[100%] lg:w-[75%]">
                <label
                  htmlFor="email"
                  className={`font-semibold ${
                    emailError ? "text-red-500" : "text-[#383838]"
                  }`}
                >
                  Manager Email Address
                </label>
                <input
                  id="email"
                  type="text"
                  className={emailError ? errorStyle : normalStyle}
                  style={{
                    borderRadius: "7.979px",
                    border: emailError
                      ? "1px solid #FF0000"
                      : "1px solid #747474",
                    background: "#FFF",
                  }}
                  placeholder="Enter your email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center mt-[12px]">
              <div className="w-[100%] lg:w-[75%] relative">
                <label
                  htmlFor="password"
                  className={`font-semibold ${
                    passwordError ? "text-red-500" : "text-[#383838]"
                  }`}
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={passwordError ? errorStyle : normalStyle}
                  style={{
                    borderRadius: "7.979px",
                    border: passwordError
                      ? "1px solid #FF0000"
                      : "1px solid #747474",
                    background: "#FFF",
                  }}
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <VisibilityIcon
                  className="absolute top-[40px] right-4"
                  fontSize="medium"
                  color={passwordError ? "error" : "disabled"}
                  onClick={() => {
                    console.log("as");
                    setShowPassword((pre) => !pre);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[100%] lg:w-[75%] flex justify-between items-center">
                <div className="flex items-center">
                  <Checkbox
                    defaultChecked
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                    }}
                  />

                  <p className="text-gray-400 font-medium  sm:text-[16px] text-[13px] font-roboto">
                    Remember me
                  </p>
                </div>

                <div
                  className="text-red-500   cursor-pointer hover:font-bold leading-[92%] sm:text-[16px] text-[13px] sm:font-normal font-bold"
                  onClick={() => {
                    navigate("/resetpasswordemail");
                  }}
                >
                  Reset Password
                </div>
              </div>
            </div>
            {error && (
              <div className="flex flex-col items-center">
                <div className="w-[75%]">
                  <p className="text-red-500 text-[15px] font-normal text-center">
                    {error}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col items-center mt-[15px]">
              <div className="w-[75%] ">
                <button
                  type="submit"
                  className="w-full text-white bg-main_blue  h-[45px]  xl:h-[60px] rounded-lg text-[18px] xl:text-[20px] font-medium "
                  onClick={(e) => {
                    login(e);
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;