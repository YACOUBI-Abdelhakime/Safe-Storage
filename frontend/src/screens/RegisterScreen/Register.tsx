import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../features/store";
import { register } from "../../features/user/asyncThunks";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "../../utils/formValidations/FormValidations";
import AuthHero from "../../components/Authentication/AuthHero";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<{
    email: string | null;
    password: string | null;
    passwordConfirmation: string | null;
  }>({ email: null, password: null, passwordConfirmation: null });
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  let onUpdateSignupData = (e: any) => {
    let emailError: string | null = null;
    let passwordError: string | null = null;
    let passwordConfirmationError: string | null = null;
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    // Set the form errors
    switch (e.target.name) {
      case "email": {
        emailError = validateEmail(e.target.value, t);
        setFormErrors({
          ...formErrors,
          email: emailError,
        });
        break;
      }
      case "password": {
        passwordError = validatePassword(e.target.value, t);
        setFormErrors({
          ...formErrors,
          password: passwordError,
        });
        break;
      }
      case "passwordConfirmation": {
        passwordConfirmationError = validatePasswordConfirmation(
          user.password,
          e.target.value,
          t
        );
        setFormErrors({
          ...formErrors,
          passwordConfirmation: passwordConfirmationError,
        });
        break;
      }

      default:
        break;
    }
  };

  let onSubmitRegister = (e: any) => {
    e.preventDefault();

    if (
      formErrors.email ||
      formErrors.password ||
      formErrors.passwordConfirmation
    ) {
      // Form not valid
      return;
    }

    // Dispatch the register action and navigate to the home page if success
    dispatch(register(user))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <AuthHero isSignup={true} />
      <div className="bg-white w-full lg:w-7/12 h-full flex items-center justify-center">
        <div className="w-full sm:p-5 md:p-16 lg:p-24 p-3">
          <div className="text-center px-2 pb-12">
            <h2 className="font-bold text-4xl">{t("Create a new account")}</h2>
          </div>
          <form noValidate>
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
                value={user.email}
                onChange={onUpdateSignupData}
              />
              {formErrors.email !== null && (
                <p className="mt-2 text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            <div className="mb-3">
              <input
                placeholder={t("Password")}
                type="password"
                className={`${
                  formErrors.password !== null
                    ? "ring-red-500 ring-2"
                    : "border-gray-300"
                } w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                name="password"
                value={user.password}
                onChange={onUpdateSignupData}
              />
              {formErrors.password !== null && (
                <p className="mt-2 text-red-500 text-sm whitespace-pre-line">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="mb-3">
              <input
                placeholder={t("Confirm password")}
                type="password"
                className={`${
                  formErrors.passwordConfirmation !== null
                    ? "ring-red-500 ring-2"
                    : "border-gray-300"
                } w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                name="passwordConfirmation"
                value={user.passwordConfirmation}
                onChange={onUpdateSignupData}
              />
              {formErrors.passwordConfirmation !== null && (
                <p className="mt-2 text-red-500 text-sm whitespace-pre-line">
                  {formErrors.passwordConfirmation}
                </p>
              )}
            </div>
            <div className="flex justify-center mb-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-500 transition"
                onClick={onSubmitRegister}
              >
                {t("Signup")}
              </button>
            </div>
            <div className="flex justify-center mb-3 lg:hidden">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-500 transition"
                onClick={() => navigate("/login")}
              >
                {t("Login")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
