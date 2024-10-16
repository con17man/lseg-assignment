export default async (url, options) => {
  const settings = {
    method: 'GET',
    ...options,
  };

  try {
    const response = await fetch(url, settings);

    if (response.ok) {
      const json = await response.json();

      if (json.error) {
        console.error('Something went wrong:', url, json.error);
      }

      return json;
    }
  } catch (error) {
    console.error('Something went wrong:', error);
  }
};
