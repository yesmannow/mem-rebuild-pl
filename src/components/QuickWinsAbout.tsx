import CountUp from "react-countup";

const wins = [
  { id: "win1", label: "Clinicians Served", value: 30000 },
  { id: "win2", label: "Automations Built", value: 400 },
  { id: "win3", label: "Ticket Reduction", value: 70, suffix: "%" },
  { id: "win4", label: "Years Experience", value: 15 }
];

export default function QuickWinsAbout() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {wins.map((w) => (
          <div key={w.id} className="p-6 bg-slate-50 rounded-lg shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600">
              <CountUp end={w.value} duration={1.5} suffix={w.suffix || ""} />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-600">{w.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}