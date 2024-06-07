import "@styles/globals.css";
import Navigation from "@components/Navigation";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const HomeLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
};

export default HomeLayout;
