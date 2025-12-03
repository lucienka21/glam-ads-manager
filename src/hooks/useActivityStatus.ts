import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const UPDATE_INTERVAL = 60 * 1000; // 1 minute

export function useActivityStatus() {
  const { user } = useAuth();
  const lastActivityRef = useRef(Date.now());
  const currentStatusRef = useRef<string>("online");
  const initializedRef = useRef(false);

  const updateStatus = useCallback(async (status: string) => {
    if (!user?.id) return;
    
    // Skip if status hasn't changed (unless it's the initial update)
    if (currentStatusRef.current === status && initializedRef.current) return;
    
    currentStatusRef.current = status;
    initializedRef.current = true;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          status, 
          last_seen_at: new Date().toISOString() 
        })
        .eq("id", user.id);
      
      if (error) {
        console.error("Error updating status:", error);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
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
    const events = ["mousedown", "keydown", "touchstart", "scroll", "mousemove"];
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Check for idle state
    const idleCheck = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (timeSinceLastActivity > IDLE_TIMEOUT && currentStatusRef.current === "online") {
        updateStatus("away");
      }
    }, UPDATE_INTERVAL);

    // Periodic update of last_seen_at
    const heartbeat = setInterval(async () => {
      if (currentStatusRef.current === "online" && user?.id) {
        try {
          await supabase
            .from("profiles")
            .update({ last_seen_at: new Date().toISOString() })
            .eq("id", user.id);
        } catch (err) {
          console.error("Heartbeat failed:", err);
        }
      }
    }, UPDATE_INTERVAL);

    // Set offline when leaving
    const handleBeforeUnload = () => {
      // Use sendBeacon for reliable offline status update
      const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`;
      const body = JSON.stringify({ status: "offline", last_seen_at: new Date().toISOString() });
      
      navigator.sendBeacon?.(url, new Blob([body], { type: 'application/json' }));
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateStatus("away");
      } else {
        handleActivity();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(idleCheck);
      clearInterval(heartbeat);
      // Set offline on unmount
      updateStatus("offline");
    };
  }, [user?.id, handleActivity, updateStatus]);

  return { updateStatus, currentStatus: currentStatusRef.current };
}