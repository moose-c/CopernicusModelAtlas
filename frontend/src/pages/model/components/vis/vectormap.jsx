import { MapContainer, TileLayer, useMap, GeoJSON, CircleMarker } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DownloadIcon from '@mui/icons-material/Download';
import IconWithTooltip from 'icon-with-tooltip';

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

    const pointToLayer = (feature, latlng) => {
        return L.circleMarker(latlng);
    };

    const styleFeature = (feature) => {
        let color = feature.properties?.['color'] || feature.properties?.['Color'];
        if (!color) {
            color = '#3388ff';
        }
        return {
            color: color,
            fillColor: color,
            weight: 1,
            fillOpacity: 0.8,
        };
    };

    const handleDownloadJson = () => {
        const blob = new Blob([JSON.stringify(geojson, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'map-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <MapContainer className="w-[300px] h-[400px] md:w-[700px]" center={[51.505, -0.09]} zoom={10} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={geojson} onEachFeature={onEachFeature} pointToLayer={pointToLayer} style={styleFeature} />
                <FitBounds geojson={geojson} />
            </MapContainer>
            <div className="cursor-pointer p-2" onClick={handleDownloadJson}>
                <IconWithTooltip Icon={DownloadIcon} text="Download file" placement="top" />
            </div>
        </>
    );
};
