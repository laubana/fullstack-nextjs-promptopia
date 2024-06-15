import Link from "next/link";

const Form = ({ type, form, setForm, isLoading, isSubmitting, onSubmit }) => {
  return (
    <div className="flex flex-col items-start justify-start max-w-full w-full">
      <p className="font-extrabold leading-5 mt-5 text-5xl text-black first-letter:uppercase sm:text-6xl">
        <span className="bg-clip-text bg-gradient-to-r from-blue-600 leading-tight text-transparent to-cyan-600">
          {type} Prompt
        </span>
      </p>
      <p className="max-w-md mt-5 text-gray-600 text-lg first-letter:uppercase sm:text-xl">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <div className="backdrop-blur bg-white/50 border border-gray-200 flex flex-col gap-7 max-w-2xl my-10 p-5 rounded-xl shadow-lg w-full">
        <label>
          <div className="font-satoshi font-semibold mb-2 text-base text-gray-700">
            Prompt
          </div>
          <textarea
            value={form.prompt}
            onChange={(event) =>
              setForm({ ...form, prompt: event.target.value })
            }
            placeholder={
              !isLoading ? "e.g. Give me an example code for Next.js..." : ""
            }
            rows={5}
            className="border border-gray-300 flex outline-0 p-3 resize-none rounded-lg text-gray-500 text-sm w-full focus:border-gray-500"
            required
            disabled={isLoading || isSubmitting}
          />
        </label>
        <label>
          <div className="font-satoshi font-semibold mb-2 text-base text-gray-700">
            Category
          </div>
          <input
            type="text"
            value={form.category}
            onChange={(event) =>
              setForm({ ...form, category: event.target.value })
            }
            placeholder={!isLoading ? "e.g. Script, Idea, Development..." : ""}
            className="border border-gray-300 flex outline-0 p-3 rounded-lg text-gray-500 text-sm w-full focus:border-gray-500"
            required
            disabled={isLoading || isSubmitting}
          />
        </label>
        <div className="flex items-center justify-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="button"
            className="bg-primary-orange px-5 py-1.5 rounded-full text-sm text-white disabled:bg-gray-300"
            onClick={onSubmit}
            disabled={isLoading || isSubmitting}
          >
            {`${type[0].toUpperCase()}${type.slice(1)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
