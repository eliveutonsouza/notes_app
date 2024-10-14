import axios from "axios";
import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { WeatherResponseTypes } from "../@types/weatherResponseTypes";

// Typings for the context props and decoded token data
interface ProfileContextProps {
  children: ReactNode;
}

type DecodedTokenType = {
  sub: string;
  iat: number;
  exp: number;
  userName: string;
};

interface LocationType {
  latitude: number;
  longitude: number;
}

interface ProfileDataType {
  sub: string;
  iat: number;
  exp: number;
  isExpired: boolean;
  token?: string;
  location?: LocationType | null;
  geoError?: string | null;
  weatherData: WeatherResponseTypes | null;
  userName: string;
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
    token: "",
    location: null,
    geoError: null,
    weatherData: null,
    userName: "",
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

  const [location, setLocation] = useState<LocationType | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherResponseTypes | null>(
    null,
  );

  // Use the useJwt hook to get the decoded token
  const { decodedToken, isExpired, reEvaluateToken } = useJwt<DecodedTokenType>(
    cookies.token,
  );

  // Function to get the user's location
  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setGeoError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setGeoError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setGeoError("The request to get user location timed out.");
              break;
            default:
              setGeoError("An unknown error occurred.");
              break;
          }
        },
      );
    } else {
      setGeoError("Geolocation is not supported by this browser.");
    }
  }, []);

  const getCodeCity = useCallback(async () => {
    try {
      const responseCode = await axios.get<WeatherResponseTypes>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude.toFixed(2)}&lon=${location?.longitude.toFixed(2)}&appid=${import.meta.env.VITE_API_OPENWATHER_KEY}          `,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const dataCode = responseCode.data;

      setWeatherData(dataCode);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  }, [location?.latitude, location?.longitude]);

  // Effect to get the location when the component mounts
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Effect to get city code and weather when address is updated
  useEffect(() => {
    getCodeCity();
  }, [getCodeCity]);

  // Generate profile data with default values in case the token is undefined
  const profileData: ProfileDataType = useMemo(
    () => ({
      sub: decodedToken?.sub ?? "",
      iat: decodedToken?.iat ?? 0,
      exp: decodedToken?.exp ?? 0,
      userName: decodedToken?.userName ?? "",
      isExpired: !!isExpired,
      token: cookies.token,
      location,
      geoError,
      weatherData,
    }),
    [decodedToken, isExpired, cookies.token, location, geoError, weatherData],
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
