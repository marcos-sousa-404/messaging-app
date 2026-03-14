const getUserProfilePictureUrl = (image: string) =>
  `${import.meta.env.VITE_API_URL}/images/users/${image}`;

export default getUserProfilePictureUrl;
