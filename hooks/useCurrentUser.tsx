import { useQuery } from 'react-query';

const fetchCurrentUser = async () => {
    const res = await fetch('/api/current');
    return res.json();
};

const useCurrentUser = () => {
    return useQuery('currentUser', fetchCurrentUser);
};

export default useCurrentUser;
