import { Container, Grid, Card, Slider, Input, Button } from '@mantine/core';
import JobCard from '../components/JobCard';
import MainWrapper from '../components/MainWrapper';
import { IconChevronDown } from '@tabler/icons';
import { jobs } from '../utils/constants';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';


const Jobs = ({ savedJobs, setSavedJobs }) => {
  const { user } = useAuth();
  console.log("hehe", setSavedJobs)
  return (
    <MainWrapper>
      <div style={{ display: "flex" }}>
        <Container mt="xl" mb="xl" >
          <h1>Featured jobs</h1>
          <br />
          <Grid px={25}>
            {jobs.map((job, index) => (
              <Grid.Col key={index}>
                <JobCard job={job} saved={savedJobs?.find(j => j.id === job.id)} setSavedJobs={setSavedJobs} />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
        <Card withBorder style={{ width: '300px', marginTop: '98px', marginBottom: '20px', height: '330px' }}>
          <h2>Filter</h2>
          <br />

          <h4>Salary</h4>
          <Slider
            min={0}
            max={100000}
            value={90000}
            onChange={(value) => console.log(value)}
          />
          <h4>Employees</h4>
          <Slider
            min={0}
            max={100}
            value={34}
            onChange={(value) => console.log(value)}
          />
          <h4>Role</h4>
          <Input component="select" rightSection={<IconChevronDown size={14} stroke={1.5} />}>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
          </Input>
          <br />
          <Button fullWidth>Apply</Button>
        </Card>
      </div>
    </MainWrapper>
  )
}

export default Jobs