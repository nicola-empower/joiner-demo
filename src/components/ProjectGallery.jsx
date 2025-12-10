import React from 'react';
import { ZoomIn } from 'lucide-react';

const ProjectGallery = () => {
    const images = [
        { src: "/images/job2-1.jpg", title: "Project Overview", desc: "Custom fitted joinery" },
        { src: "/images/job2-2.jpg", title: "Detail View", desc: "Precision craftsmanship" },
        { src: "/images/job2-3.jpg", title: "Material Finish", desc: "High-grade timber" }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {images.map((img, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white aspect-[4/3]">
                    <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h4 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h4>
                        <p className="text-gray-200 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.desc}</p>
                    </div>
                    <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-amber-600">
                        <ZoomIn size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProjectGallery;
