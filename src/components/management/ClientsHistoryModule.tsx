import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { ClientProfile, ClientVisitRecord, NailShape, NailLength } from '../../types/nailStudio';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Instagram, 
  Calendar, 
  Camera, 
  Heart, 
  AlertTriangle, 
  Clock, 
  CreditCard, 
  Sparkles,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface ClientsHistoryModuleProps {
  initialSelectedClientName?: string;
}

export const ClientsHistoryModule: React.FC<ClientsHistoryModuleProps> = ({ initialSelectedClientName }) => {
  const { clients, addClient, updateClient, addVisitRecord, loyaltyRewards, redeemLoyaltyPoints } = useNailStudio();

  const [searchQuery, setSearchQuery] = useState(initialSelectedClientName || '');
  const [selectedClientId, setSelectedClientId] = useState<string>(
    initialSelectedClientName 
      ? clients.find(c => c.fullName.toLowerCase().includes(initialSelectedClientName.toLowerCase()))?.id || clients[0]?.id
      : clients[0]?.id
  );

  // Modals
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isRecordSetModalOpen, setIsRecordSetModalOpen] = useState(false);

  // New Client Form
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('+254 ');
  const [newEmail, setNewEmail] = useState('');
  const [newInstagram, setNewInstagram] = useState('');
  const [newShape, setNewShape] = useState<NailShape>('Almond');
  const [newLength, setNewLength] = useState<NailLength>('Medium');
  const [newAllergies, setNewAllergies] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Record Set Form
  const [setService, setSetService] = useState('Apres Gel-X Extensions');
  const [setDesign, setSetDesign] = useState('Pink Chrome Aura');
  const [setShape, setSetShape] = useState<NailShape>('Almond');
  const [setLength, setSetLength] = useState<NailLength>('Medium');
  const [setColor, setSetColor] = useState('Blossom Pink + White Unicorn Glaze');
  const [setPrice, setSetPrice] = useState(2800);
  const [setNotes, setSetNotes] = useState('Zero lifting from prior set. Cuticles hydrated.');
  const [setPhotoUrl, setSetPhotoUrl] = useState('https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=400&q=80');

  const filteredClients = clients.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim()) return;

    const created = addClient({
      fullName: newFullName,
      phone: newPhone,
      email: newEmail || `${newFullName.toLowerCase().replace(/\s+/g, '')}@client.co.ke`,
      instagram: newInstagram,
      preferredTechnician: 'Michelle Mwangi',
      preferredShape: newShape,
      preferredLength: newLength,
      allergies: newAllergies,
      notes: newNotes || 'Client onboarded at atelier.',
    });

    setSelectedClientId(created.id);
    setIsAddClientModalOpen(false);
    setNewFullName('');
  };

  const handleSaveVisitRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    addVisitRecord(selectedClient.id, {
      appointmentId: `apt_hist_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      serviceName: setService,
      designTitle: setDesign,
      shape: setShape,
      length: setLength,
      colorUsed: setColor,
      technicianName: 'Michelle Mwangi',
      priceKES: Number(setPrice),
      notes: setNotes,
      photos: setPhotoUrl ? [setPhotoUrl] : [],
    });

    setIsRecordSetModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Client Relationship & Health Tracking
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Client Profiles & Nail History
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Track past nail sets, apex retention, shapes, lengths, formulas, and before/after photos across every appointment.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddClientModalOpen(true)}
          className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>New Client Profile</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Client List & Search (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C6D46] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
              />
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pt-1">
              {filteredClients.map((client) => {
                const isSelected = client.id === selectedClient?.id;
                return (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClientId(client.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1F1D1B] text-[#FAF8F5] shadow-xs'
                        : 'hover:bg-[#FAF8F5] text-[#1F1D1B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-stone-200 shrink-0">
                        {client.avatarUrl ? (
                          <img src={client.avatarUrl} alt={client.fullName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-[#C5A880] text-stone-900">
                            {client.fullName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-semibold truncate leading-tight">{client.fullName}</h4>
                        <span className={`text-[10px] block truncate mt-0.5 ${isSelected ? 'text-[#C5A880]' : 'text-[#7A726A]'}`}>
                          {client.phone}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[11px] font-bold block ${isSelected ? 'text-white' : 'text-[#1F1D1B]'}`}>
                        {client.visitCount} sets
                      </span>
                      <span className={`text-[9px] ${isSelected ? 'text-stone-300' : 'text-[#8A827A]'}`}>
                        {client.loyaltyPoints} pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Client Detailed Dossier & History (8 cols) */}
        {selectedClient && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Client Profile Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F0EBE3]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-200 border-2 border-[#E8E2D9] shrink-0">
                    <img src={selectedClient.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} alt={selectedClient.fullName} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B] font-normal">
                        {selectedClient.fullName}
                      </h2>
                      {selectedClient.visitCount >= 5 && (
                        <span className="text-[10px] uppercase tracking-wider bg-[#C5A880]/20 text-[#8C6D46] px-2 py-0.5 rounded font-semibold">
                          VIP Regular
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-[#7A726A] mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#8C6D46]" /> {selectedClient.phone}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#8C6D46]" /> {selectedClient.email}
                      </span>
                      {selectedClient.instagram && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1 text-[#8C6D46] font-medium">
                            <Instagram className="w-3.5 h-3.5" /> {selectedClient.instagram}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRecordSetModalOpen(true)}
                    className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Record Set / Visit</span>
                  </button>
                </div>
              </div>

              {/* Anatomy & Preferences Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">Preferred Shape</span>
                  <span className="text-sm font-semibold text-[#1F1D1B] mt-0.5 block">{selectedClient.preferredShape}</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">Preferred Length</span>
                  <span className="text-sm font-semibold text-[#1F1D1B] mt-0.5 block">{selectedClient.preferredLength}</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">Total Spend</span>
                  <span className="text-sm font-semibold text-emerald-800 mt-0.5 block">KES {selectedClient.totalSpendKES.toLocaleString()}</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">Loyalty Balance</span>
                  <span className="text-sm font-semibold text-[#8C6D46] mt-0.5 block">{selectedClient.loyaltyPoints} Points</span>
                </div>
              </div>

              {/* Health Notes & Allergies */}
              <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-semibold text-amber-900">Nail Plate Condition & Notes: </strong>
                  <span>{selectedClient.allergies || 'No allergies reported.'} · {selectedClient.notes}</span>
                </div>
              </div>

            </div>

            {/* Nail History Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
                    Nail Sets Timeline ({selectedClient.history.length})
                  </h3>
                  <p className="text-xs text-[#7A726A] font-light mt-0.5">
                    Chronological record of every set, retention, shape, color codes, and photos.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsRecordSetModalOpen(true)}
                  className="text-xs text-[#8C6D46] hover:underline font-medium"
                >
                  + Add Past Set
                </button>
              </div>

              {selectedClient.history.length === 0 ? (
                <div className="text-center py-10 bg-[#FAF8F5] rounded-xl border border-dashed border-[#DDD7CD]">
                  <Camera className="w-6 h-6 text-[#8C6D46]/60 mx-auto mb-2" />
                  <p className="text-xs text-[#7A726A]">No completed sets recorded in history yet.</p>
                  <button
                    type="button"
                    onClick={() => setIsRecordSetModalOpen(true)}
                    className="mt-2 text-xs font-semibold text-[#8C6D46] hover:underline"
                  >
                    Record first set now &rarr;
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {selectedClient.history.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] hover:bg-white transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0EBE3]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1F1D1B]">{record.date}</span>
                          <span className="text-stone-300">·</span>
                          <span className="font-editorial text-lg text-[#1F1D1B] font-medium">{record.designTitle}</span>
                        </div>
                        <span className="text-xs font-semibold text-[#1F1D1B]">
                          KES {record.priceKES.toLocaleString()}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-span-8 space-y-1.5 text-xs text-[#5E564F]">
                          <div>
                            <strong className="text-[#1F1D1B]">Shape & Length: </strong>
                            <span>{record.shape} ({record.length})</span>
                          </div>
                          {record.colorUsed && (
                            <div>
                              <strong className="text-[#1F1D1B]">Color Formula: </strong>
                              <span className="text-[#8C6D46] font-medium">{record.colorUsed}</span>
                            </div>
                          )}
                          {record.notes && (
                            <div>
                              <strong className="text-[#1F1D1B]">Technician Notes: </strong>
                              <span className="italic">{record.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Set Photos */}
                        {record.photos && record.photos.length > 0 && (
                          <div className="sm:col-span-4 flex items-center justify-end gap-2">
                            {record.photos.map((p, idx) => (
                              <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden border border-white shadow-sm bg-stone-100">
                                <img src={p} alt="Set photo" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* MODAL: Add New Client Profile */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">Create Client Profile</h3>
              <button
                type="button"
                onClick={() => setIsAddClientModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wanjiku Njeri"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Instagram</label>
                  <input
                    type="text"
                    placeholder="@wanjiku"
                    value={newInstagram}
                    onChange={(e) => setNewInstagram(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Preferred Shape</label>
                  <select
                    value={newShape}
                    onChange={(e) => setNewShape(e.target.value as any)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  >
                    <option value="Almond">Almond</option>
                    <option value="Coffin">Coffin</option>
                    <option value="Square">Square</option>
                    <option value="Squoval">Squoval</option>
                    <option value="Stiletto">Stiletto</option>
                    <option value="Oval">Oval</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Preferred Length</label>
                  <select
                    value={newLength}
                    onChange={(e) => setNewLength(e.target.value as any)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  >
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                    <option value="Extra Long">Extra Long</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Health Notes / Allergies</label>
                <input
                  type="text"
                  placeholder="e.g. Sensitive cuticles, acetone sensitivity"
                  value={newAllergies}
                  onChange={(e) => setNewAllergies(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Create Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Record Set / Visit into Nail History */}
      {isRecordSetModalOpen && selectedClient && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
                Record Set for {selectedClient.fullName}
              </h3>
              <button
                type="button"
                onClick={() => setIsRecordSetModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVisitRecord} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Design / Set Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pink Chrome Aura"
                  value={setDesign}
                  onChange={(e) => setSetDesign(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Nail Shape</label>
                  <select
                    value={setShape}
                    onChange={(e) => setSetShape(e.target.value as any)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  >
                    <option value="Almond">Almond</option>
                    <option value="Coffin">Coffin</option>
                    <option value="Square">Square</option>
                    <option value="Squoval">Squoval</option>
                    <option value="Stiletto">Stiletto</option>
                    <option value="Oval">Oval</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Nail Length</label>
                  <select
                    value={setLength}
                    onChange={(e) => setSetLength(e.target.value as any)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  >
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                    <option value="Extra Long">Extra Long</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Color Code & Formulas Used</label>
                <input
                  type="text"
                  placeholder="e.g. OPI Bubble Bath base + Silver liquid chrome pen"
                  value={setColor}
                  onChange={(e) => setSetColor(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Completed Set Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={setPhotoUrl}
                  onChange={(e) => setSetPhotoUrl(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Price Paid (KES)</label>
                  <input
                    type="number"
                    value={setPrice}
                    onChange={(e) => setSetPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Loyalty Points Earned</label>
                  <div className="bg-stone-100 rounded-xl px-3.5 py-2 text-xs text-[#8C6D46] font-semibold">
                    +{Math.floor(setPrice / 100) * 10} pts
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Nail Health / Retention Notes</label>
                <textarea
                  rows={2}
                  value={setNotes}
                  onChange={(e) => setSetNotes(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecordSetModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Save to Client History
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
