import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { UserDashboard } from "./components/UserDashboard";
import { UserChat } from "./components/UserChat";
import { LawyerDashboard } from "./components/LawyerDashboard";
import { ChatWithLawyer } from "./components/ChatWithLawyer";
import { InstitutionalDashboard } from "./components/InstitutionalDashboard";

export type UserType =
  | "user"
  | "lawyer"
  | "institutional"
  | null;
export type Screen =
  | "login"
  | "register"
  | "user-dashboard"
  | "user-chat"
  | "lawyer-dashboard"
  | "chat-with-lawyer"
  | "institutional-dashboard";

export interface Case {
  id: string;
  userName: string;
  category: string;
  summary: string;
  urgency: "alta" | "média" | "baixa";
  location: string;
  date: string;
  status: "pending" | "in-progress" | "resolved";
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("login");
  const [userType, setUserType] = useState<UserType>(null);
  const [userName, setUserName] = useState<string>("");
  const [selectedCase, setSelectedCase] = useState<Case | null>(
    null,
  );

  const handleLogin = (type: UserType, name: string) => {
    setUserType(type);
    setUserName(name);

    if (type === "user") {
      setCurrentScreen("user-dashboard");
    } else if (type === "lawyer") {
      setCurrentScreen("lawyer-dashboard");
    } else if (type === "institutional") {
      setCurrentScreen("institutional-dashboard");
    }
  };

  const handleRegister = () => {
    setCurrentScreen("register");
  };

  const handleRegisterComplete = (
    type: UserType,
    name: string,
  ) => {
    setUserType(type);
    setUserName(name);

    if (type === "user") {
      setCurrentScreen("user-dashboard");
    } else if (type === "lawyer") {
      setCurrentScreen("lawyer-dashboard");
    } else if (type === "institutional") {
      setCurrentScreen("institutional-dashboard");
    }
  };

  const handleBackToLogin = () => {
    setCurrentScreen("login");
  };

  const handleConnectWithLawyer = () => {
    setCurrentScreen("chat-with-lawyer");
  };

  const handleStartAIChat = () => {
    setCurrentScreen("user-chat");
  };

  const handleSelectCase = (caseData: Case) => {
    setSelectedCase(caseData);
    setCurrentScreen("chat-with-lawyer");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
    setUserType(null);
    setUserName("");
    setSelectedCase(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Mobile Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-black rounded-[3rem] shadow-2xl p-3">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>

        {/* Phone Screen */}
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between z-40">
            <span className="text-gray-900">9:41</span>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
          </div>

          {/* App Content */}
          <div className="flex-1 overflow-hidden">
            {currentScreen === "login" && (
              <LoginScreen
                onLogin={handleLogin}
                onRegister={handleRegister}
              />
            )}

            {currentScreen === "register" && (
              <RegisterScreen
                onRegister={handleRegisterComplete}
                onBackToLogin={handleBackToLogin}
              />
            )}

            {currentScreen === "user-dashboard" && (
              <UserDashboard
                userName={userName}
                onStartAIChat={handleStartAIChat}
                onStartLawyerChat={handleConnectWithLawyer}
                onLogout={handleLogout}
              />
            )}

            {currentScreen === "user-chat" && (
              <UserChat
                userName={userName}
                onConnectWithLawyer={handleConnectWithLawyer}
                onLogout={handleLogout}
                onBackToDashboard={() =>
                  setCurrentScreen("user-dashboard")
                }
              />
            )}

            {currentScreen === "lawyer-dashboard" && (
              <LawyerDashboard
                lawyerName={userName}
                onSelectCase={handleSelectCase}
                onLogout={handleLogout}
              />
            )}

            {currentScreen === "chat-with-lawyer" && (
              <ChatWithLawyer
                userName={userName}
                userType={userType}
                caseData={selectedCase}
                onBack={() => {
                  if (userType === "lawyer") {
                    setCurrentScreen("lawyer-dashboard");
                  } else {
                    setCurrentScreen("user-chat");
                  }
                }}
              />
            )}

            {currentScreen === "institutional-dashboard" && (
              <InstitutionalDashboard
                userName={userName}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}