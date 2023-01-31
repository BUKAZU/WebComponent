import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function CostSection({ children }: Props): JSX.Element {
  return (
    <div className="costs-section">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
