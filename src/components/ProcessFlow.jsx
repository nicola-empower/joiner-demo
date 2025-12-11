import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ProcessFlow = ({
    title = "How It Works",
    subtitle = "Our Process",
    steps = [
        { title: "Consultation", desc: "We discuss your needs and assess the property." },
        { title: "Quote", desc: "You receive a fixed-price detailed proposal." },
        { title: "Scheduling", desc: "We agree on a start date that suits you." },
        { title: "Completion", desc: "Work is completed to standard and signed off." }
    ]
}) => {
    return (
        <div className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-accent">{subtitle}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {title}
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {steps.map((step, stepIdx) => (
                        <div key={step.title} className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900">
                                <div className="absolute left-0 top-1 h-5 w-5 text-accent">
                                    <CheckCircle2 size={20} />
                                </div>
                                {step.title}
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">{step.desc}</dd>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProcessFlow;
