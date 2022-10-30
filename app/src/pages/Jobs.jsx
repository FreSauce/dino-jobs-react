import { Container, Grid } from '@mantine/core';
import JobCard from '../components/JobCard';
import MainWrapper from '../components/MainWrapper';


const Jobs = () => {
  return (
    <MainWrapper>
      <Container mr={'xs'} ml={'xs'} mt="xl" mb="xl">
        <h1>Featured jobs</h1>
        <br />
        <Grid px={25}>
          <Grid.Col style={{}}>
            <JobCard />
          </Grid.Col>
          <Grid.Col style={{}}>
            <JobCard />
          </Grid.Col>
          <Grid.Col style={{}}>
            <JobCard />
          </Grid.Col>
          <Grid.Col style={{}}>
            <JobCard />
          </Grid.Col>
        </Grid>
      </Container>
    </MainWrapper>
  )
}

export default Jobs