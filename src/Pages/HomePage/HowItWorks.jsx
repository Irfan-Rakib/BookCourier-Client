import { FaSearch, FaBook, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      title: "Search Books",
      desc: "Find books from nearby libraries using our simple search feature.",
      icon: <FaSearch className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Request Pickup",
      desc: "Request book delivery or schedule a pickup from your library.",
      icon: <FaBook className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Get Delivered",
      desc: "Receive your books safely at your doorstep and return when done.",
      icon: <FaTruck className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Track Your Orders",
      desc: "Easily track your book delivery in real-time until it reaches your door.",
      icon: <FaMapMarkerAlt className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16  ">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-secondary mb-12">
        How It Works
      </h2>
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-8  mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-800  rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            {step.icon}
            <h3 className="font-semibold text-xl mb-3 text-gray-900 dark:text-secondary">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
