export interface WeatherResponseTypes {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  rain?: RainData;
  clouds: CloudsData;
  dt: number;
  sys: SystemData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number; // Temperatura em Kelvin
  feels_like: number; // Sensação térmica em Kelvin
  temp_min: number; // Temperatura mínima em Kelvin
  temp_max: number; // Temperatura máxima em Kelvin
  pressure: number; // Pressão em hPa
  humidity: number; // Umidade em porcentagem
  sea_level: number; // Pressão ao nível do mar em hPa
  grnd_level: number; // Pressão ao nível do solo em hPa
}

interface WindData {
  speed: number; // Velocidade do vento em m/s
  deg: number; // Direção do vento em graus
  gust?: number; // Rajadas de vento em m/s (opcional)
}

interface RainData {
  "1h": number; // Quantidade de chuva em mm durante a última hora
}

interface CloudsData {
  all: number; // Cobertura de nuvens em porcentagem
}

interface SystemData {
  type: number; // Tipo de sistema
  id: number; // ID do sistema
  country: string; // Código do país
  sunrise: number; // Timestamp do nascer do sol
  sunset: number; // Timestamp do pôr do sol
}
