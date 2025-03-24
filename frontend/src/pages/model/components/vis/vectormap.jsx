export const VectorMap = ({ geojson }) => {
    console.log(geojson);
    return (
        <>
            <div id="map" className="h-[180px]"></div>
        </>
    );
};

// L.map('map').setView([51.505, -0.09], 13);
