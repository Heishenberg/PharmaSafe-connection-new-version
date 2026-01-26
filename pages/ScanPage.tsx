import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, AlertCircle, X, Zap, ArrowLeft, CheckCircle, FileText, MapPin, Calendar, Clock, Navigation } from 'lucide-react';
import { AnalysisCard } from '../components/AnalysisCard';
import { BackButton } from '../components/BackButton';
import { analyzeMedicineImage } from '../services/geminiService';
import { MedicineAnalysis } from '../types';

interface ScanPageProps {
  onSchedulePickup: (analysis: MedicineAnalysis) => void;
}

export const ScanPage: React.FC<ScanPageProps> = ({ onSchedulePickup }) => {
  // Step State: 'identify' -> 'pickup' -> 'success'
  const [step, setStep] = useState<'identify' | 'pickup' | 'success'>('identify');

  // Analysis / Media States
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MedicineAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Camera States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Form States
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: '',
    purpose: '',
    mfgDate: '',
    expiryDate: '',
    price: ''
  });
  
  const [pickupForm, setPickupForm] = useState({
    address: '',
    landmark: '',
    date: '',
    timeSlot: 'Morning 9-12'
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Attach stream to video element when camera opens
  useEffect(() => {
    if (isCameraOpen && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  }, [isCameraOpen, stream]);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      setImage(null);
      setAnalysis(null);
      setIsManualEntry(false); 
    } catch (err) {
      console.error("Camera Error:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleRetake = () => {
    setImage(null);
    setAnalysis(null);
    startCamera();
  };

  const handleAnalyze = () => {
    if (image) {
      performAnalysis(image.split(',')[1]);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setAnalysis(null);
    setIsManualEntry(false);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const performAnalysis = async (base64Data: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeMedicineImage(base64Data);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setStep('identify');
    setIsManualEntry(false);
    setPickupForm({ address: '', landmark: '', date: '', timeSlot: 'Morning 9-12' });
    setManualForm({ name: '', purpose: '', mfgDate: '', expiryDate: '', price: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
    stopCamera();
  };

  // --- Handlers ---
  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualForm(prev => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Transition to Pickup Step
    setStep('pickup');
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPickupForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const medicineName = analysis ? analysis.name : manualForm.name;
    const riskLevel = analysis ? analysis.riskLevel : 'Unknown';

    // Create new pickup object
    const newPickup = {
      id: Date.now().toString(),
      medicineName: medicineName,
      pickupDate: pickupForm.date,
      timeSlot: pickupForm.timeSlot,
      status: 'Scheduled',
      riskLevel: riskLevel,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existingData = localStorage.getItem('userPickups');
      const pickups = existingData ? JSON.parse(existingData) : [];
      pickups.unshift(newPickup); // Add new item to the top
      localStorage.setItem('userPickups', JSON.stringify(pickups));
      
      // Update Lifetime Usage Count (Safe Parsing)
      const rawUsage = localStorage.getItem('lifetimeUsage');
      const currentCount = rawUsage ? parseInt(rawUsage, 10) : 0;
      const safeCount = isNaN(currentCount) ? 0 : currentCount;
      const newCount = safeCount + 1;
      
      localStorage.setItem('lifetimeUsage', newCount.toString());

      console.log("Saved pickup:", newPickup);
    } catch (err) {
      console.error("Failed to save pickup to localStorage", err);
    }
    
    setStep('success');
  };

  // --- Render: Camera View (Only in Identify step) ---
  if (isCameraOpen && step === 'identify') {
    return (
      <div className="fixed inset-0 bg-black z-[60] flex flex-col">
        <div className="flex justify-between items-center p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <span className="text-white font-medium">Scan Medicine</span>
          <button onClick={stopCamera} className="text-white p-2 rounded-full hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="p-8 bg-black/20 backdrop-blur-sm absolute bottom-0 left-0 right-0 flex justify-center items-center pb-safe">
          <button 
            onClick={captureImage}
            className="w-20 h-20 rounded-full border-4 border-white bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all active:scale-95 shadow-lg"
            aria-label="Capture Photo"
          >
            <div className="w-16 h-16 rounded-full bg-white"></div>
          </button>
        </div>
      </div>
    );
  }

  // --- Render: Main Container ---
  return (
    <div className="max-w-lg mx-auto p-4 space-y-6 pb-24 md:pb-8">
      
      <BackButton />

      {/* 
        STEP 1: IDENTIFY (Scan/Manual/Analysis) 
      */}
      {step === 'identify' && (
        <>
          <header className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {isManualEntry ? 'Manual Entry' : 'Scan Medicine'}
            </h1>
            <p className="text-slate-500">
              {isManualEntry 
                ? 'Enter medicine details to check buy-back eligibility.' 
                : 'Take a photo or upload an image to analyze risk.'}
            </p>
          </header>

          {/* Manual Entry Form */}
          {isManualEntry && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-right-8 duration-300">
              <button onClick={() => setIsManualEntry(false)} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Scan
              </button>
              
              <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Name</label>
                    <input required name="name" value={manualForm.name} onChange={handleManualChange} placeholder="e.g. Dolo 650" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Purpose/Reason for Use</label>
                    <input required name="purpose" value={manualForm.purpose} onChange={handleManualChange} placeholder="e.g. Fever" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Manufacture Date</label>
                      <input required type="date" name="mfgDate" value={manualForm.mfgDate} onChange={handleManualChange} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                      <input required type="date" name="expiryDate" value={manualForm.expiryDate} onChange={handleManualChange} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all text-slate-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Purchase Price (₹)</label>
                    <input required type="number" name="price" value={manualForm.price} onChange={handleManualChange} placeholder="0.00" min="0" step="0.01" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                  </div>

                  <button type="submit" className="w-full mt-2 bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-[0.98]">
                    Continue to Pickup
                  </button>
              </form>
            </div>
          )}

          {/* Scan Options (Default) */}
          {!image && !isManualEntry && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={startCamera}
                  className="bg-teal-600 text-white p-8 rounded-2xl shadow-lg hover:bg-teal-700 transition-all flex flex-col items-center gap-3 group"
                >
                  <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-bold">Open Camera</span>
                </button>

                <div 
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all text-slate-500 hover:text-teal-600"
                >
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="font-medium">Upload from Gallery</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setIsManualEntry(true)}
                  className="text-teal-600 font-medium text-sm hover:text-teal-700 hover:underline flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Know your medicine? Enter details manually
                </button>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {image && !analysis && !isAnalyzing && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] md:aspect-video bg-black">
                <img src={image} alt="Captured medicine" className="w-full h-full object-contain" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleRetake}
                  className="py-3 px-4 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake
                </button>
                <button 
                  onClick={handleAnalyze}
                  className="py-3 px-4 rounded-xl font-semibold bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Analyze with AI
                </button>
              </div>
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center animate-pulse">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-bold text-slate-900">Analyzing...</h3>
              <p className="text-slate-500 mt-2">Identifying active ingredients & risks</p>
            </div>
          )}

          {/* Error State */}
          {error && !isAnalyzing && (
            <div className="bg-red-50 p-4 rounded-xl flex items-start gap-3 text-red-700 border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Analysis Failed</p>
                <p className="text-sm opacity-90 mt-1">{error}</p>
                <button onClick={handleRetake} className="mt-3 text-sm font-semibold underline hover:text-red-800">Try Again</button>
              </div>
            </div>
          )}

          {/* Result State (Identify Step) */}
          {analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <AnalysisCard 
                data={analysis} 
                onSchedule={() => setStep('pickup')} 
              />
              <div className="mt-6 text-center">
                <button onClick={handleReset} className="py-2 px-6 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 hover:text-slate-800 transition-colors">
                  Scan Another Item
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* 
        STEP 2: PICKUP DETAILS 
      */}
      {step === 'pickup' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-right-8 duration-300">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => setStep('identify')}
              className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <h2 className="text-xl font-bold text-slate-900">Schedule Pickup</h2>
          </div>

          <form onSubmit={handlePickupSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" /> 
                Address Line
              </label>
              <textarea 
                required 
                name="address" 
                value={pickupForm.address} 
                onChange={handlePickupChange} 
                rows={3} 
                placeholder="Flat No, Building, Street Name..." 
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-teal-600" />
                Landmark
              </label>
              <input 
                type="text" 
                name="landmark" 
                value={pickupForm.landmark} 
                onChange={handlePickupChange} 
                placeholder="Near City Mall" 
                className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  Date
                </label>
                <input 
                  required 
                  type="date" 
                  name="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={pickupForm.date} 
                  onChange={handlePickupChange} 
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all text-slate-600" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  Time Slot
                </label>
                <select 
                  name="timeSlot" 
                  value={pickupForm.timeSlot} 
                  onChange={handlePickupChange} 
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all text-slate-600"
                >
                  <option value="Morning 9-12">Morning 9-12</option>
                  <option value="Afternoon 12-4">Afternoon 12-4</option>
                  <option value="Evening 4-8">Evening 4-8</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Confirm Pickup
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 
        STEP 3: SUCCESS 
      */}
      {step === 'success' && (
        <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner animate-in bounce-in duration-700">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-green-900 mb-2">Pickup Scheduled!</h3>
          <p className="text-green-800 font-medium mb-8 max-w-xs mx-auto">
            Your Agent will arrive on <span className="font-bold">{pickupForm.date}</span> during the <span className="font-bold">{pickupForm.timeSlot}</span> slot.
          </p>
          
          <button 
            onClick={handleReset}
            className="w-full max-w-xs py-3 bg-white border border-green-200 text-green-700 font-bold rounded-xl shadow-sm hover:bg-green-100 transition-colors"
          >
            Scan Another Item
          </button>
        </div>
      )}

    </div>
  );
};