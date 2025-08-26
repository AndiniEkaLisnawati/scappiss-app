import { DownloadCloud, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import illustration from "../assets/illustration.png";

const Hero = () => {
  return (
    <section className="relative py-24 px-6 lg:px-8 bg-gray-50 overflow-hidden">

      <img 
        src={illustration} 
        alt="Unique abstract illustration" 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[120%] max-w-none opacity-20 pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
    
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          className="inline-flex items-center space-x-3 mb-6 justify-center"
        >
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
            <DownloadCloud className="w-8 h-8 text-white" />
          </div>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Internal Platform
          </span>
        </motion.div>

 
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Scraping Data & Automatic Scoring
          </span>
        </motion.h1>


        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
        >
          Efficiently gather data from multiple sources and automatically score it. Empower your business team to filter and prioritize prospects faster and make informed decisions effortlessly.
        </motion.p>

      
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 flex items-center">
            <BarChart className="w-5 h-5 mr-2" />
            Start Scraping
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
