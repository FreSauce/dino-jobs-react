import { Container, Grid } from '@mantine/core';
import JobCard from '../components/JobCard';


const Jobs = () => {
  return (
    <div>
      <Container mt="xl" mb="xl">
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
      test
    </div>

  )
}

export default Jobs