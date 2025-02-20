export const validateEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
	const re = /^[0-9]{11}$/;  // Adjust regex based on your phone number format
	return re.test(phoneNumber);
};