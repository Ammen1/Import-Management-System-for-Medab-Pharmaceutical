export default function Component() {
    return (
      <div className="relative bg-blue-700 py-12 -translate-x-20  border flex items-center justify-center" style={{ backgroundImage: 'url("/public/assets/banner/photo.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', width:1360}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center text-white">Our Numbers</h2>
          <div className="grid grid-cols-4 gap-8 mt-8 text-center">
            <div>
              <ShoppingCartIcon className="mx-auto text-white w-44" />
              <p className="mt-2 text-2xl font-bold text-white">800+</p>
              <p className="text-white ">Products</p>
            </div>
            <div>
              <TicketIcon className="mx-auto text-white" />
              <p className="mt-2 text-2xl font-bold text-white">497+</p>
              <p className="text-white">Tenders</p>
            </div>
            <div>
              <CalendarIcon className="mx-auto text-white" />
              <p className="mt-2 text-2xl font-bold text-white">250+</p>
              <p className="text-white ">Daily visitors</p>
            </div>
            <div>
              <UsersIcon className="mx-auto text-white" />
              <p className="mt-2 text-2xl font-bold text-white">10K+</p>
              <p className="text-white ">Monthly visitors</p>
            </div>
          </div>
        </div>
      </div>
    );
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
   
   
  function ShoppingCartIcon(props) { 
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
        <circle cx="8" cy="21" r="1" /> 
        <circle cx="19" cy="21" r="1" /> 
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /> 
      </svg> 
    ) ;
  } 
   
   
  function TicketIcon(props) { 
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
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /> 
        <path d="M13 5v2" /> 
        <path d="M13 17v2" /> 
        <path d="M13 11v2" /> 
      </svg> 
    ) ;
  } 
   
  function CalendarIcon(props) { 
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
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /> 
          <path d="M13 5v2" /> 
          <path d="M13 17v2" /> 
          <path d="M13 11v2" /> 
        </svg> 
      ) ;
    }  
  function UsersIcon(props) { 
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> 
        <circle cx="9" cy="7" r="4" /> 
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /> 
        <path d="M16 3.13a4 4 0 0 1 0 7.75" /> 
      </svg> 
    ) ;
  }