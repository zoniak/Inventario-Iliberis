"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportingProps {
  inventory: { status: string }[];
}

const Reporting: React.FC<ReportingProps> = ({ inventory }) => {
  // Calculate counts based on the inventory prop
  const inStorageCount = inventory.filter(item => item.status === 'En Almacén').length;
  const borrowedCount = inventory.filter(item => item.status === 'Prestado').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">En Almacén:</p>
            <p className="text-2xl font-bold">{inStorageCount}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Prestados:</p>
            <p className="text-2xl font-bold">{borrowedCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reporting;
