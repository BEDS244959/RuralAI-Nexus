export async function getWeather(latitude, longitude) {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum` +
      `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather data could not be fetched.");
    }

    const data = await response.json();

    return {
      current: {
        temperature: data.current?.temperature_2m ?? null,
        humidity: data.current?.relative_humidity_2m ?? null,
        precipitation: data.current?.precipitation ?? null,
        rain: data.current?.rain ?? null,
        weatherCode: data.current?.weather_code ?? null,
      },

      daily: {
        dates: data.daily?.time ?? [],
        maxTemperature: data.daily?.temperature_2m_max ?? [],
        minTemperature: data.daily?.temperature_2m_min ?? [],
        precipitation: data.daily?.precipitation_sum ?? [],
        rain: data.daily?.rain_sum ?? [],
      },

      timezone: data.timezone ?? null,
    };
  } catch (error) {
    console.error("Weather service error:", error);
    throw error;
  }
}