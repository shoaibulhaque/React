import { Link } from "react-router-dom";

export default function NotFound(Props) {
  return (
    <div className="max-w-[50rem] flex flex-col mx-auto size-full">
      <main id="content">
        <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">
            404
          </h1>
          <p className="mt-3 text-gray-600">Oops, something went wrong.</p>
          <p className="text-gray-600 ">Sorry, we couldn't find your page.</p>
          <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
            <Link
              className={
                "no-underline bg-gray-800 hover:bg-gray-700 text-white font-bold py-[0.45rem] px-4 rounded " +
                Props.show
              }
              to={Props.linkTo}
            >
              {Props.linkText}
            </Link>
          </div>
        </div>
      </main>
      <footer className="mt-auto text-center py-5">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            © All Rights Reserved. 2024.
          </p>
        </div>
      </footer>
    </div>
  );
}
