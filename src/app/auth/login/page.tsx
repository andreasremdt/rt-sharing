import login from "@/actions/login";
import signup from "@/actions/signup";

export default function Page() {
  return (
    <form className="w-full max-w-md p-4">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">Log in to your account</h1>

      <label className="mb-1 block font-medium text-gray-900" htmlFor="email">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="has-outline mb-4 h-10 w-full rounded-md border border-gray-200 px-4 shadow-sm -outline-offset-1"
      />

      <label className="mb-1 block font-medium text-gray-900" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="has-outline mb-4 h-10 w-full rounded-md border border-gray-200 px-4 shadow-sm -outline-offset-1"
      />

      <div className="flex items-center">
        <button
          formAction={login}
          className="has-outline h-10 flex-1 rounded-md bg-rose-600 px-6 font-medium text-white outline-offset-2 hover:bg-rose-500 focus-visible:bg-rose-500"
        >
          Log in
        </button>
        <span className="mx-2">or</span>
        <button
          formAction={signup}
          className="has-outline h-10 flex-1 rounded-md bg-rose-600 px-6 font-medium text-white outline-offset-2 hover:bg-rose-500 focus-visible:bg-rose-500"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
