import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Music, Users, Zap } from "lucide-react";
import { Appbar } from "./components/Appbar";

export default function LandingPage() {
  return (
    <div className="overflow-hidden flex items-center flex-col min-h-screen bg-gradient-to-b from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <header className="w-full   px-4 lg:px-6 h-16 flex items-center py-10 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <Appbar />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                  Let Your Fans Choose the Music
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                  StreamTunes connects streamers with their audience through the
                  power of music. Engage your fans and create unforgettable
                  streams.
                </p>
              </div>
              <Button className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 py-8 px-10 text-2xl">
                Get Started
              </Button>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="min-w-full py-12 md:py-24 lg:py-32 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50"
        >
          <div className=" px-4  md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-purple-600 dark:text-purple-400">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <Users className="h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  Fan Engagement
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Boost interaction by letting your audience choose the
                  soundtrack.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <Music className="h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  Vast Music Library
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access millions of tracks from various genres.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <Zap className="h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  Real-time Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Seamlessly integrate fan-chosen music into your stream.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-purple-600 dark:text-purple-400">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  Connect Your Stream
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Link StreamTunes to your streaming platform.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  Fans Request Songs
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your audience uses chat commands to request songs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  Music Plays Automatically
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Approved songs are added to the queue and play during your
                  stream.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-700 dark:to-indigo-700">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Elevate Your Streams?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-100 md:text-xl">
                  Join StreamTunes today and give your audience the power to
                  create the perfect soundtrack.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white/90 dark:bg-gray-800/90"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <p className="text-xs text-gray-700 dark:text-gray-300">
          © 2024 StreamTunes. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
