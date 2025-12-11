import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Khan",
    role: "Student",
    feedback:
      "BookCourier made borrowing textbooks so easy! No more library queues.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Rahim Uddin",
    role: "Researcher",
    feedback:
      "A lifesaver for accessing rare research books from multiple libraries.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Nadia Akter",
    role: "Reader",
    feedback:
      "I can request novels from nearby libraries and get them delivered quickly!",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Imran Hossain",
    role: "Student",
    feedback: "I love how easy it is to borrow books without leaving my home.",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const Testimonials = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 px-6 bg-indigo-50">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-secondary mb-12">
        What Our Users Say
      </h2>
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-8  mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <div className="flex justify-center mb-4">
              <img
                src={t.img}
                alt={t.name}
                className="w-16 h-16 rounded-full border-2 border-accent"
              />
            </div>
            <FaQuoteLeft className="text-accent w-8 h-8 mx-auto mb-4" />
            <p className="text-gray-700 mb-4">"{t.feedback}"</p>
            <h3 className="font-semibold text-lg text-gray-900">{t.name}</h3>
            <p className="text-gray-500">{t.role}</p>
            <div className="flex justify-center mt-2 space-x-1 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
