import { env } from "cloudflare:workers";
import { getChatGPTUser, chatGPTSignInPath } from "../chatgpt-auth";
import Review from "./review";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const user = await getChatGPTUser();
  if (!user) return <main className="admin-shell"><h1>Resource review</h1><p>Sign in to review organization requests.</p><a href={chatGPTSignInPath("/admin")} target="_top">Sign in with ChatGPT</a></main>;
  const allowed = (env as unknown as {ADMIN_EMAIL?:string}).ADMIN_EMAIL;
  if (!allowed || user.email.toLowerCase() !== allowed.toLowerCase()) return <main className="admin-shell"><h1>Access unavailable</h1><p>This account has not been assigned as a directory administrator.</p><a href="/">Return to directory</a></main>;
  return <Review />;
}
