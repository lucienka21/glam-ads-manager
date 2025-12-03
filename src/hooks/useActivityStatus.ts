import { useEffect, useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const IDLE_TIMEOUT = 3 * 60 * 1000; // 3 minutes
const UPDATE_INTERVAL = 30 * 1000; // 30 seconds

export function useActivityStatus() {
  const { user } = useAuth();
  const lastActivityRef = useRef(Date.now());
  const [currentStatus, setCurrentStatus] = useState<string>("online");
  const initializedRef = useRef(false);
  const updatePendingRef = useRef(false);

  const updateStatus = useCallback(async (status: string) => {
    if (!user?.id || updatePendingRef.current) return;
    
    // Skip if status hasn't changed (unless it's the initial update)
    if (currentStatus === status && initializedRef.current) return;
    
    updatePendingRef.current = true;
    setCurrentStatus(status);
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
    } finally {
      updatePendingRef.current = false;
    }
  }, [user?.id, currentStatus]);

  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (currentStatus !== "online") {
      updateStatus("online");
    }
  }, [currentStatus, updateStatus]);

  useEffect(() => {
    if (!user?.id) return;

    // Set online when hook mounts - with small delay to ensure DB is ready
    const initTimeout = setTimeout(() => {
      updateStatus("online");
    }, 500);

    // Track user activity with throttling
    let activityTimeout: NodeJS.Timeout | null = null;
    const throttledActivity = () => {
      if (activityTimeout) return;
      activityTimeout = setTimeout(() => {
        handleActivity();
        activityTimeout = null;
      }, 1000);
    };

    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach(event => {
      window.addEventListener(event, throttledActivity, { passive: true });
    });

    // Check for idle state
    const idleCheck = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (timeSinceLastActivity > IDLE_TIMEOUT && currentStatus === "online") {
        updateStatus("away");
      }
    }, UPDATE_INTERVAL);

    // Periodic heartbeat update of last_seen_at
    const heartbeat = setInterval(async () => {
      if (currentStatus === "online" && user?.id && !updatePendingRef.current) {
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

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateStatus("away");
      } else {
        lastActivityRef.current = Date.now();
        updateStatus("online");
      }
    };

    // Set offline when leaving
    const handleBeforeUnload = async () => {
      // Synchronous fallback using sendBeacon
      if (navigator.sendBeacon) {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`;
        const body = JSON.stringify({ status: "offline", last_seen_at: new Date().toISOString() });
        const headers = {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          'Prefer': 'return=minimal'
        };
        
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(initTimeout);
      if (activityTimeout) clearTimeout(activityTimeout);
      events.forEach(event => {
        window.removeEventListener(event, throttledActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(idleCheck);
      clearInterval(heartbeat);
      
      // Set offline on unmount
      if (user?.id) {
        supabase
          .from("profiles")
          .update({ status: "offline", last_seen_at: new Date().toISOString() })
          .eq("id", user.id)
          .then(() => {});
      }
    };
  }, [user?.id, handleActivity, updateStatus, currentStatus]);

  return { updateStatus, currentStatus };
}