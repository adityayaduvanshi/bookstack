/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [sucess, setSucess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (sucess || error) return;
    if (!token) {
      setError('Missing Token');
      return;
    }
    newVerification(token)
      .then((data) => {
        setSucess(data.sucess);
        setError(data.error);
      })
      .catch(() => {
        setError('Somthing went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="px-10">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Verifiction</CardTitle>
        <CardDescription>Confirm your verification!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center w-full justify-center">
          {!sucess && !error && <BeatLoader />}
          {!sucess && (
            <p className="text-red-600 bg-slate-200 px-5 font-medium py-2 rounded-md">
              {error}
            </p>
          )}
          <p className="text-green-600 bg-slate-200 px-5 font-medium py-2 rounded-md">
            {sucess}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link className="text-sm font-medium text-center" href={'/login'}>
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewVerificationForm;
