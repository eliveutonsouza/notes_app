import { useContext, useEffect, useState } from "react";
import fewClouds from "../assets/few-clouds.png";
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
      setImageUrl(data.urls.regular); // Image URL
    };

    fetchImage();
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
            src={fewClouds}
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
            <p>
              Rain:{" "}
              {weatherData?.rain?.["1h"]
                ? `${weatherData.rain["1h"]} mm`
                : "N/A"}
            </p>
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
