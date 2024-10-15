import { useContext, useEffect, useState } from "react";
import fewClouds from "../assets/poucas-nuvens.png";
import { ProfileContext } from "../context/ProfileContextProvider";
import { formatTemperature, kelvinToCelsius } from "../utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
      setImageUrl(data.urls.regular); // URL da imagem
    };

    fetchImage();
  }, []); // O array vazio significa que isso rodará apenas na montagem do componente.

  const formattedDate = format(
    currentDate,
    "dd 'de' MMMM 'de' yyyy - HH:mm 'min'",
    {
      locale: ptBR,
    },
  );

  return (
    <div className="flex h-28 w-full items-center bg-primary">
      <img
        className="absolute h-28 w-full object-cover opacity-70"
        src={
          imageUrl ||
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        } // URL padrão enquanto aguarda a imagem da API
        alt="Paisagem da natureza"
      />

      <div className="container relative m-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={fewClouds} alt="" />
          <span className="text-3xl font-semibold text-white">
            {formatTemperature(celsiusTemp || 0)}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="text-right text-lg font-medium text-white">
            <p className="text-lg">{formattedDate}</p>
            <p className="font-light capitalize">
              {weatherData?.weather[0].description}
            </p>
          </div>
          <div className="block border-l-2 pl-3 font-medium text-white">
            <p>
              Chuva:{" "}
              {weatherData?.rain?.["1h"]
                ? `${weatherData.rain["1h"]} mm`
                : "N/A"}
            </p>
            <p>Umidade: {weatherData?.main.humidity}%</p>
            <p>
              Vento:{" "}
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
