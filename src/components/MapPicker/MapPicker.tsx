import React, { FC, useRef, useState } from 'react';
// import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import Image from 'next/image';
import MapMarker from '@public/map-marker.svg';
import GoogleMap from 'google-maps-react-markers';

// const Marker: FC = () => {
//   const markerStyle = {
//     border: '1px solid white',
//     borderRadius: '50%',
//     height: 10,
//     width: 10,
//     backgroundColor: 'red',
//     cursor: 'pointer',
//     zIndex: 10,
//   };
//
//   return (
//     <>
//       <div style={markerStyle} />
//     </>
//   );
// };

// interface ImagePropsa extends ImageProps {
//   lat: number;
//   lng: number;
// }
type Location = { lat: number; lng: number };
const defaultProps = {
  center: {
    lat: 49.21866559856739,
    lng: 15.880347529353775,
  },
  zoom: 14,
};

export const MapPicker: FC = () => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [marker, setMarker] = useState<Location>({
    lat: 49.21585775024331,
    lng: 15.876858895730825,
  });

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;

    new maps.Marker({
      position: {
        lat: marker.lat,
        lng: marker.lng,
      },
      map,
    });

    setMapReady(true);
  };

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId);

    // inside the map instance you can call any google maps method
    if (!mapRef.current) {
      return;
    }
    mapRef.current.setCenter({ lat, lng });
    // rif. https://developers.google.com/maps/documentation/javascript/reference?hl=it
  };

  return (
    // // Important! Always set the container height explicitly
    // <div style={{ height: '400px', width: '100%' }}>
    //   <GoogleMapReact
    //     bootstrapURLKeys={{ key: 'AIzaSyDrZJiCrbSGVIW96qph0OJtfrFAz4scgGc' }}
    //     defaultCenter={defaultProps.center}
    //     defaultZoom={defaultProps.zoom}
    //     options={{ draggableCursor: 'crosshair' }}
    //     onClick={handleMapClick}
    //     // onGoogleApiLoaded={({ map, maps }) =>
    //     //   handleApiLoaded(map, maps, marker)
    //     // }
    //   >
    //     <Image
    //       lat={marker.lat}
    //       lng={marker.lng}
    //       priority
    //       src={MapMarker}
    //       alt="Follow us on Twitter"
    //       height={40}
    //       width={24}
    //       // style={{
    //       //   transform: 'translate(-12px, -20px)',
    //       // }}
    //     />
    //   </GoogleMapReact>
    // </div>
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMap
        apiKey="AIzaSyDrZJiCrbSGVIW96qph0OJtfrFAz4scgGc"
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        // options={mapOptions}
        mapMinHeight="400px"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map: any) => console.log('Map moved', map)}
        onClick={(map: any) => console.log('Map clicked', map)}
      >
        <Image
          lat={marker.lat}
          lng={marker.lng}
          src={MapMarker}
          height={50}
          width={30}
          style={{
            transform: 'translate(-15px, -46px)',
          }}
        />
      </GoogleMap>
    </div>
  );
};
