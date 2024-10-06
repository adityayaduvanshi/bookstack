import { create } from 'zustand';

interface ScreenShareState {
  templateOn: boolean;
  toggleTemplate: () => void;
}

const useTemplateStore = create<ScreenShareState>((set) => ({
  templateOn: false,
 toggleTemplate: () =>
    set((state) => ({ templateOn: !state.templateOn })),
}));

export default useTemplateStore;