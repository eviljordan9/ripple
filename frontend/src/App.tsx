import { Route, Routes } from "react-router-dom";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NewPoll from "@/pages/New";
import PollPage from "@/pages/PollPage";
import Studio from "@/pages/Studio";

export default function App() {
  return (
    <>
      <PreviewHostBridge />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<NewPoll />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/p/:slug" element={<PollPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
