import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Bed, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  DollarSign,
  Camera
} from "lucide-react";

const mockRooms = [
  {
    id: 1,
    room_number: "101",
    type: "Standard",
    max_occupancy: 2,
    rate: 2500,
    status: "available",
    amenities: ["WiFi", "AC", "TV"],
    description: "Comfortable standard room with city view",
  },
  {
    id: 2,
    room_number: "205",
    type: "Deluxe",
    max_occupancy: 3,
    rate: 4000,
    status: "occupied",
    amenities: ["WiFi", "AC", "TV", "Mini Bar"],
    description: "Spacious deluxe room with balcony",
  },
  {
    id: 3,
    room_number: "312",
    type: "Suite",
    max_occupancy: 4,
    rate: 7500,
    status: "maintenance",
    amenities: ["WiFi", "AC", "TV", "Mini Bar", "Jacuzzi"],
    description: "Luxury suite with separate living area",
  },
];

const statusColors = {
  available: "bg-success/10 text-success",
  occupied: "bg-primary/10 text-primary",
  maintenance: "bg-warning/10 text-warning",
  disabled: "bg-destructive/10 text-destructive",
};

const roomTypes = [
  "Standard",
  "Deluxe", 
  "Suite",
  "Family Room",
  "Presidential Suite"
];

export default function Rooms() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rooms</h1>
            <p className="text-muted-foreground">
              Manage hotel rooms, rates, and availability.
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Rooms</p>
                  <p className="text-2xl font-bold">48</p>
                </div>
                <Bed className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-success">32</p>
                </div>
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Occupied</p>
                  <p className="text-2xl font-bold text-primary">14</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rate</p>
                  <p className="text-2xl font-bold">₱4,200</p>
                </div>
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search room number..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {roomTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Occupancy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="1-2">1-2 Guests</SelectItem>
                  <SelectItem value="3-4">3-4 Guests</SelectItem>
                  <SelectItem value="5+">5+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRooms.map((room) => (
            <Card key={room.id} className="bg-gradient-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Room {room.room_number}</CardTitle>
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[room.status as keyof typeof statusColors]}`}>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{room.type}</span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>Max {room.max_occupancy}</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Room Image Placeholder */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                
                <p className="text-sm text-muted-foreground">{room.description}</p>
                
                {/* Amenities */}
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{room.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
                
                {/* Rate */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    ₱{room.rate.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">/night</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}