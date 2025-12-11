import {
  FaBookOpen,
  FaClock,
  FaLayerGroup,
  FaLeaf,
  FaThumbsUp,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChoose = () => {
  const features = [
    {
      title: "Seamless Library Access",
      desc: "Borrow and return books effortlessly from the comfort of your home.",
      icon: <FaBookOpen className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Save Time & Effort",
      desc: "Focus on reading and research while we handle pickups and deliveries.",
      icon: <FaClock className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Wide Range of Books",
      desc: "Access books from multiple nearby libraries anytime.",
      icon: <FaLayerGroup className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Eco-Friendly & Safe",
      desc: "Reduce travel, stay safe, and help the environment.",
      icon: <FaLeaf className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "User-Friendly & Reliable",
      desc: "Track and manage deliveries easily on our platform.",
      icon: <FaThumbsUp className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
    {
      title: "Fast & Reliable Support",
      desc: "Our team is always ready to help you with any queries or issues.",
      icon: <FaHeadset className="text-accent w-12 h-12 mx-auto mb-4" />,
    },
  ];

  // Parent container variant for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // delay between each card
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-secondary mb-12">
        Why Choose BookCourier
      </h2>
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-4  gap-8  mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-black dark:border rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            {feature.icon}
            <h3 className="font-semibold text-xl mb-3 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChoose;
