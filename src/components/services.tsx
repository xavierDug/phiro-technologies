import Image from "next/image";
import {
    Code,
    Brain,
    Paintbrush,
} from "lucide-react";

export default function Services() {
    return (
        <section className="bg-neutral-950 text-white py-20 px-2">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl max-w-4xl mx-auto">
                        Three Ingredients To Craft A Website That{" "}
                        <span className="underline decoration-[#f5c843] font-bold text-5xl">Stands Out</span>
                        <span className="text-[#f5c843] font-bold">.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* LEFT: DESIGN (Tall) */}
                    <div className="bg-neutral-900 rounded-3xl p-6 pb-0 shadow-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                                <Paintbrush className="w-6 h-6 text-[#f5c843]" /> Design
                            </h3>
                            <p className="text-neutral-400">
                                We create standout brand identities and UI systems that make your company recognizable and delightful.
                            </p>
                        </div>
                        <Image
                            src="/phoneMockup.png"
                            alt="iPhone mockup"
                            layout="responsive"
                            width={600}
                            height={400}
                            className="rounded-xl mt-auto"
                        />
                    </div>

                    {/* RIGHT: DEVELOPMENT & SEO (Stacked) */}
                    <div className="flex flex-col gap-8">
                        {/* DEVELOPMENT */}
                        <div className="bg-neutral-900 rounded-3xl p-6 pb-0 shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                                    <Code className="w-6 h-6 text-[#f5c843]" /> Development
                                </h3>
                                <p className="text-neutral-400">
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
                        </div>

                        {/* SEO */}
                        <div className="bg-neutral-900 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                                    <Brain className="w-6 h-6 text-[#f5c843]" /> SEO
                                </h3>
                                <p className="text-neutral-400 mb-6">
                                    Your site won’t just look good — it’ll perform. We optimize for visibility, rankings, and conversion.
                                </p>
                            </div>
                            <Image
                                src="/seo-icons.png"
                                alt="SEO icons"
                                width={600}
                                height={200}
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}