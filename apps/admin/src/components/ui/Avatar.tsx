import React from 'react';
//import md5 from "md5";
import { Avatar } from 'primereact/avatar';

const UserAvatar: React.FC<{
	image: string | null;
}> = ({ image }) => {

	/**
	const getUserAvatarURL = (email: string) => {

		if (!email) return '';
	
		const emailHash = md5(email);
	
		return `https://www.gravatar.com/avatar/${emailHash}${size?`?size=80`:''}`;
	};
	 */

	return (
		<Avatar 
			image={image}
			className="flex align-items-center justify-content-center mr-2" size="large" shape="circle"
		/>
	);
};

export default UserAvatar;
