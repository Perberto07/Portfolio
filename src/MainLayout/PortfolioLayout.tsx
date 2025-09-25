import MainContent from './MainContent.tsx';
//import SideBar from './SideBar.tsx';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

function PortfolioLayout() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default PortfolioLayout;