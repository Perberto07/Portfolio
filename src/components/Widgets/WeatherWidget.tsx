//import { useEffect, useState } from "react";
//import { Loader2 } from "lucide-react";
//export default function WeatherWidget() {
//    const [weather, setWeather] = useState<any>(null);
//    const [loading, setLoading] = useState(true);

//    useEffect(() => {
//        if (navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(async (pos) => {
//                try {
//                    const lat = pos.coords.latitude;
//                    const lon = pos.coords.longitude;

//                    const res = await fetch(
//                        
//                        `https://ac2abf6b2d30.ngrok-free.app/api/weather/current?lat=${lat}&lon=${lon}`
//                    );
//                    const data = await res.json();
//                    setWeather(data.current_weather);
//                } catch (error) {
//                    console.error("Weather fetch failed:", error);
//                } finally {
//                    setLoading(false);
//                }
//            });
//        } else {
//            setLoading(false);
//        }
//    }, []);

//    return (
//        <div className="flex items-center gap-3 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-sm text-blue-50">
//            {loading ? (
//                <Loader2 size={14} className="animate-spin text-blue-100" />
//            ) : weather ? (
//                <div className="flex items-center gap-2">
//                    <span>🌥️ {weather.temperature}°C</span>
//                    <span className="text-xs text-blue-200">💨 {weather.windspeed} km/h</span>
//                </div>
//            ) : (
//                <span className="text-xs text-blue-200">No data</span>
//            )}
//        </div>
//    );

//}

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type Weather = {
    temperature: number;
    windspeed: number;
    weathercode?: number;
};

export default function WeatherWidget() {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                try {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;

                    const res = await fetch(
                        //`https://localhost:7295/api/weather/current?lat=${lat}&lon=${lon}`
                        `https://ac2abf6b2d30.ngrok-free.app/api/weather/current?lat=${lat}&lon=${lon}`
                    );
                    const data = await res.json();
                    setWeather(data.current_weather); // matches Weather type
                } catch (error) {
                    console.error("Weather fetch failed:", error);
                } finally {
                    setLoading(false);
                }
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="flex items-center gap-3 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 text-sm text-blue-50">
            {loading ? (
                <Loader2 size={14} className="animate-spin text-blue-100" />
            ) : weather ? (
                <div className="flex items-center gap-2">
                    <span>🌥️ {weather.temperature}°C</span>
                    <span className="text-xs text-blue-200">💨 {weather.windspeed} km/h</span>
                </div>
            ) : (
                <span className="text-xs text-blue-200">No data</span>
            )}
        </div>
    );
}

