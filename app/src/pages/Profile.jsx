import { Container } from '@mantine/core';
import ProfileForm from '../components/ProfileForm';
import MainWrapper from '../components/MainWrapper';

const Profile = () => {
	return (
		<MainWrapper>
			<Container mt="xl" mb="xl" px="xl" className='custom-scroll'>
				<h1>User Profile</h1>
				<br />
				<ProfileForm />
			</Container>
		</MainWrapper>
	)
}

export default Profile