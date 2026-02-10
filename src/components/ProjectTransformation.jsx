import React, { useState } from 'react';
import { Sun, Moon, ArrowRight, History } from 'lucide-react';

const ProjectTransformation = () => {
    const [view, setView] = useState('after'); // 'before', 'after', 'night'

    const images = {
        before: "/hero.png",
        after: "/images/joiner-library.png",
        night: "/images/joiner-hallway.png"
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-100 bg-stone-50">
                <div>
                    <div className="flex items-center gap-2 text-amber-700 font-semibold mb-1">
                        <span className="bg-amber-100 px-3 py-1 rounded-full text-xs uppercase tracking-wider">Project Focus</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Bespoke Garden Decking</h3>
                    <p className="text-gray-500">From concept to evening ambience.</p>
                </div>

                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                    <button
                        onClick={() => setView('before')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${view === 'before' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <History size={16} /> Before
                    </button>
                    <button
                        onClick={() => setView('after')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${view === 'after' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Sun size={16} /> After
                    </button>
                    <button
                        onClick={() => setView('night')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${view === 'night' ? 'bg-indigo-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Moon size={16} /> Night
                    </button>
                </div>
            </div>

            <div className="relative aspect-video w-full bg-gray-100 overflow-hidden group">
                <img
                    src={images[view]}
                    alt={`Project ${view} view`}
                    className="w-full h-full object-cover transition-opacity duration-500 animate-fade-in"
                />

                {/* Overlay Description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-24 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-medium text-lg">
                        {view === 'before' && "Original site prior to groundworks and structural framing."}
                        {view === 'after' && "Completed installation featuring premium hardwood and hidden fixings."}
                        {view === 'night' && "Integrated LED lighting creates a warm, inviting evening atmosphere."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectTransformation;
