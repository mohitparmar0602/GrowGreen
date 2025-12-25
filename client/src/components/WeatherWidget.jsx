import React, { useState, useEffect } from 'react';
import { CloudSun, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function WeatherWidget() {
    const [weather, setWeather] = useState({
        temp: 28,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        tip: 'Perfect conditions for harvesting wheat.'
    });

    // Simulate weather updates or fetch from API in real implementation
    useEffect(() => {
        // Mock data rotation
        const conditions = [
            { temp: 28, condition: 'Sunny', tip: 'Perfect conditions for harvesting.', icon: 'sun' },
            { temp: 24, condition: 'Cloudy', tip: 'Good time for fertilizer application.', icon: 'cloud' },
            { temp: 22, condition: 'Rainy', tip: 'Pause irrigation today.', icon: 'rain' }
        ];

        // Just picking one for demo stability, or could use random
        // setWeather(conditions[0]); 
    }, []);

    const getWeatherIcon = () => {
        switch (weather.condition) {
            case 'Rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
            case 'Cloudy': return <CloudSun className="h-8 w-8 text-gray-500" />;
            default: return <Sun className="h-8 w-8 text-yellow-500" />;
        }
    };

    return (
        <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg w-full max-w-sm">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {getWeatherIcon()}
                        <div>
                            <div className="text-2xl font-bold flex items-start text-black drop-shadow-[0_2px_2px_rgba(74,222,128,0.8)]">
                                {weather.temp}°C
                            </div>
                            <div className="text-sm text-slate-500 font-medium">{weather.condition}</div>
                        </div>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                        <div className="flex items-center gap-1 justify-end"><Droplets className="h-3 w-3" /> {weather.humidity}%</div>
                        <div className="flex items-center gap-1 justify-end"><Wind className="h-3 w-3" /> {weather.windSpeed} km/h</div>
                    </div>
                </div>
                <div className="bg-blue-50 text-blue-800 text-xs p-2 rounded-md font-medium border border-blue-100">
                    💡 Tip: {weather.tip}
                </div>
            </CardContent>
        </Card>
    );
}
