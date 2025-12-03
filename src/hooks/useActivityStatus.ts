import { useEffect, useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const IDLE_TIMEOUT = 3 * 60 * 1000; // 3 minutes
const UPDATE_INTERVAL = 30 * 1000; // 30 seconds

export function useActivityStatus() {
  const { user } = useAuth();
  const lastActivityRef = useRef(Date.now());
  const [currentStatus, setCurrentStatus] = useState<string>("online");
  const mountedRef = useRef(false);

  // Force update status to database
  const forceUpdateStatus = useCallback(async (status: string) => {
    if (!user?.id) return;
    
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
      } else {
        setCurrentStatus(status);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }, [user?.id]);

  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (currentStatus !== "online") {
      forceUpdateStatus("online");
    }
  }, [currentStatus, forceUpdateStatus]);

  useEffect(() => {
    if (!user?.id) return;
    
    // Prevent double initialization in strict mode
    if (mountedRef.current) return;
    mountedRef.current = true;

    // Immediately set online when hook mounts
    forceUpdateStatus("online");

    // Track user activity with throttling
    let activityTimeout: NodeJS.Timeout | null = null;
    const throttledActivity = () => {
      if (activityTimeout) return;
      activityTimeout = setTimeout(() => {
        handleActivity();
        activityTimeout = null;
      }, 1000);
    };

    const events = ["mousedown", "keydown", "touchstart", "scroll", "mousemove"];
    events.forEach(event => {
      window.addEventListener(event, throttledActivity, { passive: true });
    });

    // Check for idle state
    const idleCheck = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (timeSinceLastActivity > IDLE_TIMEOUT && currentStatus === "online") {
        forceUpdateStatus("away");
      }
    }, UPDATE_INTERVAL);

    // Periodic heartbeat update - always update to online if active
    const heartbeat = setInterval(async () => {
      if (user?.id) {
        const timeSinceLastActivity = Date.now() - lastActivityRef.current;
        const newStatus = timeSinceLastActivity < IDLE_TIMEOUT ? "online" : "away";
        
        try {
          await supabase
            .from("profiles")
            .update({ 
              status: newStatus,
              last_seen_at: new Date().toISOString() 
            })
            .eq("id", user.id);
          setCurrentStatus(newStatus);
        } catch (err) {
          console.error("Heartbeat failed:", err);
        }
      }
    }, UPDATE_INTERVAL);

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        forceUpdateStatus("away");
      } else {
        lastActivityRef.current = Date.now();
        forceUpdateStatus("online");
      }
    };

    // Set offline when leaving - use fetch with keepalive
    const handleBeforeUnload = () => {
      if (user?.id) {
        fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({ 
            status: "offline", 
            last_seen_at: new Date().toISOString() 
          }),
          keepalive: true
        }).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      mountedRef.current = false;
      if (activityTimeout) clearTimeout(activityTimeout);
      events.forEach(event => {
        window.removeEventListener(event, throttledActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(idleCheck);
      clearInterval(heartbeat);
    };
  }, [user?.id, handleActivity, forceUpdateStatus, currentStatus]);

  return { updateStatus: forceUpdateStatus, currentStatus };
}
