import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Bot, Workflow, PlugZap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-white to-gray-900 bg-[length:400%_400%] animate-gradient-shift"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at bottom left, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(0,0,0,0.4) 0%, transparent 50%),
            linear-gradient(135deg, #1f1f1f 0%, #f5f5f5 25%, #000000 50%, #e5e5e5 75%, #111111 100%)
          `,
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/40 rounded-2xl blur-xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-2xl blur-xl animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <header className="relative flex items-center justify-between px-12 py-6 border border-white/20 bg-white/10 backdrop-blur-3xl sticky top-0 z-50 shadow-2xl rounded-3xl mx-8 mt-8">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="AgentMaker Logo"
            width={36}
            height={36}
            className="drop-shadow-lg"
          />

          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            AgentMaker
          </h1>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">

          {/* Not Logged In */}
          <SignedOut>
            <SignInButton mode="modal">
  <Button
    variant="outline"
    className="text-black border-white/30 bg-white/70 hover:bg-white rounded-full"
  >
    Sign In
  </Button>
</SignInButton>

            <SignUpButton mode="modal">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* Logged In */}
          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full">
                Go to Dashboard
              </Button>
            </Link>

            <UserButton afterSignOutUrl="/" />
          </SignedIn>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-32 text-center z-10">

        <h1 className="text-6xl font-extrabold mb-6 leading-tight text-white">
          Build <span className="text-gray-200">AI Agents</span>
          <br />
          with Visual Workflows
        </h1>

        <p className="text-white/80 max-w-2xl mx-auto text-lg mb-12">
          Design, visualize, and deploy intelligent AI agents using our
          seamless workflow builder and integrations.
        </p>

        <Link href="/agent-builder">
          <Button
            size="lg"
            className="px-10 py-6 text-lg bg-white/20 text-white hover:bg-white/30 border border-white/30 rounded-3xl"
          >
            Start Building →
          </Button>
        </Link>

      </section>

      {/* Features */}
      <section className="relative px-10 md:px-24 py-24 z-10">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-white">
            Platform Features
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="text-center p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl hover:scale-105 transition">
            <Bot className="mx-auto mb-6 text-white w-10 h-10" />
            <h3 className="font-semibold text-xl mb-4 text-white">
              AI Agent Creation
            </h3>
            <p className="text-white/80">
              Create intelligent agents that understand and respond to users.
            </p>
          </div>

          <div className="text-center p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl hover:scale-105 transition">
            <Workflow className="mx-auto mb-6 text-white w-10 h-10" />
            <h3 className="font-semibold text-xl mb-4 text-white">
              Visual Workflow Builder
            </h3>
            <p className="text-white/80">
              Design workflows visually using drag-and-drop nodes.
            </p>
          </div>

          <div className="text-center p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl hover:scale-105 transition">
            <PlugZap className="mx-auto mb-6 text-white w-10 h-10" />
            <h3 className="font-semibold text-xl mb-4 text-white">
              API Integrations
            </h3>
            <p className="text-white/80">
              Connect agents with external APIs and services easily.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="relative py-10 text-center text-white/70 border-t border-white/20 z-10">
        © {new Date().getFullYear()} AgentMaker · All Rights Reserved
      </footer>

    </div>
  );
}