import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ icon, title, count, image }) {
    return (
        <Link to={`/category/${title}`} className="group relative flex flex-col items-center justify-center h-96 overflow-hidden rounded-3xl shadow-lg transition-all hover:shadow-2xl cursor-pointer">
            <div className="absolute inset-0">
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/40 to-transparent transition-opacity duration-300 group-hover:from-green-950/95" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center p-6 transform transition-transform duration-300 group-hover:-translate-y-2">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-full mb-4 text-white border border-white/20 group-hover:bg-green-600 group-hover:border-green-600 transition-colors duration-300">
                    {icon}
                </div>
                <h3 className="font-bold text-3xl text-white mb-2 tracking-tight">{title}</h3>
                <p className="text-green-100 font-medium bg-green-900/30 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">{count}</p>

                <div className="mt-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center text-white font-semibold border-b-2 border-green-400 pb-1">
                        Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    )
}
