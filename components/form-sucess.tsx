import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}
const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className=" bg-emerald-500/15 p-3 rounded-md flex  gap-x-2 items-center text-sm text-emerald-500">
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
