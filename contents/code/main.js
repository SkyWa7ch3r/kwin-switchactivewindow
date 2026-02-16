registerShortcut(
    "Switch Active Window", 
    "Switch to the next active window on the current screen", 
    "Meta+S", 
    () => {
        const currentWindow = workspace.activeWindow;
        
        if (!currentWindow) {
            console.log("No active window");
            return;
        }
        
        const currentOutput = currentWindow.output;
        
        // Get all windows on current screen
        const allWindows = workspace.windowList();
        const windowsOnScreen = allWindows.filter(w => 
            w.output === currentOutput && 
            w.normalWindow && 
            !w.skipTaskbar &&
            !w.minimized
        );
        
        // Need at least 2 windows to switch
        if (windowsOnScreen.length < 2) {
            console.log("Only one window on this screen");
            return;
        }
        
        // Find current window index
        const currentIndex = windowsOnScreen.indexOf(currentWindow);
        
        // Switch to next window (wrap around)
        const nextIndex = (currentIndex + 1) % windowsOnScreen.length;
        const nextWindow = windowsOnScreen[nextIndex];
        
        console.log(`Switching from "${currentWindow.caption}" to "${nextWindow.caption}"`);
        workspace.activeWindow = nextWindow;
    }
);