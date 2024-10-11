import React, { ReactNode } from "react";

interface ChildrenProps {
  children: ReactNode;
}

function ReactMarkdownMock({ children }: ChildrenProps) {
  return <>{children}</>;
}

export default ReactMarkdownMock;
