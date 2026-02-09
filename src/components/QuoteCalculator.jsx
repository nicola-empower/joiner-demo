import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ShoppingCart, FileText, Package } from 'lucide-react';

const QuoteCalculator = () => {
    const [activeTab, setActiveTab] = useState('quotes');
    const [quotes, setQuotes] = useState([]);
    const [materials, setMaterials] = useState([]);
    
    // Quote Form State
    const [formData, setFormData] = useState({
        clientName: '',
        materialsCost: '',
        labourUnits: '',
        labourType: 'days',
        labourRate: '250',
        profitMargin: '20',
        manualTotal: ''
    });

    // Material Form State
    const [matQty, setMatQty] = useState('');
    const [matDesc, setMatDesc] = useState('');

    // Load from local storage
    useEffect(() => {
        const savedQuotes = localStorage.getItem('trade_quotes');
        const savedMaterials = localStorage.getItem('trade_materials');
        if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
        if (savedMaterials) setMaterials(JSON.parse(savedMaterials));
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('trade_quotes', JSON.stringify(quotes));
    }, [quotes]);
    
    useEffect(() => {
        localStorage.setItem('trade_materials', JSON.stringify(materials));
    }, [materials]);

    const handleQuoteSubmit = (e) => {
        e.preventDefault();
        const matCost = parseFloat(formData.materialsCost) || 0;
        const units = parseFloat(formData.labourUnits) || 0;
        const rate = parseFloat(formData.labourRate) || 0;
        const margin = parseFloat(formData.profitMargin) || 0;
        const manual = parseFloat(formData.manualTotal);

        let netTotal;
        if (!isNaN(manual) && manual > 0) {
            netTotal = manual;
        } else {
            const sub = matCost + (units * rate);
            netTotal = sub + (sub * (margin / 100));
        }

        const newQuote = {
            id: Date.now(),
            client: formData.clientName,
            grandTotal: netTotal * 1.2, // Applying 20% VAT logic from original snippet implicitly or explicitly? Snippet had * 1.2 in logic.
            matCost,
            labour: units * rate
        };

        setQuotes(prev => [newQuote, ...prev]);
        
        // Reset form but keep default rate/margin
        setFormData({
            clientName: '',
            materialsCost: '',
            labourUnits: '',
            labourType: 'days',
            labourRate: '250',
            profitMargin: '20',
            manualTotal: ''
        });
    };

    const handleAddMaterial = () => {
        if (!matDesc) return;
        setMaterials(prev => [...prev, { id: Date.now(), qty: matQty || '-', desc: matDesc }]);
        setMatQty('');
        setMatDesc('');
    };

    const quickAddMaterial = (item) => {
        setMatDesc(item);
        // Focus logic would ideally go here, but React state update is async.
        // We can leave focus for now or use a ref.
    };

    const formatGBP = (val) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val);
    const totalPipeline = quotes.reduce((acc, q) => acc + q.grandTotal, 0);

    return (
        <div className="font-sans text-slate-800">
            {/* PRINT HEADER */}
            <div className="print-only p-8 border-b-2 border-slate-900 mb-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-tighter">Materials Order</h1>
                        <p className="text-slate-500">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                        Joinery Quote Command
                    </div>
                </div>
            </div>

            <div className="no-print">
                {/* HEADER */}
                <header className="bg-slate-900 text-white pt-10 pb-20 px-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden z-0 mb-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-[Space_Grotesk] font-bold text-white mb-1">Quote Command</h1>
                            <div className="flex gap-4 mt-4">
                                <button 
                                    onClick={() => setActiveTab('quotes')}
                                    className={`pb-2 px-1 font-bold text-sm uppercase tracking-wider transition-all border-b-2 ${activeTab === 'quotes' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-white'}`}
                                >
                                    Quotes & Profit
                                </button>
                                <button 
                                    onClick={() => setActiveTab('materials')}
                                    className={`pb-2 px-1 font-bold text-sm uppercase tracking-wider transition-all border-b-2 ${activeTab === 'materials' ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400 hover:text-white'}`}
                                >
                                    Materials List
                                </button>
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Total Pipeline</div>
                            <div className="text-3xl font-[Space_Grotesk] font-bold text-cyan-500">{formatGBP(totalPipeline)}</div>
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="relative z-20 max-w-7xl mx-auto px-4 -mt-20 w-full pb-12">
                    
                    {/* QUOTES TAB */}
                    {activeTab === 'quotes' && (
                        <div className="grid lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-white/95 border border-white/20 shadow-xl rounded-2xl p-6 backdrop-blur-sm">
                                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Client Reference</label>
                                            <input 
                                                type="text" 
                                                value={formData.clientName}
                                                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500" 
                                                placeholder="e.g. Garden Office Reno" 
                                                required 
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Materials (£)</label>
                                                <input 
                                                    type="number" 
                                                    value={formData.materialsCost}
                                                    onChange={(e) => setFormData({...formData, materialsCost: e.target.value})}
                                                    step="0.01" 
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" 
                                                    placeholder="0.00" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Labour Qty</label>
                                                <div className="flex gap-1">
                                                    <input 
                                                        type="number" 
                                                        value={formData.labourUnits}
                                                        onChange={(e) => setFormData({...formData, labourUnits: e.target.value})}
                                                        step="0.5" 
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" 
                                                        placeholder="Qty" 
                                                    />
                                                    <select 
                                                        value={formData.labourType}
                                                        onChange={(e) => setFormData({...formData, labourType: e.target.value})}
                                                        className="bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold px-2"
                                                    >
                                                        <option value="days">Days</option>
                                                        <option value="hrs">Hrs</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rate (£)</label>
                                                <input 
                                                    type="number" 
                                                    value={formData.labourRate}
                                                    onChange={(e) => setFormData({...formData, labourRate: e.target.value})}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Margin (%)</label>
                                                <input 
                                                    type="number" 
                                                    value={formData.profitMargin}
                                                    onChange={(e) => setFormData({...formData, profitMargin: e.target.value})}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" 
                                                />
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100">
                                            <label className="block text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Manual Total Override (Ex VAT)</label>
                                            <input 
                                                type="number" 
                                                value={formData.manualTotal}
                                                onChange={(e) => setFormData({...formData, manualTotal: e.target.value})}
                                                className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:outline-none font-bold" 
                                                placeholder="Optional round number" 
                                            />
                                        </div>
                                        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                            <Plus size={20} /> Add to Pipeline
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:col-span-7 space-y-6">
                                <div className="bg-white/95 border border-white/20 shadow-xl rounded-2xl p-6 backdrop-blur-sm overflow-x-auto min-h-[400px]">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-[10px] uppercase text-slate-400 font-bold border-b border-slate-100">
                                                <th className="pb-4 text-left">Job</th>
                                                <th className="pb-4 text-right">Costs</th>
                                                <th className="pb-4 text-right">Total (Inc VAT)</th>
                                                <th className="pb-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {quotes.map(q => (
                                                <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="py-4 font-bold text-slate-700">{q.client}</td>
                                                    <td className="py-4 text-right text-slate-400 font-mono text-xs">£{(q.matCost + q.labour).toFixed(2)}</td>
                                                    <td className="py-4 text-right font-[Space_Grotesk] font-bold text-slate-900">{formatGBP(q.grandTotal)}</td>
                                                    <td className="py-4 text-right">
                                                        <button 
                                                            onClick={() => setQuotes(quotes.filter(i => i.id !== q.id))}
                                                            className="text-slate-200 hover:text-red-400 p-2"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {quotes.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="py-12 text-center text-slate-400 text-xs uppercase tracking-widest">
                                                        No Active Quotes
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MATERIALS TAB */}
                    {activeTab === 'materials' && (
                        <div className="grid lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-white/95 border border-white/20 shadow-xl rounded-2xl p-6 backdrop-blur-sm">
                                    <h2 className="font-[Space_Grotesk] font-bold text-xl mb-4 flex items-center gap-2">
                                        <ShoppingCart className="text-cyan-500" /> Shop List
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <input 
                                                type="number" 
                                                value={matQty} 
                                                onChange={(e) => setMatQty(e.target.value)}
                                                className="w-20 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" 
                                                placeholder="Qty" 
                                            />
                                            <input 
                                                type="text" 
                                                value={matDesc}
                                                onChange={(e) => setMatDesc(e.target.value)}
                                                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" 
                                                placeholder="Item description..." 
                                            />
                                            <button 
                                                onClick={handleAddMaterial}
                                                className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                                            >
                                                <Plus size={24} />
                                            </button>
                                        </div>

                                        <div className="space-y-6 mt-6 max-h-[400px] overflow-y-auto pr-2">
                                            <div>
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Timber & Sheets</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {['4x2 Treated', '6x2 Treated', '18mm OSB', '9mm OSB', '12.5mm P/B', 'Loglap'].map(item => (
                                                        <button 
                                                            key={item} 
                                                            onClick={() => quickAddMaterial(item)}
                                                            className="px-2 py-1.5 bg-slate-100 hover:bg-blue-100 rounded-lg text-xs transition-colors cursor-pointer"
                                                        >
                                                            {item}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Fixings</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {['90mm Nails', '50mm Nails'].map(item => (
                                                        <button key={item} onClick={() => quickAddMaterial(item)} className="px-2 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs transition-colors font-medium cursor-pointer">{item}</button>
                                                    ))}
                                                    {['80mm Screws', '50mm Screws', '25mm Drywall'].map(item => (
                                                        <button key={item} onClick={() => quickAddMaterial(item)} className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs transition-colors cursor-pointer">{item}</button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">Ground & Prep</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Postcrete'].map(item => (
                                                        <button key={item} onClick={() => quickAddMaterial(item)} className="px-2 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs transition-colors font-medium cursor-pointer">{item}</button>
                                                    ))}
                                                    {['DPM Roll', 'House Wrap', 'Insulation', 'Barge Board'].map(item => (
                                                        <button key={item} onClick={() => quickAddMaterial(item)} className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs transition-colors cursor-pointer">{item}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-7 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-slate-600">Active Order</h3>
                                    <button 
                                        onClick={() => window.print()}
                                        className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all text-blue-500 cursor-pointer"
                                    >
                                        <FileText size={16} /> Get PDF / Print
                                    </button>
                                </div>
                                <div className="bg-white/95 border border-white/20 shadow-xl rounded-2xl p-6 backdrop-blur-sm min-h-[400px]">
                                    <ul className="space-y-3">
                                        {materials.map(m => (
                                            <li key={m.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 group shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg font-bold text-xs text-blue-500">{m.qty}</span>
                                                    <span className="font-bold text-slate-700 uppercase tracking-tight text-sm">{m.desc}</span>
                                                </div>
                                                <button 
                                                    onClick={() => setMaterials(materials.filter(i => i.id !== m.id))}
                                                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-2"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    {materials.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-20 opacity-30">
                                            <Package size={48} className="mb-2" />
                                            <p className="text-xs font-bold uppercase tracking-widest">List is Empty</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* PRINT VIEW */}
            <div className="print-only px-8">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b-2 border-slate-300">
                            <th className="py-4 text-left w-12 text-slate-300 italic font-normal">TICK</th>
                            <th className="py-4 text-left w-24">QTY</th>
                            <th className="py-4 text-left font-bold uppercase tracking-widest">DESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {materials.map(m => (
                            <tr key={m.id}>
                                <td className="py-4 border-b border-slate-100 text-2xl font-light text-slate-200">▢</td>
                                <td className="py-4 font-bold border-b border-slate-100 text-lg">{m.qty}</td>
                                <td className="py-4 border-b border-slate-100 uppercase font-bold tracking-tight text-lg">{m.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-20 pt-8 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between uppercase font-bold tracking-widest">
                    <span>Generated via Quote Command</span>
                    <span>{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        </div>
    );
};

export default QuoteCalculator;
