import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const UPDATE_INTERVAL = 60 * 1000; // 1 minute

export function useActivityStatus() {
  const { user } = useAuth();
  const lastActivityRef = useRef(Date.now());
  const currentStatusRef = useRef<string>("online");

  const updateStatus = useCallback(async (status: string) => {
    if (!user?.id || currentStatusRef.current === status) return;
    
    currentStatusRef.current = status;
    await supabase
      .from("profiles")
      .update({ 
        status, 
        last_seen_at: new Date().toISOString() 
      })
      .eq("id", user.id);
  }, [user?.id]);

  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (currentStatusRef.current !== "online") {
      updateStatus("online");
    }
  }, [updateStatus]);

  useEffect(() => {
    if (!user?.id) return;

    // Set online when hook mounts
    updateStatus("online");

    // Track user activity
    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Check for idle state
    const idleCheck = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (timeSinceLastActivity > IDLE_TIMEOUT && currentStatusRef.current === "online") {
        updateStatus("away");
      }
    }, UPDATE_INTERVAL);

    // Periodic update of last_seen_at
    const heartbeat = setInterval(() => {
      if (currentStatusRef.current === "online") {
        supabase
          .from("profiles")
          .update({ last_seen_at: new Date().toISOString() })
          .eq("id", user.id);
      }
    }, UPDATE_INTERVAL);

    // Set offline when leaving
    const handleBeforeUnload = () => {
      navigator.sendBeacon && supabase
        .from("profiles")
        .update({ status: "offline", last_seen_at: new Date().toISOString() })
        .eq("id", user.id);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(idleCheck);
      clearInterval(heartbeat);
      // Set offline on unmount
      updateStatus("offline");
    };
  }, [user?.id, handleActivity, updateStatus]);

  return { updateStatus };
}