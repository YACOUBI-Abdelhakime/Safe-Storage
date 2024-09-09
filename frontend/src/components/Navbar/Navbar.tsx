export default function Example() {
  return (
    <header className="bg-white fixed top-0 w-full z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between py-3 px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img alt="" src="src/assets/logo/logo.png" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <a
            href="#"
            className="text-sm font-semibold border border-blue-600 text-blue-600 bg-white px-3 py-1 mr-2 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition"
          >
            Se connecter
          </a>
          <a
            href="#"
            className="text-sm font-semibold bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 cursor-pointer transition"
          >
            S'inscrire
          </a>
        </div>
      </nav>
    </header>
  );
}
