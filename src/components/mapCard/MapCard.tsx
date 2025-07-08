import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// fix icon issue
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ✅ Helper to update map center
function SetViewOnLocation({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [map, position]);
  return null;
}

const MapCard = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setLocation(coords);
      },
      (err) => {
        console.error("Geolocation error:", err.message);
      }
    );
  }, []);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Your Current Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px] w-full rounded-md overflow-hidden">
          <MapContainer
            center={location || [23.8103, 90.4125]} // fallback: Dhaka
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {location && (
              <>
                <Marker position={location}>
                  <Popup>You are here</Popup>
                </Marker>
                <SetViewOnLocation position={location} />
              </>
            )}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapCard;
