import fewClouds from "../assets/poucas-nuvens.png";

// interface ImageMeteorologicalType {
//   urls: {
//     full: string;
//     regular: string;
//   };
//   description: string;
//   alt_description: string;
// }

export function BannerMeteorological() {
  // Simulate a request to the Unsplash API
  // const images: ImageMeteorologicalType[] = [
  //   {
  //     urls: {
  //       full: "https://images.unsplash.com/photo-1615365878470-6f4c1b2f5b9c",
  //       regular: "https://images.unsplash.com/photo-1615365878470-6f4c1b2f5b9c",
  //     },
  //     description: "A beautiful nature",
  //     alt_description: "Random nature",
  //   },
  // ];

  // Uncomment the code below to make a request to the Unsplash API
  // const {
  //   data: images,
  //   error,
  //   loading,
  // } = useFetch<ImageMeteorologicalType[]>({
  //   url: `https://api.unsplash.com/photos/random?client_id=${
  //     import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  //   }&query=nature&count=1`,
  // });
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // const imageUrl = images?.[0];

  return (
    <section>
      <div className="bg-primary w-full h-28 flex items-center">
        {/* <img
          className="w-full h-28 object-cover "
          src={imageUrl?.urls.regular ?? ""}
          alt={imageUrl?.alt_description ?? "Random nature"}
        /> */}
        <img
          className="w-full h-28 object-cover opacity-70 absolute"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // alt={imageUrl?.alt_description ?? "Random nature"}
        />

        <div className="relative container m-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={fewClouds} alt="" />
            <span className="text-white text-3xl font-semibold">28°C</span>
          </div>

          <div className="flex gap-4 ">
            <div className="text-white text-right text-lg font-medium">
              <p className="text-lg">22 de Setembro de 2024 - 20:00h</p>
              <p className="font-light">Parcialmente nublado</p>
            </div>
            <div className="text-white block border-l-2 pl-3 font-medium">
              <p>Chuva: 5%</p>
              <p>Umidade: 38%</p>
              <p>Vento: 8 km/h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
