export const getWeather = async (req, res) => {
  const { city } = req.query;
  const resp = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours%2Cdays%2Ccurrent&key=${process.env.WEATHER_API_KEY}&contentType=json`
  );
  const data = await resp.json();
  return res.json(data);
};
