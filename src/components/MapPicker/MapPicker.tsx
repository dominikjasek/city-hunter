import React, { FC } from 'react';
import GoogleMapReact from 'google-map-react';

type MapPickerInnerComponentProps = { lat: number; lng: number };

const AnyReactComponent = ({
  text,
}: { text: string } & MapPickerInnerComponentProps) => <div>{text}</div>;

export const MapPicker: FC = () => {
  const defaultProps = {
    center: {
      lat: 49.21866559856739,
      lng: 15.880347529353775,
    },
    zoom: 14,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDrZJiCrbSGVIW96qph0OJtfrFAz4scgGc' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={49.21866559856739}
          lng={15.880347529353775}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};
