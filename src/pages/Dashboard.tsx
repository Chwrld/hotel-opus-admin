import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { KPICard } from "@/components/admin/KPICard";
import { SalesChart } from "@/components/admin/SalesChart";
import { RecentReservations } from "@/components/admin/RecentReservations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Calendar, 
  Percent, 
  Users, 
  RefreshCw 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual API calls
const mockKPIData = {
  totalRevenue: 125000,
  todaysReservations: 12,
  occupancyRate: 78,
  activeUsers: 45,
};

const mockChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Room Revenue",
      data: [65000, 72000, 68000, 82000, 95000, 88000, 102000],
      borderColor: "hsl(214, 84%, 25%)",
      backgroundColor: "hsla(214, 84%, 25%, 0.1)",
    },
    {
      label: "Additional Services",
      data: [12000, 15000, 14000, 18000, 22000, 19000, 25000],
      borderColor: "hsl(45, 93%, 47%)",
      backgroundColor: "hsla(45, 93%, 47%, 0.1)",
    },
  ],
};

const mockReservations = [
  {
    id: 1,
    guest_name: "Jane Doe",
    room_number: "101",
    status: "checked_in" as const,
    check_in: "2024-01-15",
    check_out: "2024-01-18",
    created_at: "2024-01-14",
    total_price: 15000,
  },
  {
    id: 2,
    guest_name: "John Smith",
    room_number: "205",
    status: "confirmed" as const,
    check_in: "2024-01-16",
    check_out: "2024-01-20",
    created_at: "2024-01-13",
    total_price: 28000,
  },
  {
    id: 3,
    guest_name: "Maria Garcia",
    room_number: "312",
    status: "pending" as const,
    check_in: "2024-01-17",
    check_out: "2024-01-19",
    created_at: "2024-01-15",
    total_price: 18500,
  },
  {
    id: 4,
    guest_name: "Robert Johnson",
    room_number: "408",
    status: "checked_out" as const,
    check_in: "2024-01-10",
    check_out: "2024-01-14",
    created_at: "2024-01-08",
    total_price: 32000,
  },
  {
    id: 5,
    guest_name: "Lisa Chen",
    room_number: "156",
    status: "confirmed" as const,
    check_in: "2024-01-18",
    check_out: "2024-01-22",
    created_at: "2024-01-15",
    total_price: 22500,
  },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("30");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(mockChartData);
  const { toast } = useToast();

  const handleRefreshData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock updated data
      const updatedData = {
        ...mockChartData,
        datasets: mockChartData.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map(value => value + Math.random() * 10000 - 5000),
        })),
      };
      
      setChartData(updatedData);
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated with the latest information.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // Here you would typically fetch new data based on the time range
    toast({
      title: "Time Range Updated",
      description: `Showing data for the last ${value} days.`,
    });
  };

  const handleViewReservationDetails = (id: number) => {
    toast({
      title: "View Reservation",
      description: `Opening details for reservation #${id}`,
    });
    // Navigate to reservation details
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening at your hotel.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleRefreshData}
              disabled={isLoading}
              className="bg-gradient-primary hover:opacity-90"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Revenue"
            value={`₱${mockKPIData.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <KPICard
            title="Today's Reservations"
            value={mockKPIData.todaysReservations}
            icon={Calendar}
            trend={{ value: 8.2, isPositive: true }}
          />
          <KPICard
            title="Occupancy Rate"
            value={`${mockKPIData.occupancyRate}%`}
            icon={Percent}
            trend={{ value: 3.1, isPositive: false }}
          />
          <KPICard
            title="Active Users"
            value={mockKPIData.activeUsers}
            icon={Users}
            trend={{ value: 15.7, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <SalesChart
              data={chartData}
              onRefresh={handleRefreshData}
              isLoading={isLoading}
            />
          </div>
          <div>
            <RecentReservations
              reservations={mockReservations}
              onViewDetails={handleViewReservationDetails}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}