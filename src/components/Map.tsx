import * as React from 'react';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { IFogStore } from '../StoreData';
import './Map.css';


export interface IProps {
    gotStoreData: boolean;
    stores: IFogStore[];
    selectedStoreId: number;
    selectMarker: (id: number) => void;
    deselectMarker: () => void;
}

const Map = withScriptjs(withGoogleMap((props: IProps) => {
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 37.764438, lng: -122.452312 }}>
            {props.stores.map((store: IFogStore, index: number) => {
                return (
                    <Marker
                        title={`Marker associated with ${store.name} on the map`}
                        onClick={() => props.selectMarker(Number(store.id))}
                        key={store.id}
                        zIndex={110}
                        position={store.coordinates}
                        defaultAnimation={google.maps.Animation.DROP}
                        animation={props.selectedStoreId === null
                            ? google.maps.Animation.DROP
                            : props.selectedStoreId === store.id
                                ? google.maps.Animation.BOUNCE : undefined}>
                        {
                            props.selectedStoreId === store.id && props.gotStoreData &&
                            <InfoWindow zIndex={1000} onCloseClick={() => props.deselectMarker()}>
                                <div className='info-window'>
                                    <p>{store.name}</p>
                                    <img
                                        className='map-store-image'
                                        src={store.details.image_url}
                                        alt={`Image of liqour store '${store.name}'`} />

                                    <ul className='map-store-details'>
                                        <li>Phone: {store.details.phone}</li>
                                        {store.details.hours && store.details.hours[0].is_open_now &&
                                            <li>Open: {store.details.hours[0].is_open_now ? 'yes' : 'no'}</li>}
                                        <li>{store.details.location.display_address}</li>
                                    </ul>
                                    <a className='yelp-link'><img
                                        className='yelp-logo'
                                        src='./Yelp_trademark_RGB.png'
                                        alt={'Image of yelp logo'} />
                                    </a>
                                </div>
                            </InfoWindow>
                        }
                    </Marker>
                );
            })}
        </GoogleMap>);
}));

export default Map;