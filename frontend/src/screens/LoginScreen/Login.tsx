import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../features/store";
import { login } from "../../features/user/asyncThunks";
import { AuthDto } from "../../features/user/types/dtos/AuthDto";
import {
  validateEmail,
  validatePassword,
} from "../../utils/formValidations/FormValidations";
import AuthHero from "../../components/Authentication/AuthHero";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function LoginScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmitLogin = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const authDto: AuthDto = {
      email: form.email.value,
      password: form.password.value,
    };
    const emailError = validateEmail(authDto.email, t);
    const passwordError = validatePassword(authDto.password, t);
    // Set the error message
    setFormErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      // Form not valid
      return;
    }
    // Dispatch the login action and navigate to the home page if success
    dispatch(login(authDto))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <AuthHero isSignup={false} />
      <div className="bg-white w-full lg:w-7/12 h-full flex items-center justify-center">
        <div className="w-full sm:p-5 md:p-16 lg:p-24 p-3">
          <div className="text-center px-2 pb-12">
            <h2 className="font-bold text-4xl">{t("Login to your account")}</h2>
          </div>
          <form onSubmit={onSubmitLogin} noValidate>
            <div className="mb-3">
              <input
                type="email"
                placeholder={t("Email")}
                className={`${
                  formErrors.email !== null
                    ? "ring-red-500 ring-2"
                    : "border-gray-300"
                } w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                name="email"
              />
              {formErrors.email !== null && (
                <p className="mt-2 text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            <div className="mb-3 relative">
              <input
                placeholder={t("Password")}
                type={showPassword ? "text" : "password"}
                className={`${
                  formErrors.password !== null
                    ? "ring-red-500 ring-2"
                    : "border-gray-300"
                } w-full px-4 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-0 px-3 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6 text-gray-600" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              {formErrors.password !== null && (
                <p className="mt-2 text-red-500 text-sm whitespace-pre-line">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="flex justify-start mb-3">
              <p className="text-blue-500">{t("Forgot password !")}</p>
            </div>
            <div className="flex justify-center mb-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-500 transition"
              >
                {t("Login")}
              </button>
            </div>
            <div className="flex justify-center mb-3 lg:hidden">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-500 transition"
                onClick={() => navigate("/register")}
              >
                {t("Signup")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
