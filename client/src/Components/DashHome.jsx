import DashSidebar from './DashSidebar';
import Header from './Header';
import ThemeProvider from "../Components/ThemeProvider.jsx";

export default function DashHome() {
  return (
    <> 
    <ThemeProvider>
      <div className=' w-screen lg:-translate-x-4'><Header /></div>
      <div className='flex min-w-screen'>
      <DashSidebar />
      </div>
      
    </ThemeProvider>
    </>
  );
};





