import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

/**
 *
 * @returns {boolean} - Returns true if the user is authenticated, otherwise false.
 */
const useAuth = () => {
  const token = useSelector((state: any) => state.userReducer?.user?.token);

  if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp && decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export default useAuth;
