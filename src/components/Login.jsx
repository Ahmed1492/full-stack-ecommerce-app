export default function Login({
  setMode,
  handleSubmit,
  setEmail,
  setPassword,
}) {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mt-24 w-[70%] md:w-[36%] lg:w-[30%] xl:w-[24%]  m-auto  "
      >
        <h1 className="font-extrabold text-2xl">Login</h1>
        <label className="mt-5" htmlFor="">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="email"
          placeholder="Enter Your Email"
        />
        <label className="mt-5" htmlFor="">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none border w-[100%] py-2 px-3"
          type="password"
          placeholder="Enter Your Password"
        />
        <u onClick={() => setMode("resetPassword")} className="cursor-pointer">
          Forgot Password
        </u>
        <button className="bg-[#D02E64] text-white py-2 rounded-lg mt-7">
          Login
        </button>
        <u onClick={() => setMode("register")} className="mt-2 cursor-pointer">
          {"Don't"} Have An Account
        </u>
      </form>
    </div>
  );
}
