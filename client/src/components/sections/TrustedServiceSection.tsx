import {
  Home,
  Building2,
  Briefcase,
  Utensils,
  Hotel,
  Hospital,
  GraduationCap,
  Warehouse,
  Factory,
  Building,
  ShieldCheck,
} from "lucide-react";
import bg from "@/assets/bg_trust.png"

const serviceAreas = [
  { icon: Home, label: "Homes" },
  { icon: Building2, label: "Apartments" },
  { icon: Briefcase, label: "Offices" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Hotel, label: "Hotels" },
  { icon: Hospital, label: "Hospitals" },
  { icon: GraduationCap, label: "Educational Institutions" },
  { icon: Warehouse, label: "Warehouses" },
  { icon: Factory, label: "Factories" },
  { icon: Building, label: "Commercial Buildings" },
];

export default function TrustedServiceSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={bg}
              alt="EcoShield Pest Control Team"
              className="w-full h-[550px] object-cover rounded-3xl shadow-xl"
            />

            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg p-5 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="text-green-600" size={26} />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Safe & Certified
                  </h4>
                  <p className="text-sm text-gray-500">
                    Professional Pest Management
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
          

            <h2 className="text-4xl lg:text-5xl font-bold mt-5 leading-tight text-gray-900">
Trusted Pest Control Service Across Bangladesh
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
             EcoShield Pest BD proudly  serves clients throughout Bangladesh. Our pest management professionals provide solutions for:
            </p>

            {/* Services */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {serviceAreas.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-white border rounded-xl p-4 hover:border-green-500 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                    <item.icon
                      size={20}
                      className="text-green-600"
                    />
                  </div>

                  <span className="font-medium text-gray-700">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="mt-8 border-l-4 border-green-600 pl-5">
              <p className="text-gray-600 leading-7">
                We continuously invest in advanced pest control technologies,
                expert staff training, and responsive customer support to
                maintain the highest service standards. Choosing
                <span className="font-semibold text-green-700">
                  {" "}
                  EcoShield Pest BD{" "}
                </span>
                means partnering with professionals dedicated to protecting
                your health, property, and peace of mind through safe,
                effective, and long-lasting pest management solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}