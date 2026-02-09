import React from 'react';
import { Instagram } from 'lucide-react';

const socialPosts = [
    { src: "/images/job2-1.jpg", caption: "Finishing touches on the Walnut wardrobe." },
    { src: "/images/job2-2.jpg", caption: "Installation day in Cambridge." },
    { src: "/images/job2-3.jpg", caption: "Selecting timber for the new commission." },
    { src: "/hero.png", caption: "The workshop at sunset." },
];

const SocialGrid = () => {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">From the Workbench</h2>
                        <p className="mt-2 text-gray-600">Follow our latest projects on Instagram.</p>
                    </div>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-accent font-semibold hover:text-amber-700 transition-colors">
                        <Instagram size={20} />
                        @OakAndChisel
                    </a>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {socialPosts.map((post, idx) => (
                        <a key={idx} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                            <img
                                src={post.src}
                                alt={post.caption}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                <p className="text-white text-center text-sm font-medium">{post.caption}</p>
                            </div>
                            <div className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                <Instagram size={18} />
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <a href="https://instagram.com" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-amber-700 transition-colors">
                        <Instagram size={20} />
                        Follow @OakAndChisel
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SocialGrid;
