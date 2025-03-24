import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const FitBounds = ({ geojson }) => {
    const map = useMap();

    useEffect(() => {
        if (geojson && geojson.features.length > 0) {
            const bounds = L.geoJSON(geojson).getBounds();
            map.fitBounds(bounds);
        }
    }, [geojson, map]);

    return null;
};

export const VectorMap = ({ geojson }) => {
    return (
        <MapContainer className="w-[600px] h-[400px]" center={[51.505, -0.09]} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
                data={geojson}
                style={() => ({
                    color: 'blue', // Border color
                    weight: 10, // Border thickness
                    fillColor: 'lightblue', // Fill color
                    fillOpacity: 0.5, // Transparency
                })}
            />
            <FitBounds geojson={geojson} />
        </MapContainer>
    );
};
