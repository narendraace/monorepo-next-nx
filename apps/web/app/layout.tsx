import "@styles/globals.css";
import React from "react";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Session } from "next-auth";

const metadata = {
  title: "Promtopia",
  description: "Discover & Share AI Prompts",
};
type layoutProps = { children: React.ReactNode; session: Session };

const layout: React.FC<layoutProps> = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};
export default layout;
