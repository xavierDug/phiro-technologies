import Image from "next/image";
import { Code, Brain, Paintbrush } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

export default function Services() {
    return (
        <section className="bg-neutral-950 text-white py-20 px-2">
            <div className="container mx-auto">
                {/* Heading */}
                <motion.div
                    className="max-w-6xl mx-auto text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl max-w-4xl mx-auto">
                        Three Ingredients To Craft A Website That{" "}
                        <span className="underline decoration-[#f5c843] font-bold text-5xl">
                            Stands Out
                        </span>
                        <span className="text-[#f5c843] font-bold">.</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* LEFT: DESIGN (Tall) */}
                    <motion.div
                        className="bg-neutral-900 rounded-3xl shadow-lg flex flex-col"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                    >
                        <div className="p-6 pb-0">
                            <h3 className="text-4xl font-bold mb-4 flex items-center gap-2">
                                <div className="backdrop-blur-md bg-[#f5c843]/5 border border-[#f5c843]/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] p-2 rounded-2xl">
                                    <Paintbrush className="w-10 h-10 text-[#f5c843]" />
                                </div>
                                Design
                            </h3>
                            <p className="text-neutral-400 text-xl">
                                We create standout brand identities and UI systems that make your company recognizable and delightful.
                            </p>
                        </div>
                        <div className="flex-grow flex items-end min-h-[250px] sm:min-h-0">
                            <Image
                                src="/phoneMockup.png"
                                alt="iPhone mockup"
                                width={1000}
                                height={400}
                                className="rounded-xl w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT: DEVELOPMENT & SEO */}
                    <div className="flex flex-col gap-8">
                        {/* DEVELOPMENT */}
                        <motion.div
                            className="bg-neutral-900 rounded-3xl p-6 pb-0 shadow-lg flex flex-col justify-between"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={1}
                        >
                            <div>
                                <h3 className="text-4xl font-bold mb-4 flex items-center gap-2">
                                    <div className="backdrop-blur-md bg-[#f5c843]/5 border border-[#f5c843]/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] p-2 rounded-2xl">
                                        <Code className="w-10 h-10 text-[#f5c843]" />
                                    </div>
                                    Development
                                </h3>
                                <p className="text-neutral-400 text-xl">
                                    From design to code — we build modern, scalable apps that tell your brand story in every interaction.
                                </p>
                            </div>
                            <Image
                                src="/macMockup.png"
                                alt="Macbook mockup"
                                layout="responsive"
                                width={500}
                                height={200}
                                className="rounded-xl mx-auto"
                            />
                        </motion.div>

                        {/* SEO */}
                        <motion.div
                            className="bg-neutral-900 rounded-3xl shadow-lg flex flex-col justify-between"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={2}
                        >
                            <div className="p-6 pb-0">
                                <h3 className="text-4xl font-bold mb-4 flex items-center gap-2">
                                    <div className="backdrop-blur-md bg-[#f5c843]/5 border border-[#f5c843]/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] p-2 rounded-2xl">
                                        <Brain className="w-10 h-10 text-[#f5c843]" />
                                    </div>
                                    SEO
                                </h3>
                                <p className="text-neutral-400 text-xl">
                                    Your site won’t just look good — it’ll perform. We optimize for visibility, rankings, and conversion.
                                </p>
                            </div>
                            <Image
                                src="/SeoThumbnail.png"
                                alt="SEO icons"
                                layout="responsive"
                                width={600}
                                height={200}
                                className="rounded-xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
