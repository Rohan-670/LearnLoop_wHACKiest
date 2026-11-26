"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t: tx } = useTranslation((user?.locale as any) || "en");

  const [users, setUsers] = React.useState<UserItem[]>([
    { id: "u-1", name: "Ananya", email: "ananya@example.in", role: "Student", status: "Active" },
    { id: "u-2", name: "Ramesh Teacher", email: "ramesh@example.in", role: "Teacher", status: "Active" },
    { id: "u-3", name: "School Admin", email: "admin@example.in", role: "Administrator", status: "Active" },
    { id: "u-4", name: "Kiran Kumar", email: "kiran@example.in", role: "Student", status: "Active" },
  ]);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newRole, setNewRole] = React.useState("Student");
  const [notification, setNotification] = React.useState("");

  if (!user) return null;

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser: UserItem = {
      id: "u-" + (Date.now()),
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: "Active",
    };

    setUsers([...users, newUser]);
    setNewName("");
    setNewEmail("");
    setShowAddModal(false);
    setNotification(`User ${newUser.name} created successfully!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setUsers(users.filter((u) => u.id !== id));
      setNotification(`User ${name} removed.`);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const toggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/admin")}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {tx("common", "back")}
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">{tx("admin", "user_management")}</h1>
            <p className="text-slate-600 text-sm">Manage platform accounts, credentials, and access roles</p>
          </div>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4" />
          <span>{tx("admin", "create_user")}</span>
        </Button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {showAddModal && (
        <Card className="p-6 border-teal-200 bg-teal-50/50">
          <h2 className="text-lg font-bold text-navy-900 mb-4">{tx("admin", "create_user")}</h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Meera Patil"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="meera@example.in"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                {tx("common", "cancel")}
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {tx("common", "save")}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-slate-600 font-semibold">Name</th>
                <th className="py-3 px-4 text-slate-600 font-semibold">Email</th>
                <th className="py-3 px-4 text-slate-600 font-semibold">Role</th>
                <th className="py-3 px-4 text-slate-600 font-semibold">Status</th>
                <th className="py-3 px-4 text-slate-600 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-navy-900 font-medium">{u.name}</td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-xs">{u.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={u.role === "Student" ? "default" : u.role === "Teacher" ? "success" : "default"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => toggleStatus(u.id)}
                      className="cursor-pointer"
                      title="Click to toggle status"
                    >
                      <Badge variant={u.status === "Active" ? "success" : "default"}>
                        {u.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                      onClick={() => handleDeleteUser(u.id, u.name)}
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
