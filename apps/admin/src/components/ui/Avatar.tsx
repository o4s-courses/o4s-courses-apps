import React from 'react'; 
import { Avatar } from 'primereact/avatar';

type Props = {
	name: string;
  size: number;
};

const UserAvatar = () => {

	const getUserAvatarURL = (email: string, size?: number) => {

		if (!email) return '';
	
		// const emailHash = md5(email);
	
		return `https://www.gravatar.com/avatar/${emailHash}${size?`?size=${size}`:''}`;
	};

	return (
		<Avatar 
			image="https://s.gravatar.com/avatar/ab28eca8fc8f2ad31a25612e284483af?s=80"
			className="flex align-items-center justify-content-center mr-2" size="large" shape="circle"
		/>
	);
};

export default UserAvatar;