import { Container, Grid } from '@mantine/core';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';

const Jobs = () => {
  return (
    <div style={{display: 'flex'}} >
      <Navbar/>
      <Container sx={{
        marginLeft: '300px'
      }} mt="xl" mb="xl" px="xl">
        <h1>Featured jobs</h1>
        <br />
        <Grid>
          <Grid.Col style={{ maxWidth: 800 }}>
            <JobCard />
          </Grid.Col>
          <Grid.Col style={{ maxWidth: 800 }}>
            <JobCard />
          </Grid.Col>
          <Grid.Col style={{ maxWidth: 800 }}>
            <JobCard />
          </Grid.Col>
          <Grid.Col style={{ maxWidth: 800 }}>
            <JobCard />
          </Grid.Col>
        </Grid>
      </Container>
    </div>

  )
}

export default Jobs