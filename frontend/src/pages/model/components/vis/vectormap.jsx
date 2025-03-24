import { MapContainer, TileLayer } from 'react-leaflet';

export const VectorMap = ({ geojson }) => {
    console.log(geojson);
    return (
        <MapContainer className="w-[600px] h-[400px]" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
};
