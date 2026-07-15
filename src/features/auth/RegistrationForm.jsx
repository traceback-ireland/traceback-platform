import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  ShieldCheck,
  ArrowRight,
  Check,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  User,
  MapPin,
} from "lucide-react";
import WelcomeScreen from "./WelcomeScreen";

// Lista de Condados (Counties) da Irlanda para o Select
const IRISH_COUNTIES = [
  "Dublin",
  "Cork",
  "Galway",
  "Limerick",
  "Waterford",
  "Louth",
  "Kildare",
  "Meath",
  "Wicklow",
  "Wexford",
  "Kilkenny",
  "Carlow",
  "Laois",
  "Offaly",
  "Westmeath",
  "Longford",
  "Tipperary",
  "Clare",
  "Kerry",
  "Mayo",
  "Roscommon",
  "Sligo",
  "Leitrim",
  "Donegal",
  "Cavan",
  "Monaghan",
];

const DEMO_OTP = "123456";

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

const STEPS = ["Profile", "Email", "Verify"];

function ProgressStrip({ stepIndex }) {
  return (
    <div
      className="flex items-center gap-2 mb-8"
      aria-label={`Step ${stepIndex + 1} of ${STEPS.length}`}
    >
      {STEPS.map((label, i) => {
        const complete = i < stepIndex;
        const active = i === stepIndex;
        return (
          <div key={label} className="flex-1 flex flex-col gap-1.5">
            <div
              className={`h-1.5 rounded-full transition-colors duration-300 ${
                complete
                  ? "bg-emerald-500"
                  : active
                    ? "bg-slate-900"
                    : "bg-gray-200"
              }`}
            />
            <span
              className={`text-[10px] font-medium uppercase tracking-wider transition-colors duration-300 ${
                active ? "text-slate-800" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function RegistrationForm() {
  const [step, setStep] = useState("WELCOME"); // WELCOME -> Profile -> Email -> Verify -> DONE
  const [fullName, setFullName] = useState("");
  const [county, setCounty] = useState(""); // Reintroduzido o estado do County/City
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  useEffect(() => {
    setError("");
  }, [fullName, county, email, otp]);

  // Avança para o passo do E-mail após validar Nome e Cidade
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!county) {
      setError("Please select your city/county.");
      return;
    }
    setError("");
    setStep("Email"); // Garante que altera o estado interno para ir para o próximo passo
  };

  const handleSendEmailToken = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("Verify");
    } catch (err) {
      setError("Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulação de validação
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (fullOtp === DEMO_OTP) {
        setStep("DONE");
      } else {
        setError("Invalid verification code. Use '123456' for testing.");
      }
    } catch (err) {
      setError("Verification failed. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const val = value.replace(/\D/g, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    if (index < 5 && val) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  if (step === "WELCOME") {
    return <WelcomeScreen onContinue={() => setStep("Profile")} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <div className=" my-auto max-w-md w-full mx-auto flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center tb-brand-bg">
            <ShieldCheck size={24} color="var(--tb-accent)" strokeWidth={2.5} />
          </div>
          <div>
            <p className="tb-display text-xl font-semibold">
              TraceBack Ireland
            </p>
            <p className="text-sm tb-soft-text">
              Theft reporting & recovery network
            </p>
          </div>
        </div>
      </header>

      {/* Card Principal */}
      <main className="my-auto max-w-md w-full mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        {step !== "DONE" && <ProgressStrip stepIndex={STEPS.indexOf(step)} />}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* PASSO 1: PROFILE (NOME + CIDADE) */}
        {step === "Profile" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Tell us about yourself
            </h1>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Before reporting, we need your legal name and location to
              coordinate with An Garda Síochána[cite: 40, 84].
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Campo Nome */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Connor O'Neill"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Campo Cidade/Condado */}
              <div>
                <label
                  htmlFor="county"
                  className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
                >
                  City / County
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <select
                    id="county"
                    required
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select your city/county...</option>
                    {IRISH_COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* PASSO 2: EMAIL */}
        {step === "Email" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              What's your email?
            </h1>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              We'll send you a secure 6-digit verification code to confirm your
              account.
            </p>

            <form onSubmit={handleSendEmailToken} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    id="email"
                    type="email"
                    required
                    autoFocus
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending code...
                  </>
                ) : (
                  <>
                    Send verification code
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* PASSO 3: VERIFY TOKEN */}
        {step === "Verify" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Verify your email
            </h1>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              We sent a 6-digit code to{" "}
              <strong className="text-slate-700">{email}</strong>.
            </p>

            <form onSubmit={handleVerifyToken} className="space-y-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:border-slate-800 focus:ring-2 focus:ring-slate-800 outline-none transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Verify & Create Account
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSendEmailToken}
                  className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
                >
                  Didn't get a code? Resend
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PASSO FINAL: SUCESSO */}
        {step === "DONE" && (
          <div className="text-center py-2 animate-fade-in">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-emerald-100 text-emerald-600">
              <Check size={26} strokeWidth={3} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              You're verified!
            </h1>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-xs mx-auto">
              Welcome to TraceBack Ireland,{" "}
              <strong className="text-slate-700">{fullName}</strong>. Your
              account is ready to keep your items safe.
            </p>
            <div className="bg-red-50 rounded-xl p-4 text-left flex gap-3 border border-red-100">
              <AlertTriangle
                size={18}
                className="text-red-500 shrink-0 mt-0.5"
              />
              <p className="text-xs text-red-600 leading-relaxed">
                <strong>Important:</strong> If you ever see your item's live
                location on the map, do not attempt to retrieve it yourself.
                Report it immediately to An Garda Síochána[cite: 42, 234].
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 mt-6">
        Secure civic project under GDPR guidelines. TraceBack Ireland
      </footer>
    </div>
  );
}
