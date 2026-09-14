import { isAdmin } from "../auth";
import Review from "./review";
import Login from "./login";
export const dynamic = "force-dynamic";
export default async function AdminPage() { return await isAdmin() ? <Review /> : <Login />; }
