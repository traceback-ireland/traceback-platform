import React from 'react'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export default function WelcomeScreen({ onContinue }) {
  return (
    <div className="tb-root min-h-screen w-full flex items-center justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-lg">
        <div className="tb-surface rounded-3xl border tb-line p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center tb-brand-bg">
              <ShieldCheck size={24} color="var(--tb-accent)" strokeWidth={2.5} />
            </div>
            <div>
              <p className="tb-display text-xl font-semibold">TraceBack Ireland</p>
              <p className="text-sm tb-soft-text">Theft reporting & recovery network</p>
            </div>
          </div>

          <h1 className="tb-display text-2xl sm:text-3xl font-semibold mb-4">Welcome!</h1>
          <p className="text-sm sm:text-base tb-soft-text leading-relaxed mb-6">
            Start with a quick introduction before you verify your phone. We help you report stolen items safely and keep your recovery process fast.
          </p>

          <div className="grid gap-4 mb-8">
            <div className="rounded-2xl border tb-line p-4 bg-white">
              <p className="text-sm font-semibold mb-1">Fast incident reporting</p>
              <p className="text-sm tb-soft-text">Create a report in a few easy steps and stay updated.</p>
            </div>
            <div className="rounded-2xl border tb-line p-4 bg-white">
              <p className="text-sm font-semibold mb-1">Privacy first</p>
              <p className="text-sm tb-soft-text">Your phone number is only used for verification, never shared publicly.</p>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="tb-brand-bg tb-focus w-full inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition-colors hover:opacity-95"
          >
            Get started <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
