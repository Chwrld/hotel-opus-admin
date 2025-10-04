import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusConfig = {
  pending: { label: "Pending", variant: "secondary", color: "bg-warning/10 text-warning" },
  confirmed: { label: "Confirmed", variant: "default", color: "bg-success/10 text-success" },
  checked_in: { label: "Checked In", variant: "default", color: "bg-primary/10 text-primary" },
  checked_out: { label: "Checked Out", variant: "outline", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", variant: "destructive", color: "bg-destructive/10 text-destructive" },
};

export function RecentReservations({ 
  reservations, 
  onViewDetails, 
  isLoading = false 
}) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Recent Reservations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span>Recent Reservations</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No recent reservations</p>
            </div>
          ) : (
            reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {reservation.guest_name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Room {reservation.room_number}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatDate(reservation.check_in)} - {formatDate(reservation.check_out)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      {formatCurrency(reservation.total_price)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(reservation.created_at)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${statusConfig[reservation.status].color}`}>
                      {statusConfig[reservation.status].label}
                    </div>
                    {onViewDetails && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 px-2"
                        onClick={() => onViewDetails(reservation.id)}
                      >
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
