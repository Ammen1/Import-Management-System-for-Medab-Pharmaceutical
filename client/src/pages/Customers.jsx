import { motion } from "framer-motion";

export default function Customers() {
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-semibold text-center">Our Customers</h2>
      <p className="text-center mt-2 mb-12">
        With whom does medab pharmaceutical medical conduct business?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <AnimatedCard
          title="Global Manufacturers"
          description="Connecting manufacturers globally to local distributors, medab ET facilitates seamless distribution of medical equipment on a global scale. Our platform links manufacturers with local Ethiopian distributors, extending their reach for a comprehensive solution."
          icon={<GlobeIcon className="mx-auto text-blue-500 w-16 h-16" />}
        />
        <AnimatedCard
          title="Local Distributors"
          description="medab ET empowers Local Manufacturer, Importers and wholesalers of Medical Equipment in Ethiopia. Equipping with Digital tool for market access, Tender platform, giving access to easily connect with Global suppliers."
          icon={<LocateIcon className="mx-auto text-blue-500 w-16 h-16" />}
        />
        <AnimatedCard
          title="Hospital and Clinics"
          description="medab streamlines equipment procurement for hospitals and clinics—the primary end-users. With a user-friendly platform, they effortlessly browse and buy necessary equipment, enhancing operational efficiency and ultimately elevating patient care."
          icon={<HotelIcon className="mx-auto text-blue-500 w-16 h-16" />}
        />
      </div>
    </div>
  );
}

function AnimatedCard({ title, description, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center bg-white shadow-lg rounded-lg p-8"
    >
      {icon}
      <h3 className="mt-4 mb-2 font-semibold">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
} 
 
function FactoryIcon(props) { 
  return ( 
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    > 
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /> 
      <path d="M17 18h1" /> 
      <path d="M12 18h1" /> 
      <path d="M7 18h1" /> 
    </svg> 
  ) 
} 
 
 
 
function GlobeIcon(props) { 
  return ( 
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    > 
      <circle cx="12" cy="12" r="10" /> 
      <line x1="2" x2="22" y1="12" y2="12" /> 
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /> 
    </svg> 
  ) ;
} 
 
 
function HotelIcon(props) { 
  return ( 
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    > 
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" /> 
      <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" /> 
      <path d="M8 7h.01" /> 
      <path d="M16 7h.01" /> 
      <path d="M12 7h.01" /> 
      <path d="M12 11h.01" /> 
      <path d="M16 11h.01" /> 
      <path d="M8 11h.01" /> 
      <path d="M10 22v-6.5m4 0V22" /> 
    </svg> 
  ); 
} 
 
 
function LocateIcon(props) { 
  return ( 
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    > 
      <line x1="2" x2="5" y1="12" y2="12" /> 
      <line x1="19" x2="22" y1="12" y2="12" /> 
      <line x1="12" x2="12" y1="2" y2="5" /> 
      <line x1="12" x2="12" y1="19" y2="22" /> 
      <circle cx="12" cy="12" r="7" /> 
    </svg> 
  ) ;
} 
 
 