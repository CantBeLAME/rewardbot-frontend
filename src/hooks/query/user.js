import { apiGetUserByEmail, apiPostUser } from '../../api/user';
import { useQuery, useMutation } from 'react-query';

export const useGetUserByEmail = ({ email }) => {
	const { data: getUserByEmail } = useQuery({
		queryKey: ['user', email],
		queryFn: () => apiGetUserByEmail({ email }),
	});

	return { getUserByEmail };
};

export const usePostUser = () => {
	const { mutate: postUser } = useMutation({
		mutationFn: async (data) => {
			console.log(data);
			return await apiPostUser(data);
		},
		onError: (error) => {
			console.error('Registration failed:', error);
		},
	});

	return { postUser };
};
