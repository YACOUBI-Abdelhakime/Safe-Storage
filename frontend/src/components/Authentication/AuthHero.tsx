import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AuthHero({ isSignup }: { isSignup: boolean }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-blue-600 h-full lg:w-5/12 hidden lg:block">
        <div className="w-full h-full px-5 p-3 flex items-center justify-center">
          <div className="text-center text-white px-2 pb-12">
            <h2 className="font-bold text-4xl mb-5">
              {isSignup ? t("Already have an account ?") : t("New here ?")}
            </h2>
            <p className="mb-8">
              {isSignup
                ? t(
                    "Login to access your personal space and securely upload your files in PDF or JPEG format"
                  )
                : t(
                    "Signup to access your personal space and securely upload your files in PDF or JPEG format"
                  )}
            </p>
            <div className="flex justify-center mb-3">
              <button
                type="submit"
                className="bg-white text-blue-600 px-4 py-2 w-full rounded-md hover:bg-gray-100 transition"
                onClick={() => navigate(isSignup ? "/login" : "/register")}
              >
                {isSignup ? t("Login") : t("Signup")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
