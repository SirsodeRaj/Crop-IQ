"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { X, MapPin } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 20.5937,
  lng: 78.9629 // India center
};

export function MapModal({ 
  isOpen, 
  onClose, 
  onLocationSelect 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onLocationSelect: (lat: number, lng: number, locationName: string) => void;
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [address, setAddress] = useState<string>("Select a location on the map");

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(5);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setSelectedLocation({ lat, lng });

    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const addressComponents = results[0].address_components;
          const city = addressComponents.find(c => c.types.includes("locality"))?.long_name;
          const state = addressComponents.find(c => c.types.includes("administrative_area_level_1"))?.long_name;
          setAddress(city ? `${city}, ${state}` : results[0].formatted_address);
        } else {
          setAddress("Custom Map Location");
        }
      });
    } catch (err) {
      setAddress("Custom Map Location");
    }
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation.lat, selectedLocation.lng, address);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl relative"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="text-primary w-5 h-5" /> Choose Location
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 bg-slate-50 relative">
              {!isLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium animate-pulse">Loading Maps...</div>
              ) : (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={5}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={handleMapClick}
                  options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                  }}
                >
                  {selectedLocation && (
                    <Marker position={selectedLocation} />
                  )}
                </GoogleMap>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Selected Location</p>
                <p className="text-slate-800 font-semibold">{address}</p>
              </div>
              <button 
                onClick={handleConfirm}
                disabled={!selectedLocation}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                Confirm Location
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
