import   React  from "react";
// import { useNavigate } from "react-router";

const signup = () => {
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     toast.error("Please fill all the fields!");
  //     return;
  //   }
  //   const formData = {
  //     Email: email,
  //     Password: password,
  //   };
  //   setLoading(true);
  //   const response = await login(formData);
  //   if (!response.success) {
  //     setLoading(false);
  //     return toast.error(response.message);
  //   }
  //   if (response.success) {
  //     setLoading(false);
  //     toast.success(response.message);
  //     navigate("/dashboard");
  //     sessionStorage.setItem("loginToken", response.token);
  //   }
  // };

  return (
    <>
      <div className=" h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="sublogin__container">
          <div className="sublogin__left-container">
            <div className="sublogin relative">
              <div className=" flex flex-col gap-1">
                <p className="  text-lg font-normal   text-white  ">
                  Dismantler / Scrap D2
                </p>
                <div className=" h-[2px] w-[170px] bg-[#f9b17a]"></div>
              </div>
              <p className="sublogin__heading font-medium mt-10">
                Hitachi Material Traceability Solution
              </p>
              <p className="sublogin__login mt-8">Login Account</p>
              <form
                // onSubmit={(e) => {
                //   e.preventDefault();
                //   handleLogin();
                // }}
                className="flex justify-center flex-col relative"
              >
                <label htmlFor="email">Username/Email</label>
                <input
                  required
                  className="pl-10"
                  type="email"
                  name="email"
                  id="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                />
                <label htmlFor="password">Password</label>
                <div className="input-password__icon"></div>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  placeholder=". . . . . . . ."
                />
                <div className=" flex items-center justify-between flex-row ">
                  <p className="sublogin__dont-acc">Don’t have an account? </p>
                  <p
                    // onClick={() => navigate("/signup")}
                    className="sublogin__create-acc hover:underline transition-all duration-200  hover:text-[#c3995e]"
                  >
                    Create account
                  </p>
                </div>
                <button className="sublogin__btn w-fit">
                  {/* {loading ? "Logging in..." : "Login"} */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
