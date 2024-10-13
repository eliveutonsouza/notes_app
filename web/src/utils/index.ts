// Função utilitária para formatar temperatura em °C
export const formatTemperature = (temp: number) => {
  if (temp === null || temp === undefined) return "N/A"; // Verifica se o valor é nulo ou indefinido
  return `${temp.toFixed(2).replace(".", ",")}°C`; // Formata o valor para 2 casas decimais e substitui o ponto por vírgula
};

// Função para converter Kelvin para Celsius
export const kelvinToCelsius = (kelvin: number) => {
  if (kelvin === null || kelvin === undefined) return null; // Verifica se o valor é nulo ou indefinido
  return kelvin - 273.15; // Converte Kelvin para Celsius
};
