import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlyToDistrict = ({ coord }) => {
  const map = useMap();
  useEffect(() => {
    if (coord) map.flyTo(coord, 13, { animate: true, duration: 1.5 });
  }, [coord]);
  return null;
};

const Coverage = () => {
  const position = [23.7104, 90.40744];
  const [serviceCentres, setServiceCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flyCoord, setFlyCoord] = useState(null);

  // Fetch data from public folder using axios
  useEffect(() => {
    axios
      .get("/ServiceCentres.json")
      .then((res) => setServiceCentres(res.data))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.toLowerCase();
    const district = serviceCentres.find((c) =>
      c.district.toLowerCase().includes(location)
    );

    if (district) {
      toast.success(`${district.district} found!`, {
        position: "top-center",
        autoClose: 2000,
      });
      setFlyCoord([district.latitude, district.longitude]);
    } else {
      toast.error("District not found!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="my-14 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-secondary">
          We are available in 64 districts
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Search your district to see if our service is available in your area.
        </p>
      </div>

      <div className="max-w-md mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-secondary dark:bg-gray-800">
            <input
              name="location"
              type="search"
              placeholder="Search your district..."
              required
              className="w-full outline-none text-sm md:text-base"
            />
            <button className="text-secondary font-bold px-2 py-1 rounded-xl">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="w-full mx-auto shadow-2xl">
        <div className="w-full  h-[60vh] md:h-[75vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {flyCoord && <FlyToDistrict coord={flyCoord} />}

            {serviceCentres.map((centre, index) => (
              <Marker
                key={index}
                position={[centre.latitude, centre.longitude]}
              >
                <Popup>
                  <strong>{centre.district}</strong>
                  <br />
                  Service Area: {centre.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
