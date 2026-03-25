import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (session?.user.role !== "SUPER_ADMIN" && session?.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-6">Settings</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-dark mb-4">Twilio Configuration</h2>
          <p className="text-sm text-gray mb-4">
            Configure your Twilio account to enable calling from the CRM. Set these as environment variables in Vercel.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">TWILIO_ACCOUNT_SID</span>
              <span className={`text-xs px-2 py-1 rounded-full ${process.env.TWILIO_ACCOUNT_SID ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {process.env.TWILIO_ACCOUNT_SID ? "Configured" : "Not Set"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">TWILIO_AUTH_TOKEN</span>
              <span className={`text-xs px-2 py-1 rounded-full ${process.env.TWILIO_AUTH_TOKEN ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {process.env.TWILIO_AUTH_TOKEN ? "Configured" : "Not Set"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">TWILIO_PHONE_NUMBER</span>
              <span className={`text-xs px-2 py-1 rounded-full ${process.env.TWILIO_PHONE_NUMBER ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {process.env.TWILIO_PHONE_NUMBER ? "Configured" : "Not Set"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-dark mb-4">Authentication</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">GOOGLE_CLIENT_ID</span>
              <span className={`text-xs px-2 py-1 rounded-full ${process.env.GOOGLE_CLIENT_ID ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {process.env.GOOGLE_CLIENT_ID ? "Configured" : "Not Set"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">APPLE_CLIENT_ID</span>
              <span className={`text-xs px-2 py-1 rounded-full ${process.env.APPLE_CLIENT_ID ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {process.env.APPLE_CLIENT_ID ? "Configured" : "Not Set"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold text-dark mb-4">Super Admin</h2>
          <p className="text-sm text-gray">
            The super admin email is set via the <span className="font-mono bg-gray-100 px-1 rounded text-xs">SUPER_ADMIN_EMAIL</span> environment variable.
            The first user to sign in with this email will be assigned the SUPER_ADMIN role.
          </p>
          <p className="text-sm font-medium text-dark mt-2">
            Current: {process.env.SUPER_ADMIN_EMAIL || "Not Set"}
          </p>
        </div>
      </div>
    </div>
  );
}
