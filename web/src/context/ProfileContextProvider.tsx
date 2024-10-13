import { createContext, ReactNode, useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";

// Typings for the context props and decoded token data
interface ProfileContextProps {
  children: ReactNode;
}

type DecodedTokenType = {
  sub: string;
  iat: number;
  exp: number;
};

interface ProfileDataType {
  sub: string;
  iat: number;
  exp: number;
  isExpired: boolean;
  token?: string;
}

interface ProfileContextType {
  profileData: ProfileDataType;
  reEvaluateToken: (token: string) => void;
  setCookie: (
    sub: string,
    value: unknown,
    options?: Record<string, unknown>,
  ) => void;
  removeCookie: (name: string, options?: Record<string, unknown>) => void;
  setToken: (value: string) => void;
}

// Default values for the context
const ProfileDefaultValues: ProfileContextType = {
  profileData: {
    sub: "",
    iat: 0,
    exp: 0,
    isExpired: false,
  },
  reEvaluateToken: () => {},
  setCookie: () => {},
  removeCookie: () => {},
  setToken: () => {},
};

// Context creation
export const ProfileContext =
  createContext<ProfileContextType>(ProfileDefaultValues);

export function ProfileContextProvider({ children }: ProfileContextProps) {
  const [token, setToken] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies([token]);

  // Use the useJwt hook to get the decoded token
  const { decodedToken, isExpired, reEvaluateToken } = useJwt<DecodedTokenType>(
    cookies.token,
  );

  // Generate profile data with default values in case the token is undefined
  const profileData: ProfileDataType = useMemo(
    () => ({
      sub: decodedToken?.sub ?? "",
      iat: decodedToken?.iat ?? 0,
      exp: decodedToken?.exp ?? 0,
      isExpired: !!isExpired,
      token: cookies.token,
    }),
    [decodedToken, isExpired, cookies.token],
  );

  // Context value that will be provided to components
  const valueContext = useMemo(
    () => ({
      profileData,
      reEvaluateToken,
      setCookie,
      removeCookie,
      setToken,
    }),
    [profileData, reEvaluateToken, setCookie, removeCookie, setToken],
  );

  return (
    <ProfileContext.Provider value={valueContext}>
      {children}
    </ProfileContext.Provider>
  );
}
