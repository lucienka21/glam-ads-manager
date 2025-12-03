import { useEffect, useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const IDLE_TIMEOUT = 3 * 60 * 1000; // 3 minutes
const UPDATE_INTERVAL = 30 * 1000; // 30 seconds

export function useActivityStatus() {
  const { user } = useAuth();
  const lastActivityRef = useRef(Date.now());
  const currentStatusRef = useRef<string>("offline");
  const [currentStatus, setCurrentStatus] = useState<string>("offline");
  const initializedRef = useRef(false);
  const updatePendingRef = useRef(false);

  // Force update status to database
  const forceUpdateStatus = useCallback(async (status: string) => {
    if (!user?.id) return;
    
    // Skip if same status to reduce DB calls
    if (currentStatusRef.current === status && status !== "online") return;
    
    // Prevent concurrent updates
    if (updatePendingRef.current) return;
    updatePendingRef.current = true;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          status, 
          last_seen_at: new Date().toISOString() 
        })
        .eq("id", user.id);
      
      if (!error) {
        currentStatusRef.current = status;
        setCurrentStatus(status);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      updatePendingRef.current = false;
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    
    // Prevent double initialization
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Set online immediately on mount
    forceUpdateStatus("online");
    lastActivityRef.current = Date.now();

    // Throttled activity handler
    let activityThrottle: ReturnType<typeof setTimeout> | null = null;
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      
      // If we're away/offline, immediately set to online
      if (currentStatusRef.current !== "online") {
        if (activityThrottle) return;
        activityThrottle = setTimeout(() => {
          activityThrottle = null;
          forceUpdateStatus("online");
        }, 500);
      }
    };

    // Activity event listeners - fewer events to reduce overhead
    const events = ["mousedown", "keydown", "touchstart", "click"];
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Periodic check for idle state
    const idleCheckInterval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivityRef.current;
      
      if (timeSinceActivity >= IDLE_TIMEOUT) {
        if (currentStatusRef.current !== "away") {
          forceUpdateStatus("away");
        }
      } else if (currentStatusRef.current !== "online") {
        forceUpdateStatus("online");
      }
    }, UPDATE_INTERVAL);

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        forceUpdateStatus("away");
      } else {
        lastActivityRef.current = Date.now();
        forceUpdateStatus("online");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Handle page close - set offline
    const handleBeforeUnload = () => {
      if (user?.id) {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`;
        const data = JSON.stringify({ 
          status: "offline", 
          last_seen_at: new Date().toISOString() 
        });
        
        navigator.sendBeacon(
          url,
          new Blob([data], { type: 'application/json' })
        );
        
        fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: data,
          keepalive: true
        }).catch(() => {});
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      initializedRef.current = false;
      if (activityThrottle) clearTimeout(activityThrottle);
      
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(idleCheckInterval);
    };
  }, [user?.id, forceUpdateStatus]);

  return { updateStatus: forceUpdateStatus, currentStatus };
}
