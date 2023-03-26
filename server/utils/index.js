exports.getUpdateProfile = ({ full_name, phone, address, bio, skills, avatar, resume }) => {
	const user = {};
	console.log(avatar, resume);
	if (full_name !== '') user.full_name = full_name;
	if (phone !== '') user.phone = phone;
	if (address !== '') user.address = address;
	if (bio !== '') user.bio = bio;
	if (skills !== '') user.skills = skills.split(',');
	if (avatar) user.avatar = avatar.path;
	if (resume) user.resume = resume.path;
	return user;
}