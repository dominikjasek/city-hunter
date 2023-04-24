import React, { useCallback, useEffect } from 'react';
import { trpc } from '~/utils/trpc';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useDialog } from '~/components/contexts/DialogProvider';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';

const LoginReceiver: React.FC = () => {
  const mutation = trpc.auth.createUser.useMutation();
  const { user } = useUser();
  const router = useRouter();
  const { setOpenLoginDialog } = useDialog();

  const createAccount = useCallback(async () => {
    if (!user) return;
    const result = await mutation.mutateAsync({
      id: user.id,
      nickName:
        user.fullName ??
        user.username ??
        user.primaryEmailAddress?.emailAddress ??
        `${user.id}`,
    });
    if (result.success) {
      await router.replace('/');
    }
  }, [router, user, mutation]);

  useEffect(() => {
    setOpenLoginDialog(false);
    createAccount();
  }, [createAccount, setOpenLoginDialog, user]);

  if (mutation.error) {
    return (
      <MessageBox
        type="error"
        message={'Chyba při přihlašování - kontaktujte prosím správce webu.'}
      />
    );
  }

  return <Loader title={'Probíhá přihlašování...'} />;
};

export default LoginReceiver;

export async function getStaticProps() {
  return {
    props: {},
  };
}
