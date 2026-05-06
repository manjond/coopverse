'use server';

import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import {
  hashPassword,
  verifyPassword,
  setSessionCookie,
  clearSessionCookie,
} from '@/lib/auth';

const sql = neon(process.env.DATABASE_URL!);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const name  = String(formData.get('name')  ?? '').trim();
  const pass  = String(formData.get('password') ?? '');
  const pass2 = String(formData.get('password2') ?? '');

  if (!EMAIL_RE.test(email)) return { error: 'Email inválido.' };
  if (name.length < 2)       return { error: 'El nombre debe tener al menos 2 caracteres.' };
  if (pass.length < 8)       return { error: 'La contraseña debe tener al menos 8 caracteres.' };
  if (pass !== pass2)        return { error: 'Las contraseñas no coinciden.' };

  const [existing] = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
  if (existing) return { error: 'Ya existe una cuenta con ese email.' };

  const hash = await hashPassword(pass);
  const [user] = await sql`
    INSERT INTO users (email, name, password_hash)
    VALUES (${email}, ${name}, ${hash})
    RETURNING id, email, name
  `;

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  redirect('/');
}

export async function login(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const pass  = String(formData.get('password') ?? '');

  // Delay on any attempt to slow brute-force
  await new Promise((r) => setTimeout(r, 400));

  if (!email || !pass) return { error: 'Rellena todos los campos.' };

  const [user] = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  if (!user) return { error: 'Email o contraseña incorrectos.' };

  const ok = await verifyPassword(pass, user.password_hash);
  if (!ok) return { error: 'Email o contraseña incorrectos.' };

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  redirect('/');
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect('/');
}
