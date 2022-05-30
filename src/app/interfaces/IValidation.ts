interface ValidationResult {
  valid: boolean;
  key?: string;
}

export interface IValidation<T> {
  isValid: (e: T) => ValidationResult;
}
