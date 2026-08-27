import { useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import AppointmentModal from "@/hooks/AppointmentModal";

const actions = [
  {
    icon: MapPin,
    title: "Areas of Coverage",
    subtitle: "Where we are sanitizing",
    color: "sky",
    link: "service-area",
  },
  {
    icon: Calendar,
    title: "Appointment",
    subtitle: "Book online sanitizing service",
    color: "olive",
    modal: true,
  },
  {
    icon: Clock,
    title: "24/7 Emergency",
    subtitle: "Emergency sanitizing services",
    color: "sky",
    link: "contact",
  },
];

const QuickActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative -mt-16 z-10 ">
        <div className="container mx-auto space-y-8">
          <div className="bg-card border-r-2 border-l-2 border-primary border-t-2  rounded-t-2xl shadow-card grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {actions.map((action, index) => {
              const Icon = action.icon;

              return action.modal ? (
                <button
                  key={index}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-4 p-6 lg:p-8 hover:bg-muted/50 transition-colors w-full text-left first:rounded-t-2xl md:first:rounded-l-2xl md:first:rounded-tr-none last:rounded-b-2xl md:last:rounded-r-2xl md:last:rounded-bl-none"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      action.color === "sky"
                        ? "bg-sky-light text-sky"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{action.subtitle}</p>
                  </div>
                </button>
              ) : (
                <a
                  key={index}
                  href={action.link}
                  className="flex items-center gap-4 p-6 lg:p-8 hover:bg-muted/50 transition-colors first:rounded-t-2xl md:first:rounded-l-2xl md:first:rounded-tr-none last:rounded-b-2xl md:last:rounded-r-2xl md:last:rounded-bl-none"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      action.color === "sky"
                        ? "bg-sky-light text-sky"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{action.subtitle}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default QuickActions;
