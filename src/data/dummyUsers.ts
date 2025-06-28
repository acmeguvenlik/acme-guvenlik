import { UserFormData } from "@/components/users/AddUserForm";

export const dummyUsers: UserFormData[] = [
  { id: "U001", username: "admin", email: "admin@acme.com", role: "admin", password: "admin" },
  { id: "U002", username: "dealer", email: "dealer@acme.com", role: "dealer", password: "dealer" },
  { id: "U003", username: "viewer1", email: "viewer1@acme.com", role: "viewer", password: "viewer" },
];