import React from 'react';
import { 
    UtensilsCrossed, 
    Home, 
    Warehouse, 
    Library, 
    Milk, // For "Boot Rooms" maybe? Or just a Door icon
    DoorOpen,
    Spline // For staircases/curves
} from 'lucide-react';

const services = [
    {
        title: "Bespoke Kitchens",
        desc: "Handcrafted cabinetry, perfectly fitted to your home's unique dimensions.",
        icon: UtensilsCrossed
    },
    {
        title: "Heritage Restoration",
        desc: "Sympathetic repair of sash windows, doors, and period moldings.",
        icon: Home
    },
    {
        title: "Luxury Wardrobes",
        desc: "Floor-to-ceiling storage solutions with premium internal fittings.",
        icon: Warehouse
    },
    {
        title: "Libraries & Studies",
        desc: "Elegant shelving and desk spaces for the modern home office.",
        icon: Library
    },
    {
        title: "Grand Staircases",
        desc: "Statement centerpieces crafted from the finest hardwoods.",
        icon: Spline
    },
    {
        title: "Boot Rooms",
        desc: "Practical yet beautiful entryways to organize family life.",
        icon: DoorOpen
    }
];

const ServicesGrid = () => {
    return (
        <section className="py-24 bg-stone-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-wide">Our Expertise</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Craftsmanship for Every Room
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We don't do "flat-pack". Every piece is designed, milled, and finished in our local workshop.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <service.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
