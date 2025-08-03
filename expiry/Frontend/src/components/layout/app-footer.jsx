import React from "react";
import { cn } from "@/lib/utils";

const AppFooter = () => {
  return (
    <footer
      data-slot="app-footer"
      className={cn(
        "bg-background mt-6 border-t py-6 text-center",
        "data-[state=open]:animate-in data-[state=closed]:animate-out"
      )}
    >
      <div className="px-8">
        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
          {/* Left side (copyright) */}
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Digital Warranty Vault. All rights reserved.
          </div>

          {/* Right side (powered by / team link) */}
          <div className="text-muted-foreground text-sm">
            Built for Hackathons |{" "}
            <a
              href="https://github.com/your-project-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
