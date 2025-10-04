import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2 
} from "lucide-react";

const mockReservations = [
  {
    id: 1,
    guest_name: "Jane Doe",
    room_number: "101",
    room_type: "Deluxe",
    status: "checked_in",
    check_in: "2024-01-15",
    check_out: "2024-01-18",
    total_price: 15000,
    payment_status: "paid",
  },
  {
    id: 2,
    guest_name: "John Smith",
    room_number: "205",
    room_type: "Suite",
    status: "confirmed",
    check_in: "2024-01-16",
    check_out: "2024-01-20",
    total_price: 28000,
    payment_status: "partial",
  },
];

const statusColors = {
  pending: "bg-warning/10 text-warning",
  confirmed: "bg-success/10 text-success",
  checked_in: "bg-primary/10 text-primary",
  checked_out: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function Reservations() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reservations</h1>
            <p className="text-muted-foreground">
              Manage all hotel reservations and bookings.
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            New Reservation
          </Button>
        </div>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by guest name..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="checked_in">Checked In</SelectItem>
                  <SelectItem value="checked_out">Checked Out</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>All Reservations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Guest</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Room</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Dates</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-foreground">{reservation.guest_name}</div>
                          <div className="text-sm text-muted-foreground">ID: #{reservation.id}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-foreground">Room {reservation.room_number}</div>
                          <div className="text-sm text-muted-foreground">{reservation.room_type}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div>Check-in: {new Date(reservation.check_in).toLocaleDateString()}</div>
                          <div>Check-out: {new Date(reservation.check_out).toLocaleDateString()}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${statusColors[reservation.status]}`}>
                          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1).replace('_', ' ')}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={reservation.payment_status === 'paid' ? 'default' : 'secondary'}>
                          {reservation.payment_status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 font-medium">
                        ₱{reservation.total_price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
