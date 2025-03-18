import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <main className=" w-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md border-2 border-[#EEBB36]">
        <h3 className="bg-white text-center text-[140%] font-bold mb-6">
          Ops! Something went wrong. <br></br> Try again later.
        </h3>
        <p className="text-center">
          Go back to{" "}
          <NavLink to="/" className="font-bold text-[#3669ee] hover:underline">
            homepage
          </NavLink>
        </p>
      </div>
    </main>
  );
}
