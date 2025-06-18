const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

type Group = { id: number; name: string; users: { id: number; name: string }[] };
type ExpenseCreate = {
  description: string;
  amount: number;
  paid_by: number;
  split_type: "equal" | "percentage";
  splits: Record<number, number>;
};

export const createGroup = async (name: string, userIds: number[]) =>
  fetch(`${BASE}/groups/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, user_ids: userIds }),
  }).then(res => res.json() as Promise<Group>);

export const listGroups = async () =>
  fetch(`${BASE}/groups/`).then(res => res.json() as Promise<Group[]>);

export const addExpense = async (groupId: number, data: ExpenseCreate) =>
  fetch(`${BASE}/groups/${groupId}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getGroupBalances = async (groupId: number) =>
  fetch(`${BASE}/groups/${groupId}/balances`).then(res => res.json());

export const getUserBalances = async (userId: number) =>
  fetch(`${BASE}/users/${userId}/balances`).then(res => res.json());
