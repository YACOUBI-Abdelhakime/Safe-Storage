import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Example() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.userReducer.user);

  const onLogoutClicked = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="bg-white fixed top-0 w-full z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between py-2 px-8"
      >
        <div className="flex lg:flex-1">
          <a className="-m-1.5 p-1.5" onClick={() => navigate("/")}>
            <img alt="" src="assets/logo/logo.png" className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          {user ? (
            <a
              className="text-sm font-semibold border border-blue-600 text-blue-600 bg-white px-3 py-1 mr-2 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition"
              onClick={onLogoutClicked}
            >
              {t("Logout")}
            </a>
          ) : (
            <>
              <a
                className="text-sm font-semibold border border-blue-600 text-blue-600 bg-white px-3 py-1 mr-2 rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer transition"
                onClick={() => navigate("/login")}
              >
                {t("Login")}
              </a>
              <a
                className="text-sm font-semibold bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 cursor-pointer transition"
                onClick={() => navigate("/register")}
              >
                {t("Signup")}
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
