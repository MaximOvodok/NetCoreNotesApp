export interface IFormData {
  id: number;
  text: string;
  severity: { key: string; value: string };
  tags: Array<{ value: number; label: string }>;
}

export interface INoteFormState {
  severities: Array<{ key: number; value: string; isActive: boolean }>;
  formData: IFormData;
  isSeverityDropdownOpen: boolean;
}
