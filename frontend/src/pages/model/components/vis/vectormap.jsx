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
    // Function to add popups and other actions to each feature
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.popupInformation) {
            layer.bindPopup(`<b>${feature.properties.popupInformation}</b>`);
        }
    };
    return (
        <MapContainer className="w-[600px] h-[400px]" center={[51.505, -0.09]} zoom={10} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geojson} onEachFeature={onEachFeature} />
            <FitBounds geojson={geojson} />
        </MapContainer>
    );
};
