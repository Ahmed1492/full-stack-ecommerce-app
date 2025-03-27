export default function Register() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-24 w-[20%] m-auto  ">
        <h1 className="font-extrabold text-2xl">Register</h1>
        <label className="mt-5" htmlFor="">
          Username
        </label>
        <input
          className="outline-none border w-[100%] py-2 px-3"
          type="text"
          placeholder="Enter Your Username"
        />
        <label className="mt-5" htmlFor="">
          Email
        </label>
        <input
          className="outline-none border w-[100%] py-2 px-3"
          type="email"
          placeholder="Enter Your Email"
        />
        <label className="mt-5" htmlFor="">
          Password
        </label>
        <input
          className="outline-none border w-[100%] py-2 px-3"
          type="password"
          placeholder="Enter Your Password"
        />

        <button className="bg-[#D02E64] text-white py-2 rounded-lg mt-7">
          Register
        </button>
        <u className="mt-2"> Have An Account</u>
      </div>
    </div>
  );
}
