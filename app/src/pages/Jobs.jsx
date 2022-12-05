import { Container, Grid, Card, Slider, Input, Button, MediaQuery, Box, Select } from '@mantine/core';
import JobCard from '../components/JobCard';
import MainWrapper from '../components/MainWrapper';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './pages.module.css';
import { setJobs } from '../store/userReducer';

const salaryFilterMarks = [{ value: 1000 }, { value: 2000 }, { value: 3000 }, { value: 4000 }, { value: 5000 }, { value: 6000 }, { value: 7000 }, { value: 8000 }, { value: 9000 }, { value: 10000 }]
const employeeFilterMarks = [{ value: 10 }, { value: 100 }, { value: 200 }, { value: 300 }, { value: 400 }, { value: 500 }, { value: 600 }, { value: 700 }, { value: 800 }, { value: 900 }, { value: 1000 }]
const roleFilterData = [{ label: "Software Engineer", value: "Software Engineer" }, { label: "Frontend Developer", value: "Frontend Developer" }, { label: "Backend Developer", value: "Backend Developer" }, { label: "Fullstack Developer", value: "Fullstack Developer" }]

const Jobs = () => {
  const { user } = useSelector(state => state.auth);
  const { jobs, applied_jobs, saved_jobs } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [salaryFilter, setSalaryFilter] = useState();
  const [employeeFilter, setEmployeeFilter] = useState();
  const [roleFilter, setRoleFilter] = useState();
  const { getJobs } = useAuth()

  useEffect(() => {
    getJobs().then(res => {
      dispatch(setJobs(res));
    }).catch(err => {
      console.log(err);
    })
  }, [])


  const handleFilter = (ev) => {
    console.log(salaryFilter, employeeFilter, roleFilter)
    setFilteredJobs(prev => {
      let g = jobs.filter(job => job.salary >= salaryFilter && job.company.employees >= employeeFilter && job.role === roleFilter)
      console.log(g);
      return g
    })
  }

  const handleReset = (ev) => {
    setFilteredJobs([])
    setSalaryFilter(1000)
    setEmployeeFilter(10)
    setRoleFilter();
  }

  if (user.role === 'manager') {
  }

  return (
    <MainWrapper>
      <div style={{ display: "flex" }}>
        <Container mt="xl" mb="xl" sx={{ maxWidth: '75%' }}>
          <h1>Featured jobs</h1>
          <br />
          <Grid px={25}>
            {(filteredJobs.length > 0 ? filteredJobs : jobs).map((job, index) => (
              <Grid.Col key={index}>
                <JobCard job={job} applied={applied_jobs?.includes(job._id)} saved={saved_jobs?.some(j => j._id === job._id)} />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
        <Card withBorder className={styles.filter_wrapper}>
          <h2>Filter</h2>
          <br />

          <h4>Salary</h4>
          <Slider
            pt={10}
            pb={20}
            min={1000}
            max={10000}
            marks={salaryFilterMarks}
            value={salaryFilter}
            onChange={(value) => setSalaryFilter(value)}
          />
          <h4>Employees</h4>
          <Slider
            pt={10}
            pb={20}
            min={10}
            max={1000}
            marks={employeeFilterMarks}
            value={employeeFilter}
            onChange={(value) => setEmployeeFilter(value)}
          />
          <h4>Role</h4>
          <Select data={roleFilterData} value={roleFilter} onChange={setRoleFilter} />
          <br />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={handleFilter}>Apply</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Card>
      </div>
    </MainWrapper>
  )
}

export default Jobs