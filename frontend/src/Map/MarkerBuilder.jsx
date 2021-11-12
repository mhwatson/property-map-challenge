import React from 'react';
import { Marker, Popup } from "react-leaflet";

const MarkerBuilder = ({ properties }) => {
  // TODO: Tried to speed up re-rendering by filtering non-visible, seems negligible
  // const parentMap = useMap();
  // const [bounds, setBounds] = useState(parentMap.getBounds());
  // const onChange = useCallback(() => { setBounds(parentMap.getBounds()) }, [parentMap]);
  // parentMap.on('moveend', onChange);
  if (!properties) {
    return null;
  }
  return properties
    // .filter(({ longitude: lng, latitude: lat }) => bounds.contains([lat, lng]))
    .map((property) => {
    const position = [property.latitude, property.longitude];
    const {
      property: propertyName,
      monthly_rate,
      lease_term_months,
      total_views,
    } = property;

    return (
      <Marker position={position} key={propertyName}>
        <Popup>
          <b>{propertyName}</b><br />
          <span>Monthly Rate: ${monthly_rate}</span><br />
          <span>Lease Term: {lease_term_months} months</span><br />
          <span>Total Views: {total_views}</span><br />
        </Popup>
      </Marker>
    );
  })
}

export default MarkerBuilder;