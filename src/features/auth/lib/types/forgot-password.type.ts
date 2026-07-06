export interface ForgotPasswordStep1Response {
  status: boolean;
  code: number;
  message: string;
}

export interface ForgotPasswordStep1Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

export interface ForgotPasswordStep2Props {
  email: string;
  onBack: () => void;
}

export interface ForgotPasswordStep3Props{
  token: string;
}

export interface ForgotPasswordStep3Response {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}

export interface ForgotPasswordFormProps {
  token: string;
}