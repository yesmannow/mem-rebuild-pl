import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const jobs = [
	{
		role: "Marketing Director",
		company: "Graston Technique®",
		dates: "2023–Present",
		highlight: "Scaled platform to 30K+ users with GPT-powered support assistant"
	},
	{
		role: "Marketing Manager",
		company: "Riley Bennett Egloff LLP",
		dates: "2021–2023",
		highlight: "Improved engagement with analytics-driven campaigns"
	},
	{
		role: "Technical Architect",
		company: "Bear Cave Marketing",
		dates: "2018–2021",
		highlight: "Built reproducible, assistant-ready workflows for branding and automation"
	}
];

export default function CareerTimelineProgress() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.8", "end 0.2"]
	});
	const scaleY = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	});

	return (
		<section className="py-16 bg-white">
			<div className="max-w-4xl mx-auto px-6" ref={ref}>
				<h2 className="text-3xl font-bold mb-8">Career Highlights</h2>
				<div className="relative">
					{/* Progress line */}
					<motion.div
						style={{ scaleY }}
						className="absolute left-3 top-0 w-1 h-full origin-top bg-blue-600"
					/>
					<ol className="relative border-l border-slate-300 ml-6">
						{jobs.map((job, index) => (
							<motion.li
								key={`${job.role}-${job.company}`}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="mb-10 ml-6"
							>
								<span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full"></span>
								<h3 className="text-xl font-semibold">
									{job.role} · {job.company}
								</h3>
								<time className="block text-sm text-slate-500">{job.dates}</time>
								<p className="mt-2 text-slate-700">{job.highlight}</p>
							</motion.li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}