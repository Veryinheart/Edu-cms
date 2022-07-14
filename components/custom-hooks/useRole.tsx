import { useRouter } from 'next/router';
import { getRole } from '../../utils/service/storage';
import { Role } from '../../utils/service/user/types';
const useRole = () => {
  const router = useRouter();

  const role = getRole() || (router.pathname.split('/')[2] as Role);
  return role;
};

export default useRole;
