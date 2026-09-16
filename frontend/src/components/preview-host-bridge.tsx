import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { installPreviewHostBridge } from "@/lib/preview-host-bridge";

const ROUTES = ["/", "/login", "/new", "/studio", "/p/:slug"];

export function PreviewHostBridge() {
  const navigate = useNavigate();

  useEffect(() => {
    return installPreviewHostBridge({
      navigate: (path) => {
        navigate(path);
      },
      getRoutePaths: () => ROUTES,
    });
  }, [navigate]);

  return null;
}
