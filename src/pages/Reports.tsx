import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Users,
  BarChart3
} from "lucide-react";

const mockReportsData = [
  {
    title: "Daily Sales Report",
    description: "Revenue breakdown by date and services",
    icon: DollarSign,
    value: "₱45,000",
    change: "+12%",
    type: "daily"
  },
  {
    title: "Monthly Occupancy",
    description: "Room occupancy rates and trends",
    icon: Calendar,
    value: "78%",
    change: "+5%",
    type: "monthly"
  },
  {
    title: "Revenue by Room Type",
    description: "Performance analysis by room categories",
    icon: BarChart3,
    value: "₱320,000",
    change: "+8%",
    type: "revenue"
  },
  {
    title: "Receptionist Performance",
    description: "Sales and booking performance per staff",
    icon: Users,
    value: "15 bookings",
    change: "+3%",
    type: "staff"
  }
];

const reportTypes = [
  { value: "sales", label: "Sales Reports" },
  { value: "occupancy", label: "Occupancy Reports" },
  { value: "revenue", label: "Revenue Analysis" },
  { value: "staff", label: "Staff Performance" },
  { value: "guest", label: "Guest Analytics" },
];

export default function Reports() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">
              Generate and analyze hotel performance reports.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockReportsData.map((report, index) => (
            <Card key={index} className="bg-gradient-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <report.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`text-sm font-medium ${report.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {report.change}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                <p className="text-2xl font-bold text-foreground">{report.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Generation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Generate Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Report Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    defaultValue="2024-01-01"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    defaultValue="2024-01-31"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Format
                </label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Quick Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div>
                    <p className="font-medium text-success">Best Performance</p>
                    <p className="text-sm text-muted-foreground">Room 205 - Suite</p>
                  </div>
                  <p className="font-bold text-success">₱28,000</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div>
                    <p className="font-medium text-primary">Avg. Daily Revenue</p>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </div>
                  <p className="font-bold text-primary">₱15,400</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                  <div>
                    <p className="font-medium text-accent-foreground">Peak Season</p>
                    <p className="text-sm text-muted-foreground">December - February</p>
                  </div>
                  <p className="font-bold text-accent-foreground">92% Occupancy</p>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div>
                    <p className="font-medium text-warning">Revenue Growth</p>
                    <p className="text-sm text-muted-foreground">Month over month</p>
                  </div>
                  <p className="font-bold text-warning">+18.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Recent Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Report Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date Range</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Generated</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-4 px-4 font-medium">Monthly Sales Report</td>
                    <td className="py-4 px-4 text-muted-foreground">Sales</td>
                    <td className="py-4 px-4 text-muted-foreground">Jan 1 - Jan 31, 2024</td>
                    <td className="py-4 px-4 text-muted-foreground">2 hours ago</td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-4 px-4 font-medium">Occupancy Analysis</td>
                    <td className="py-4 px-4 text-muted-foreground">Occupancy</td>
                    <td className="py-4 px-4 text-muted-foreground">Dec 1 - Dec 31, 2023</td>
                    <td className="py-4 px-4 text-muted-foreground">1 day ago</td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}