import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminContent  from './AdminContent';

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session || session.value !== 'valid') {
    redirect('/administrasi/login');
  }

  return <AdminContent  />;
}
