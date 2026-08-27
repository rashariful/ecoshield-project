import { 
  Bug, 
  Users, 
  TrendingUp, 
  Calendar, 
  ShieldCheck,
  SprayCan,
  Home,
  Building
} from "lucide-react";
import { StatsCard } from "@/components/dashboardComponent/StatsCard";
import { ProjectCard } from "@/components/dashboardComponent/ProjectCard";
import { RevenueChart } from "@/components/dashboardComponent/RevenueChart";
import { ActivityFeed } from "@/components/dashboardComponent/ActivityFeed";
import residentialService from "@/assets/project1.jpg";
import commercialService from "@/assets/project2.jpg";
import termiteControl from "@/assets/project3.jpg";
import rodentControl from "@/assets/project4.jpg";

const Dashboard = () => {
  const stats = [
    { 
      title: "Active Services", 
      value: "48", 
      icon: SprayCan, 
      trend: "+8 this month",
      description: "Ongoing pest control treatments"
    },
    { 
      title: "Total Clients", 
      value: "156", 
      icon: Users, 
      trend: "+12 this month",
      description: "Satisfied customers"
    },
    { 
      title: "Monthly Revenue", 
      value: "৳3.24L", 
      icon: TrendingUp, 
      trend: "+22% from last month",
      description: "Current month earnings"
    },
    { 
      title: "Scheduled Visits", 
      value: "23", 
      icon: Calendar, 
      trend: "This week",
      description: "Upcoming service appointments"
    },
  ];

  const recentServices = [
    {
      image: residentialService,
      title: "Full Home Protection",
      client: "Ahmed Family, Gulshan",
      status: "Ongoing" as const,
      category: "Residential",
      nextVisit: "15 Dec 2024",
      serviceType: "Monthly Maintenance"
    },
    {
      image: commercialService,
      title: "Restaurant Pest Control",
      client: "Spice & Rice Restaurant",
      status: "Completed" as const,
      category: "Commercial",
      nextVisit: "20 Jan 2025",
      serviceType: "Quarterly Contract"
    },
    {
      image: termiteControl,
      title: "Termite Treatment",
      client: "Mr. Rahman, Banani",
      status: "Ongoing" as const,
      category: "Residential",
      nextVisit: "10 Dec 2024",
      serviceType: "Special Treatment"
    },
    {
      image: rodentControl,
      title: "Rodent Control System",
      client: "City Hospital Ltd",
      status: "Planning" as const,
      category: "Commercial",
      nextVisit: "05 Jan 2025",
      serviceType: "Installation"
    },
  ];

  const pestTypes = [
    { name: "Cockroaches", value: 35, color: "bg-amber-500" },
    { name: "Termites", value: 25, color: "bg-red-500" },
    { name: "Rodents", value: 20, color: "bg-gray-700" },
    { name: "Mosquitoes", value: 15, color: "bg-green-500" },
    { name: "Bed Bugs", value: 5, color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, Eco Shield Pest Control BD
              </h1>
              <p className="text-gray-600">
                Protecting homes and businesses across Bangladesh since 2010
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              🏆 Certified Pest Management
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              🌿 Eco-Friendly Solutions
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              24/7 Emergency Service
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={stat.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <RevenueChart 
            title="Monthly Revenue Trend"
            description="Pest control service revenue analysis"
            data={[
              { month: 'Jul', revenue: 2.8 },
              { month: 'Aug', revenue: 3.1 },
              { month: 'Sep', revenue: 2.9 },
              { month: 'Oct', revenue: 3.5 },
              { month: 'Nov', revenue: 3.24 },
            ]}
          />
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Pest Distribution</h3>
                <p className="text-gray-600">Common pest types reported</p>
              </div>
              <Bug className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-4">
              {pestTypes.map((pest) => (
                <div key={pest.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{pest.name}</span>
                    <span className="text-gray-600">{pest.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pest.color} rounded-full`}
                      style={{ width: `${pest.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <ActivityFeed 
            title="Recent Service Activities"
            activities={[
              { type: 'service', description: 'Quarterly maintenance completed at Dhanmondi Residence', time: '2 hours ago' },
              { type: 'inspection', description: 'Free inspection scheduled for new client', time: '4 hours ago' },
              { type: 'payment', description: 'Annual contract payment received from corporate client', time: '1 day ago' },
              { type: 'emergency', description: 'Emergency rodent control service in Mirpur', time: '2 days ago' },
            ]}
          />
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Service Coverage</h3>
                <p className="text-gray-600">By area type</p>
              </div>
              <div className="flex gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                <Building className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-700 mb-2">68%</div>
                <div className="text-blue-600 font-medium">Residential</div>
                <div className="text-blue-500 text-sm">Homes & Apartments</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-700 mb-2">32%</div>
                <div className="text-green-600 font-medium">Commercial</div>
                <div className="text-green-500 text-sm">Offices & Factories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Services */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Services</h2>
              <p className="text-gray-600">Latest pest control operations</p>
            </div>
            <button className="text-green-600 hover:text-green-800 transition-colors font-medium flex items-center gap-2">
              View all services
              <span>→</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentServices.map((service, index) => (
              <div key={service.title} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProjectCard {...service} />
              </div>
            ))}
          </div>
          
          {/* Service Quick Stats */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">98%</div>
                <div className="text-gray-600 text-sm">Success Rate</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">24h</div>
                <div className="text-gray-600 text-sm">Response Time</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">500+</div>
                <div className="text-gray-600 text-sm">Properties Protected</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">12</div>
                <div className="text-gray-600 text-sm">Expert Technicians</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;