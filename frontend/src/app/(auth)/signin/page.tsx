'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { signIn } from '@/apis/auth';

export default function Page() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const { mutate: signInMutation } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => signIn(username, password),
  });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    const { username, password } = form;
    if (!username || !password) {
      alert('닉네임과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const toastId = toast.loading('로그인 중...');

    signInMutation(
      { username, password },
      {
        onSuccess: (data) => {
          toast.dismiss(toastId);
          toast.success('로그인에 성공했습니다.');
          localStorage.setItem('accessToken', data.access_token);
          router.push('/');
        },
        onError: () => {
          toast.dismiss(toastId);
          toast.error('로그인에 실패했습니다.');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">아이디</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="text"
          id="username"
          placeholder="아이디를 입력해주세요"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div className="mt-8">
        <label htmlFor="password">비밀번호</label>
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <div className="mt-8">
        <button className="w-full shrink-0 bg-[#e60021] h-9 text-white px-4 rounded-xl">
          로그인
        </button>
        <Link className="mt-2 block text-center text-sm" href="/signup">
          회원가입
        </Link>
      </div>
    </form>
  );
}
