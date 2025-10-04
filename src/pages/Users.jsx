import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Users as UsersIcon, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  Shield,
  UserCheck
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@hotel.com",
    phone: "+63 917 123 4567",
    role: "manager",
    is_active: true,
    created_at: "2024-01-10",
    last_login: "2024-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@hotel.com", 
    phone: "+63 917 234 5678",
    role: "receptionist",
    is_active: true,
    created_at: "2024-01-12",
    last_login: "2024-01-15",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@hotel.com",
    phone: "+63 917 345 6789",
    role: "receptionist",
    is_active: false,
    created_at: "2024-01-08",
    last_login: "2024-01-10",
  },
];

const roleColors = {
  admin: "bg-destructive/10 text-destructive",
  manager: "bg-primary/10 text-primary",
  receptionist: "bg-success/10 text-success",
  staff: "bg-warning/10 text-warning",
};

const roleIcons = {
  admin: Shield,
  manager: UserCheck,
  receptionist: UsersIcon,
  staff: UsersIcon,
};

export default function Users() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users</h1>
            <p className="text-muted-foreground">
              Manage hotel staff and user accounts.
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <UsersIcon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-success">12</p>
                </div>
                <UserCheck className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Managers</p>
                  <p className="text-2xl font-bold text-primary">3</p>
                </div>
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Receptionists</p>
                  <p className="text-2xl font-bold text-accent">8</p>
                </div>
                <UsersIcon className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
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
                  placeholder="Search by name or email..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                Export Users
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UsersIcon className="w-5 h-5 text-primary" />
              <span>All Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => {
                    const RoleIcon = roleIcons[user.role];
                    return (
                      <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{user.name}</div>
                              <div className="text-sm text-muted-foreground">ID: #{user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <RoleIcon className="w-4 h-4" />
                            <div className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${roleColors[user.role]}`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={user.is_active}
                              className="data-[state=checked]:bg-success"
                            />
                            <span className={`text-sm ${user.is_active ? 'text-success' : 'text-muted-foreground'}`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {new Date(user.last_login).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
