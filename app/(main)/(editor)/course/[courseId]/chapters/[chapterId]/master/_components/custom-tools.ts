// custom-tools.ts

// Define a type for the UnlayerEditor
interface UnlayerEditor {
    registerTool(toolName: string, config: any): void;
    setMergeTagActive(tag: string): void;
    // Add other methods or properties if needed
}
  
declare global {
    interface Window {
        unlayer: UnlayerEditor; // Define the 'unlayer' property with the type UnlayerEditor
        unlayerCustomJS?: any; // Define the 'unlayerCustomJS' property as optional
    }
}
  
if (window.unlayerCustomJS) {
    window.unlayerCustomJS['headerTool'] = {
        name: 'Header',
        icon: 'fa-header', // Using a FontAwesome icon class as an example
        supportedDisplayModes: ['web', 'email'],
        options: {
            default: {
                backgroundColor: '#ffffff',
            },
        },
        onClick: () => {
            window.unlayer.setMergeTagActive('header');
        }
    };

    window.unlayerCustomJS['footerTool'] = {
        name: 'Footer',
        icon: 'fa-footer', // Using a FontAwesome icon class as an example
        supportedDisplayModes: ['web', 'email'],
        options: {
            default: {
                backgroundColor: '#ffffff',
            },
        },
        onClick: () => {
            window.unlayer.setMergeTagActive('footer');
        }
    };
}
  
// Export the custom tools object directly
export const customTools = window.unlayerCustomJS;
