
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reporting = () => {
  // Placeholder data
  const inStorageCount = 15;
  const borrowedCount = 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reporting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">In Storage:</p>
            <p className="text-2xl font-bold">{inStorageCount}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Borrowed:</p>
            <p className="text-2xl font-bold">{borrowedCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reporting;
