export interface ForgotPasswordStep1Response {
  status: boolean;
  code: number;
  message: string;
}

export interface ForgotPasswordStep1Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

export interface ForgotPasswordStep2Props {
  email: string;
  onNext: () => void;
}

export interface ForgotPasswordStep3Response {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}