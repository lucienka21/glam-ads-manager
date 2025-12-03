import { useEffect, useCallback, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const IDLE_TIMEOUT = 3 * 60 * 1000; // 3 minutes
const UPDATE_INTERVAL = 30 * 1000; // 30 seconds

export function useActivityStatus() {
  const { user } = useAuth();
  const lastActivityRef = useRef(Date.now());
  const [currentStatus, setCurrentStatus] = useState<string>("offline");
  const initializedRef = useRef(false);

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

  // Reset activity timestamp on user interaction
  const recordActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    
    // Prevent double initialization
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Set online immediately on mount
    forceUpdateStatus("online");
    lastActivityRef.current = Date.now();

    // Throttled activity handler
    let activityThrottle: NodeJS.Timeout | null = null;
    const handleActivity = () => {
      recordActivity();
      
      // Throttle status updates to prevent spam
      if (activityThrottle) return;
      activityThrottle = setTimeout(() => {
        activityThrottle = null;
        // Only update if we were away/offline
        if (currentStatus !== "online") {
          forceUpdateStatus("online");
        }
      }, 2000);
    };

    // Activity event listeners
    const events = ["mousedown", "keydown", "touchstart", "scroll", "mousemove", "click"];
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Periodic check for idle state
    const idleCheckInterval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivityRef.current;
      
      if (timeSinceActivity >= IDLE_TIMEOUT) {
        // User is idle
        forceUpdateStatus("away");
      } else {
        // User is active - only update if status changed
        forceUpdateStatus("online");
      }
    }, UPDATE_INTERVAL);

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden - set away
        forceUpdateStatus("away");
      } else {
        // Tab visible - record activity and set online
        lastActivityRef.current = Date.now();
        forceUpdateStatus("online");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Handle page close - set offline
    const handleBeforeUnload = () => {
      if (user?.id) {
        // Use sendBeacon for reliable delivery on page close
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`;
        const data = JSON.stringify({ 
          status: "offline", 
          last_seen_at: new Date().toISOString() 
        });
        
        navigator.sendBeacon(
          url,
          new Blob([data], { type: 'application/json' })
        );
        
        // Fallback with fetch keepalive
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
  }, [user?.id, forceUpdateStatus, recordActivity, currentStatus]);

  return { updateStatus: forceUpdateStatus, currentStatus };
}
