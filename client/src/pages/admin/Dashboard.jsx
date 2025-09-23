import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Dashboard = () => {
  const totalSales = 1250;
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <p className="text-2xl font-bold">{totalSales}</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </CardContent> */}
      </Card>
    </div>
  );
};

export default Dashboard;
