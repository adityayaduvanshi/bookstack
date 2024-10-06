// stores/useTemplateStore.ts
import { create } from 'zustand';

interface Template {
  id: number;
  name: string;
  content: any; // Adjust the type based on the actual content structure
  json: any;
}

interface TemplateStore {
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
}

const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplate: null,
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));

export default useTemplateStore;
