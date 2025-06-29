import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddUserForm, UserFormData } from "@/components/users/AddUserForm";
import { showSuccess } from "@/utils/toast";

// Örnek kullanıcı verileri
const initialDummyUsers: UserFormData[] = [
  { id: "U001", username: "admin", email: "admin@acme.com", role: "admin", password: "admin" },
  { id: "U002", username: "dealer", email: "dealer@acme.com", role: "dealer", password: "dealer" },
  { id: "U003", username: "viewer1", email: "viewer1@acme.com", role: "viewer", password: "viewer" },
];

const UsersPage = () => {
  const [users, setUsers] = useState<UserFormData[]>(initialDummyUsers);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFormData | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddUserSuccess = (newUserData: UserFormData) => {
    const newId = `U${String(users.length + 1).padStart(3, '0')}`;
    setUsers((prev) => [...prev, { ...newUserData, id: newId }]);
    setIsAddUserDialogOpen(false);
  };

  const handleEditUserSuccess = (updatedUserData: UserFormData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === updatedUserData.id ? { ...user, ...updatedUserData } : user
      )
    );
    setIsEditDialogOpen(false);
    setSelectedUser(undefined);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      showSuccess("Kullanıcı başarıyla silindi!");
    }
  };

  const openEditDialog = (user: UserFormData) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
      <p className="text-gray-600">Sisteme kayıtlı kullanıcıları buradan yönetebilirsiniz.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Kullanıcı Listesi</CardTitle>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Kullanıcı ara..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Yeni Kullanıcı Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                  <DialogDescription>
                    Yeni bir kullanıcı eklemek için aşağıdaki formu doldurun.
                  </DialogDescription>
                </DialogHeader>
                <AddUserForm onSuccess={handleAddUserSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Kullanıcı Adı</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-2"
                      onClick={() => openEditDialog(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Düzenleme Diyaloğu */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kullanıcıyı Düzenle</DialogTitle>
            <DialogDescription>
              Kullanıcı bilgilerini güncellemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <AddUserForm initialData={selectedUser} onSuccess={handleEditUserSuccess} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;