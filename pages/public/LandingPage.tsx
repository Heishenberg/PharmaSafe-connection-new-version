
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Droplets, Wallet, TrendingUp, ShieldCheck, Truck, 
  Building2, Star, ChevronDown, ChevronUp
} from 'lucide-react';
import { Logo } from '../../components/Logo';
import { Footer } from '../../components/common/Footer';
import { RoleSelectionModal } from '../../components/auth/RoleSelectionModal';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <RoleSelectionModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      
      {/* --- HERO SECTION --- */}
      <div id="impact" className="relative min-h-[90vh] overflow-hidden flex flex-col pt-10 md:pt-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-12">
          
          <div className="flex flex-col md:flex-row items-center gap-12 mt-8 md:mt-0">
            {/* LEFT: Copy & Actions */}
            <div className="flex-1 text-center md:text-left space-y-8 animate-in slide-in-from-left-8 duration-700">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs uppercase tracking-wider mb-2">
                  ♻️ The Future of Pharma Disposal
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  When Medicine Stops Healing, We Make Sure It Doesn't Harm.
                  <br/>
                  <span className="text-teal-700">Heal the Planet.</span>
                </h1>
                <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">
                  AI-powered safe disposal of unused medicines—protecting families, communities, and the planet.
                </p>
              </div>

              {/* THREE MAIN BUTTONS */}
              <div className="flex flex-col lg:flex-row items-center gap-4 justify-center md:justify-start flex-wrap">
                <button 
                  onClick={() => navigate('/user-login')}
                  className="w-full sm:w-auto px-6 py-4 bg-teal-700 text-white rounded-xl font-bold shadow-xl hover:bg-teal-800 transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <ShieldCheck className="w-6 h-6" />
                  <div className="text-left">
                    <span className="block text-xs opacity-80 uppercase tracking-wide">User</span>
                    <span className="block leading-none">Dispose Medicine</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate('/agent-login')}
                  className="w-full sm:w-auto px-6 py-4 bg-slate-900 text-orange-500 border border-orange-500/30 rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <Truck className="w-6 h-6" />
                  <div className="text-left">
                    <span className="block text-xs opacity-80 uppercase tracking-wide text-orange-400">Agent</span>
                    <span className="block leading-none">Partner Login</span>
                  </div>
                </button>

                <button 
                  onClick={() => navigate('/hospital-login')}
                  className="w-full sm:w-auto px-6 py-4 bg-cyan-700 text-white border border-cyan-500/30 rounded-xl font-bold shadow-xl hover:bg-cyan-800 transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <Building2 className="w-6 h-6" />
                  <div className="text-left">
                    <span className="block text-xs opacity-80 uppercase tracking-wide text-cyan-200">Hospital</span>
                    <span className="block leading-none">Partner Portal</span>
                  </div>
                </button>
              </div>
              
              <p className="text-sm text-slate-500 font-medium">
                Trusted by 10,000+ households and 500+ certified agents.
              </p>
            </div>

            {/* RIGHT: Floating Glass Card */}
            <div className="flex-1 w-full max-w-md animate-in slide-in-from-right-8 duration-700 hidden md:block">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Real-Time Impact</h2>
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-green-100/80 text-green-800 px-2 py-1 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                    Live Data
                  </span>
                </div>

                <div className="relative h-48 mb-6 flex items-center justify-center">
                   <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-lg">
                     <path d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="8" strokeLinecap="round" />
                     <path d="M10 50 A 40 40 0 0 1 75 22" fill="none" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
                   </svg>
                   <div className="absolute bottom-0 text-center pb-2">
                     <span className="block text-3xl font-black text-slate-800">88%</span>
                     <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">City Health Score</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 p-3 rounded-2xl border border-white/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-bold text-slate-500 uppercase">CO2 Avoided</span>
                    </div>
                    <p className="text-xl font-bold text-slate-800">186kg</p>
                  </div>

                  <div className="bg-white/60 p-3 rounded-2xl border border-white/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-slate-500 uppercase">Water Safe</span>
                    </div>
                    <p className="text-xl font-bold text-slate-800">98k L</p>
                  </div>

                  <div className="bg-white/60 p-3 rounded-2xl border border-white/50">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-bold text-slate-500 uppercase">Credits</span>
                    </div>
                    <p className="text-xl font-bold text-slate-800">4.5M</p>
                  </div>

                  <div className="bg-white/60 p-3 rounded-2xl border border-white/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Wallet className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-500 uppercase">Savings</span>
                    </div>
                    <p className="text-xl font-bold text-slate-800">€1,499</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-bold uppercase tracking-wider text-sm mb-2 block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">How It Works</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">Join the movement in three easy steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6">
                   <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Scan Medicine</h3>
                <p className="text-slate-500">Use AI to identify if the medicine is high-risk or standard.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                   <Truck className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Schedule Pickup</h3>
                <p className="text-slate-500">A certified collection agent picks it up from your doorstep.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-6">
                   <Wallet className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Earn Rewards</h3>
                <p className="text-slate-500">Get Green Credits redeemable for discounts and insurance.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by the Community</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Join thousands of users and partners making a difference every single day.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReviewCard 
              type="user"
              name="Sarah Jenkins"
              role="Mother of two"
              content="Saved my kids from accidental poisoning! The AI identification feature is a lifesaver for checking old meds."
              rating={5}
            />
            <ReviewCard 
              type="agent"
              name="Vikram Singh"
              role="Fleet Owner"
              content="Best logistics platform for medical waste. The route optimization helps me save fuel and time every day."
              rating={5}
            />
            <ReviewCard 
              type="user"
              name="David Chen"
              role="Environmentalist"
              content="Finally, a way to dispose of medicines without polluting our water systems. The credit system is a great bonus!"
              rating={4}
            />
            <ReviewCard 
              type="agent"
              name="Rahul Sharma"
              role="Planet Prescription Agent"
              content="Verified pickups mean safer work conditions for us. The dedicated app makes the job professional and easy."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-20 px-4 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about safe disposal.</p>
          </div>
          
          <div className="space-y-4">
             <FAQItem 
               question="Is the disposal service free for households?"
               answer="Yes! We provide free pickup for household quantities of medicines. You even earn Green Credits for responsible disposal."
             />
             <FAQItem 
               question="What types of medicines are accepted?"
               answer="We accept tablets, capsules, syrups, ointments, and patches. We do not currently accept needles or sharps in the standard pickup."
             />
             <FAQItem 
               question="How do I become a collection partner?"
               answer="Click the 'Partner Login' button at the top, select 'New Registration', and complete the verification process including vehicle details."
             />
             <FAQItem 
               question="What happens to the collected medicine?"
               answer="Medicines are segregated at our certified facilities. Low-risk items are recycled for chemical components, while high-risk items are incinerated safely."
             />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

    </div>
  );
};

// --- Sub-components ---

const ReviewCard = ({ type, name, role, content, rating }: { type: 'user' | 'agent', name: string, role: string, content: string, rating: number }) => {
  const isUser = type === 'user';
  return (
    <div className={`p-6 rounded-2xl border ${isUser ? 'bg-green-50/50 border-green-100' : 'bg-slate-800 border-slate-700 text-white'} transition-all hover:-translate-y-1 duration-300 shadow-sm`}>
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${isUser ? 'text-amber-400' : 'text-orange-500'} fill-current`} />
        ))}
      </div>
      <p className={`text-sm mb-4 leading-relaxed ${isUser ? 'text-slate-700' : 'text-slate-300'}`}>"{content}"</p>
      <div className="flex items-center gap-3">
         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isUser ? 'bg-teal-100 text-teal-700' : 'bg-orange-500/20 text-orange-500 border border-orange-500/30'}`}>
            {name.charAt(0)}
         </div>
         <div>
           <p className={`font-bold text-sm ${isUser ? 'text-slate-900' : 'text-white'}`}>{name}</p>
           <p className={`text-xs ${isUser ? 'text-slate-500' : 'text-slate-400'}`}>{role}</p>
         </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        {question}
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
           {answer}
        </div>
      )}
    </div>
  );
};
