import { motion } from "framer-motion";
import { CardHeader, CardContent } from "@/components/ui/card";
import { BarChart3, Database, Search, Settings } from "lucide-react";

export default function LandingPage() {
  const services = [
    {
      icon: BarChart3,
      color: "from-blue-400 via-indigo-500 to-purple-500",
      title: "Scoring",
      desc: "Analyze leads based on conversion potential with intelligent algorithms.",
    },
    {
      icon: Database,
      color: "from-green-400 via-emerald-500 to-teal-500",
      title: "Enrichment",
      desc: "Enhance your lead data with the latest insights for better decisions.",
    },
    {
      icon: Search,
      color: "from-purple-400 via-pink-500 to-red-500",
      title: "Scraping",
      desc: "Extract business data quickly and accurately from multiple sources.",
    },
    {
      icon: Settings,
      color: "from-orange-400 via-amber-500 to-yellow-500",
      title: "Automation",
      desc: "Automate data processes to save time and reduce costs.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
   
      <section id="service" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>

        <div className="relative max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Do We Offer?
          </h2>
          <p className="text-gray-600 text-lg">
            All the tools you need to manage data and maximize results.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 1,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className={`rounded-3xl p-8 bg-white/70 backdrop-blur-xl border border-gray-200 relative z-10 shadow-lg hover:shadow-2xl`}
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(245,245,245,0.4))",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 250 }}
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl`}
                  >
                    <Icon size={32} />
                  </motion.div>
                  <CardHeader className="text-center mb-3">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </CardHeader>
                  <CardContent className="text-center text-gray-600 text-sm">
                    {service.desc}
                  </CardContent>
                </motion.div>

                
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-30 blur-xl group-hover:opacity-60 transition`}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
