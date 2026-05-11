'use server';

import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { users } from '@/db/schema';
import {
  hashPassword,
  verifyPassword,
  setSessionCookie,
  clearSessionCookie,
} from '@/lib/auth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 80;
const MAX_PASSWORD_LENGTH = 256;

export async function register(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const name  = String(formData.get('name')  ?? '').trim();
  const pass  = String(formData.get('password') ?? '');
  const pass2 = String(formData.get('password2') ?? '');

  if (!EMAIL_RE.test(email) || email.length > MAX_EMAIL_LENGTH) return { error: 'Email inválido.' };
  if (name.length < 2 || name.length > MAX_NAME_LENGTH) return { error: 'El nombre debe tener entre 2 y 80 caracteres.' };
  if (pass.length < 8 || pass.length > MAX_PASSWORD_LENGTH) return { error: 'La contraseña debe tener entre 8 y 256 caracteres.' };
  if (pass !== pass2)        return { error: 'Las contraseñas no coinciden.' };

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing) return { error: 'Ya existe una cuenta con ese email.' };

  const hash = await hashPassword(pass);
  const [user] = await db
    .insert(users)
    .values({ email, name, passwordHash: hash })
    .returning({ id: users.id, email: users.email, name: users.name });

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  redirect('/');
}

export async function login(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const pass  = String(formData.get('password') ?? '');

  // Delay on any attempt to slow brute-force
  await new Promise((r) => setTimeout(r, 400));

  if (!email || !pass || email.length > MAX_EMAIL_LENGTH || pass.length > MAX_PASSWORD_LENGTH) {
    return { error: 'Email o contraseña incorrectos.' };
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      passwordHash: users.passwordHash,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (!user) return { error: 'Email o contraseña incorrectos.' };

  const ok = await verifyPassword(pass, user.passwordHash);
  if (!ok) return { error: 'Email o contraseña incorrectos.' };

  await setSessionCookie({ userId: user.id, email: user.email, name: user.name });
  redirect('/');
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  redirect('/');
}
