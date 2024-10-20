import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContextProvider";
import { formatTemperature, kelvinToCelsius } from "../utils";
import { format } from "date-fns";

export function BannerMeteorological() {
  const { profileData } = useContext(ProfileContext);
  const weatherData = profileData.weatherData;

  const kelvinTemp = weatherData?.main.temp || 0;
  const celsiusTemp = kelvinToCelsius(kelvinTemp);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=nature&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      );
      const data = await response.json();
      setImageUrl(data.urls.regular);
      localStorage.setItem("lastFetchTime", Date.now().toString());
    };

    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = Date.now();

    if (!lastFetchTime || currentTime - parseInt(lastFetchTime) >= 3600000) {
      // Fetch the image initially if it hasn't been fetched in the last hour
      fetchImage();
    } else {
      // Set a timeout to fetch the image when the hour has passed
      const timeRemaining = 3600000 - (currentTime - parseInt(lastFetchTime));
      const timeoutId = setTimeout(fetchImage, timeRemaining);

      return () => clearTimeout(timeoutId);
    }

    // Set interval to fetch the image every hour
    const intervalId = setInterval(fetchImage, 3600000); // 3600000 ms = 1 hour

    return () => clearInterval(intervalId);
  }, []); // The empty array means this will run only on component mount.

  const formattedDate = format(
    currentDate,
    "dd 'of' MMMM 'of' yyyy - HH:mm 'min'",
  );

  return (
    <div className="relative flex h-auto w-full items-center bg-primary py-4 md:py-6">
      <img
        className="absolute left-0 top-0 h-full w-full object-cover opacity-70"
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        } // Default URL while waiting for the API image
        alt="Nature landscape"
      />

      <div className="container relative mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:gap-6">
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
            alt="Few Clouds"
            className="h-12 w-12 md:h-16 md:w-16"
          />
          <span className="text-2xl font-semibold text-white md:text-4xl">
            {formatTemperature(celsiusTemp || 0)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center text-white md:flex-row md:gap-4 md:text-left">
          <div>
            <p className="text-lg md:text-xl">{formattedDate}</p>
            <p className="text-base font-light capitalize">
              {weatherData?.weather[0].description}
            </p>
          </div>

          <div className="block border-l-0 pl-0 text-base md:border-l-2 md:pl-3">
            {weatherData?.rain?.["1h"] ? (
              <p>Rain: {weatherData.rain["1h"]} mm</p>
            ) : (
              <p></p>
            )}
            <p>Cloudiness: {weatherData?.clouds.all}%</p>
            <p>Humidity: {weatherData?.main.humidity}%</p>
            <p>
              Wind:{" "}
              {weatherData?.wind?.speed
                ? (weatherData.wind.speed * 3.6).toFixed(2)
                : "N/A"}{" "}
              km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
