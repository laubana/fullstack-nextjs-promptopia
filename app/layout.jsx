import Navigation from "@components/Navigation";
import Provider from "@components/Provider";

import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const HomeLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navigation />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default HomeLayout;
